import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { UserService } from '../../features/services/concretes/user.service';
import { BootcampItem } from '../../features/models/responses/bootcamp/get-bootcamps-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BootcampListDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../core/models/page-request';
import { BootcampApplicationRequest } from '../../features/models/requests/bootcampapplication/bootcamp-application-request';
import { AuthService } from '../../features/services/concretes/auth.service';
import { BootcampApplicationService } from '../../features/services/concretes/bootcampApplication.service';
import { AppToastrService, ToastrMessageType } from '../../features/services/concretes/app-toastr.service';
import { BootcampCardComponent } from '../../features/components/bootcamps/bootcamp-card/bootcamp-card.component';
import { BootcampListService } from '../../features/services/concretes/bootcamplist.service';

@Component({
  selector: 'app-bootcamp-list-page',
  standalone: true,
  templateUrl: './bootcamp-list-page.component.html',
  styleUrls: ['./bootcamp-list-page.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule,BootcampCardComponent]
})
export class BootcampListPageComponent implements OnInit {
  bootcamps: BootcampItem[] | any = null; 
  error: any;
  currentPageNumber!: number; 
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
    private bootcampListService: BootcampListService,
  ) { }

  readonly PAGE_SIZE = 10;

  ngOnInit(): void {
    this.loadBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
  }
  


  loadBootcamps(pageRequest: PageRequest): void {
    this.bootcampListService.loadBootcamps(pageRequest).subscribe(
      (response) => {
        this.bootcampList = response;
      },
      (error) => {
        console.error('Error loading bootcamps', error);
      }
    );
  }

  applyToBootcamp(bootcampId: number): void {
    this.bootcampListService.applyToBootcamp(bootcampId);
  }
  
  
  onViewMoreClicked(): void {
    const nextPageIndex = this.bootcampList.index + 1;
    const pageSize = this.bootcampList.size;
    this.loadBootcamps({ page: nextPageIndex, pageSize });
    this.updateCurrentPageNumber();     
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    const pageSize = this.bootcampList.size;
    this.loadBootcamps({ page: previousPageIndex, pageSize });
    this.updateCurrentPageNumber();               
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }   

  
}
