import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { UserService } from '../../features/services/concretes/user.service';
import { ListBootcampResponse, BootcampItem } from '../../features/models/responses/bootcamp/get-bootcamps-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListBootcampRequest } from '../../features/models/requests/bootcamp/get-bootcamp-request';
import { BootcampListDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../core/models/page-request';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { InstructorListDto } from '../../features/models/responses/instructor/instructor-list-dto';

@Component({
  selector: 'app-bootcamp-list-page',
  standalone: true,
  templateUrl: './bootcamp-list-page.component.html',
  styleUrls: ['./bootcamp-list-page.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class BootcampListPageComponent implements OnInit {
  bootcamps: BootcampItem[] | any = null; 
  error: any;
  currentPageNumber!: number; 
  instructors!:InstructorListDto;
  selectedInstructorId: string = '';
  selectedBootcampId: string = '';
  filteredBootcamps: any[] = [];
  bootcampList: BootcampListDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  }; 

  constructor(
    private bootcampService: BootcampService,
    private userService: UserService,
    private instructorService:InstructorService
  ) { }

  readonly PAGE_SIZE = 10;

  ngOnInit(): void {
    this.loadBootcamps();
    this.loadInstructors();
  }
  
  loadInstructors() {
    this.instructorService.GetListAll().subscribe(response => {
      this.instructors = response;
    });
  }

  loadBootcamps(): void {
    const request: ListBootcampRequest = {  pageIndex: 0, pageSize: 5 };
    this.bootcampService.GetBootcamp(request).subscribe(
      (response: ListBootcampResponse) => {
        if (response && response.items) {
          response.items.forEach(bootcamp => {
            this.userService.userinfo({ ıd: bootcamp.instructorId }).subscribe(
              (userInfoResponse) => {
                bootcamp.InsturctorName = `${userInfoResponse.firstName} ${userInfoResponse.lastName}`;
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
  
  onInstructorChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedInstructorId = selectElement.value;
    this.loadBootcamps();
  }

  filterBootcamps() {
    const pageRequest: PageRequest = { page: 0, pageSize: 10 };

    if (this.selectedInstructorId && this.selectedBootcampId) {
      // Eğitmen ve bootcamp seçimine göre filtrele
      this.bootcampService.getListByBootcampSearch(pageRequest, this.selectedInstructorId,this.selectedBootcampId).subscribe(response => {
        this.filteredBootcamps = response.items;
      });
    } else if (this.selectedInstructorId) {
      // Sadece eğitmene göre filtrele
      this.bootcampService.getBootcampListByInstructorId(pageRequest, this.selectedInstructorId).subscribe(response => {
        this.filteredBootcamps = response.items;
      });
    } else if (this.selectedBootcampId) {
      // Sadece bootcamp'e göre filtrele
      this.bootcampService.getBootcampListByBootcampId(pageRequest,this.selectedBootcampId).subscribe(response => {
        this.filteredBootcamps = response.items;
      });
    } else {
      // Tüm bootcamp'leri göster
      this.filteredBootcamps = this.bootcamps;
    }
  }

  applyFilters() {
    const pageRequest: PageRequest = { page: 0, pageSize: 10 };
  
    if (this.selectedInstructorId && this.selectedBootcampId) {
      // Eğitmen ve bootcamp seçimine göre filtrele
      this.bootcampService.getListByBootcampSearch(pageRequest, this.selectedInstructorId, this.selectedBootcampId).subscribe(response => {
        this.filteredBootcamps = response.items;
      });
    } else if (this.selectedInstructorId) {
      // Sadece eğitmene göre filtrele
      this.bootcampService.getBootcampListByInstructorId(pageRequest, this.selectedInstructorId).subscribe(response => {
        this.filteredBootcamps = response.items;
      });
    } else if (this.selectedBootcampId) {
      // Sadece bootcamp'e göre filtrele
      this.bootcampService.getBootcampListByBootcampId(pageRequest, this.selectedBootcampId).subscribe(response => {
        this.filteredBootcamps = response.items;
      });
    } else {
      // Tüm bootcamp'leri göster
      this.filteredBootcamps = this.bootcamps;
    }
  }
  
  onBootcampChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedBootcampId = selectElement.value;
    this.loadBootcamps();
  }


  getList(pageRequest: PageRequest) {

    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcampList = response;

      this.updateCurrentPageNumber();
    });
  }
  
  getInstructors(){
    this.instructorService.GetListAll().subscribe((response)=>{
      this.instructors=response;
    })
  }
  

  onViewMoreClicked(): void {
    const nextPageIndex = this.bootcampList.index + 1;
    const pageSize=this.bootcampList.size;
    this.getList({page:nextPageIndex,pageSize})
    this.updateCurrentPageNumber();     
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    const pageSize = this.bootcampList.size;
    this.getList({page:previousPageIndex,pageSize});
    this.updateCurrentPageNumber();               
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }   
}
