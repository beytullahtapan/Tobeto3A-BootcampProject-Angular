import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AddBootcampRequest } from '../../../models/requests/bootcamp/addbootcamprequest';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { AppToastrService, ToastrMessageType } from '../../../../../features/services/concretes/app-toastr.service';
import { CloudiranyService } from '../../../../../admin/features/services/concretes/cloudinary.service';
import { AddBootcampResponse } from '../../../models/responses/bootcamp/addbootcampresponse';
import { updateCloudrinaryResponse } from '../../../../../admin/features/models/responses/cloudinary/updateCloudrinaryresponse';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddInstructorBootcampComponent implements OnInit  {
  BootcampaddForm!: FormGroup;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bootcampService: InstructorBootcamp, private formBuilder: FormBuilder,private authService: AuthService,private toastrService:AppToastrService, private cloudiranyService:CloudiranyService) {}

  ngOnInit(): void {
    initFlowbite();
    this.initForm();
  }

  initForm(): void {
    this.BootcampaddForm = this.formBuilder.group({
      Name: [""],
      Description:[""],
      InstructorId: [""],  
      BootcampState: [true],
      BootcampImageFile: [null],
      BootcampImage: [""]
    });
  }
  onBootcampFileChange(event: any) {
    const bootcampImageFile = event.target.files[0];
    this.BootcampaddForm.patchValue({
      BootcampImageFile: bootcampImageFile
    });
  }
  
  AddBootcamp(): void {
    if (this.BootcampaddForm.valid) {
        let addBootcampModel: AddBootcampRequest = Object.assign({}, this.BootcampaddForm.value);
      
        const BootcampaddFormdata = new FormData();
        BootcampaddFormdata.append("formFile", addBootcampModel.BootcampImageFile);
    
        addBootcampModel.InstructorId = this.authService.getCurrentUserId();

        this.cloudiranyService.addbootcampimage(BootcampaddFormdata).subscribe(
            (response: updateCloudrinaryResponse) => {
                addBootcampModel.BootcampImage = response.url;
                this.bootcampService.add(addBootcampModel).subscribe(
                    (response) => {
                        
                        this.toastrService.message("Bootcamp Başarıyla Eklendi.", "Başarılı!", ToastrMessageType.Success);
                        this.router.navigate(['/instructor/bootcamp/list']);
                    },
                    (error) => {
                        console.log("addbotcampmodel:" + addBootcampModel.BootcampImage)
                        this.toastrService.message("Bootcamp Eklenemedi..", "Hata!", ToastrMessageType.Error);
                    }
                );
            },
            (error) => {
                this.toastrService.message("Resim yüklenemedi..", "Hata!", ToastrMessageType.Error);
            }
        );
    } else {
        this.toastrService.message("Form doğrulama hatası..", "Hata!", ToastrMessageType.Error);
    }
}


}
