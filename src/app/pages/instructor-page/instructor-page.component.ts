import { Component } from '@angular/core';
import { InstructorProfileCardComponent } from '../../features/components/instructor/instructor-profile-card/instructor-profile-card.component';
import { BootcampCardComponent } from '../../features/components/bootcamps/bootcamp-card/bootcamp-card.component';
import { CommonModule } from '@angular/common';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { UserService } from '../../features/services/concretes/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChatUserResponse } from '../../features/models/responses/chat/chat-user-response';
import { AuthBaseService } from '../../features/services/abstracts/auth-base.service';
import { PageRequest } from '../../core/models/page-request';
import { GetBootcampsListResponse } from '../../features/models/responses/bootcamp/get-bootcamps-list-response';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { GetbyidInstructorResponse } from '../../features/models/responses/instructor/getbyid-instructor-response';


@Component({
  selector: 'app-instructor-page',
  standalone: true,
  imports: [InstructorProfileCardComponent, BootcampCardComponent, CommonModule, RouterModule],
  templateUrl: './instructor-page.component.html',
  styleUrl: './instructor-page.component.scss'
})
export class InstructorPageComponent {

  instructorData: GetbyidInstructorResponse| null = null; 
  bootcamps: GetBootcampsListResponse[] | null = null; 
  error: any;
  instructorId: string = '';

  constructor(
    private bootcampService: BootcampService,
    private userService: UserService,
    private router: Router,
    private authService: AuthBaseService,
    private instructorService:InstructorService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.instructorId = params['instructorId'];
    })
    console.log('hellö '+this.instructorId);
    this.loadInstructorData(this.instructorId);
    this.loadBootcamps();
  }

  sendMessage(): void {
    const user: ChatUserResponse={
      id : this.instructorData!.id,
      userName: this.instructorData!.userName,
      firstName: this.instructorData!.firstName,
      lastName: this.instructorData!.lastName,
      email: this.instructorData!.email
    }
    // Kullanıcıyı sohbet kullanıcıları listesine ekleyin ve sohbet sayfasına yönlendirin
    this.router.navigate(['/chat'], { state: { userToAdd: user } });
  }

  loadBootcamps(): void {
    const pageRequest: PageRequest = {  page: 0, pageSize: 5 };
    this.bootcampService.getBootcampListByInstructorId(pageRequest, this.instructorId).subscribe(
      (response) => {
        if (response && response.items) {
          response.items.forEach(bootcamp => {
            this.userService.userinfo({ ıd: bootcamp.instructorId }).subscribe(
              (userInfoResponse) => {
                bootcamp.instructorFirstName = userInfoResponse.firstName
                bootcamp.instructorLastName = userInfoResponse.lastName;
              },
              (error) => {
                console.error('Error fetching user info', error);
              }
            );
          });
          this.bootcamps = response.items;
        } else {
          console.error('Response or items array is null.');
        }
      },
      (error) => {
        this.error = error;
        console.error('Error fetching bootcamps', error);
      }
    );
  }

  loadInstructorData(instructorId:string):void{
    this.instructorService.getInstructorById(this.instructorId).subscribe(
      (response) => {
        if (response) {
          this.instructorData = response;
        } else {
          console.error('Response is null.');
        }
      },
      (error) => {
        this.error = error;
        console.error('Error fetching instructor', error);
      }
    )  
  }

}
