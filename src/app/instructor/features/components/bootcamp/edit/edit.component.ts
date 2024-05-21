import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CloudiranyService } from '../../../../../admin/features/services/concretes/cloudinary.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { GetbyIdBootcampResponse } from '../../../models/responses/bootcamp/getbyidbootcampresponse';
import { HttpClientModule } from '@angular/common/http';
import { UpdateBootcampRequest } from '../../../models/requests/bootcamp/updatebootcamprequest';
import { updateCloudrinaryResponse } from '../../../../../admin/features/models/responses/cloudinary/updateCloudrinaryresponse';
import { DeleteBootcampImageResponse } from '../../../models/responses/bootcamp/deletebootcampımageresponse';
import { DeleteBootcampImageRequest } from '../../../models/requests/bootcamp/deletebootcampımagerequest';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditInstructorBootcampComponent implements OnInit {
  getbyIdBootcampResponse!: GetbyIdBootcampResponse;
  BootcampForm!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bootcampService: InstructorBootcamp,
    private formBuilder: FormBuilder,
    private cloudiranyService: CloudiranyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getBootcamp();
    initFlowbite();
  }

  initForm(): void {
    this.BootcampForm = this.formBuilder.group({
      id: [""],
      name: [""],
      instructorId: [""],
      bootcampState: [true],
      bootcampImage: [""],
      BootcampImageFile: [null]
    });
    
  }

  onBootcampImageChange(event: any) {
    const bootcampImageFile = event.target.files[0];
    this.BootcampForm.patchValue({
      BootcampImageFile: bootcampImageFile
    });
  }

  getBootcamp(): void {
    const bootcampId = this.activatedRoute.snapshot.params['id'];
    this.bootcampService.getBootcampById(bootcampId).subscribe(
      (response: GetbyIdBootcampResponse) => {
        this.getbyIdBootcampResponse = response;
        this.BootcampForm.patchValue(response);
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        console.log("Error retrieving bootcamp");
      }
    );
  }


  UpdatedBootcamp(): void {
    if (this.BootcampForm.valid) {
        let bootcampModel: UpdateBootcampRequest = Object.assign({}, this.BootcampForm.value);
        
        if (bootcampModel.BootcampImageFile) {
            let deleteimageModel: DeleteBootcampImageRequest = {
                Url: bootcampModel.bootcampImage 
            };
            this.bootcampService.deleteimage(deleteimageModel).subscribe(
                (deleteResponse: DeleteBootcampImageResponse) => {
                    console.log("Resim silme başarılı:", deleteResponse);
                    
                    const bootcampFormData = new FormData();
                    bootcampFormData.append("formFile", bootcampModel.BootcampImageFile);

                    // Sonra yeni resmi yükle
                    this.cloudiranyService.updateCloudrinary(bootcampFormData).subscribe(
                        (uploadResponse: updateCloudrinaryResponse) => {
                            bootcampModel.bootcampImage = uploadResponse.url;
                            console.log("Yeni resim yükleme başarılı:", uploadResponse);
                            console.log("güncellenecek isim" + bootcampModel.name)
                            console.log("güncellenecek resim" +bootcampModel.bootcampImage)
                           
                            this.bootcampService.updateBootcamp(bootcampModel).subscribe(
                                (updateResponse) => {
                                    console.log("bootcamp updated successfully: ", updateResponse);
                                },
                                (error) => {
                                    console.error('Error updating bootcamp:', error);
                                }
                            );
                        },
                        (uploadError) => {
                            console.error('Error uploading new image:', uploadError);
                        }
                    );
                },
                (deleteError) => {
                    console.error('Error deleting old image:', deleteError);
                }
            );
        } else {
            // Resim yoksa doğrudan güncelle
            this.bootcampService.updateBootcamp(bootcampModel).subscribe(
                (response) => {
                    console.log("bootcamp updated successfully: ", response);
                },
                (error) => {
                    console.error('Error updating bootcamp:', error);
                }
            );
        }
    } else {
        console.log("Form is invalid.");
    }
}




}
