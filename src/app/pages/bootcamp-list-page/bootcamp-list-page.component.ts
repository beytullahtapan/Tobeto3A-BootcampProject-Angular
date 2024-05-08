import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { BootcampListDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-bootcamp-list-page',
    standalone: true,
    templateUrl: './bootcamp-list-page.component.html',
    styleUrl: './bootcamp-list-page.component.scss',
    imports: [CommonModule]
})
export class BootcampListPageComponent implements OnInit{
  
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
 
  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute) {}
  readonly PAGE_SIZE = 6;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["instructorId"]) {
        this.getBootcampListByInstructor({ page: 0, pageSize: this.PAGE_SIZE }, params["instructorId"])
      } else { this.getList({ page: 0, pageSize: this.PAGE_SIZE }) }
    })

  }

  getList(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcampList = response;      
      this.updateCurrentPageNumber();
    })

  }

  getBootcampListByInstructor(pageRequest: PageRequest, instructorId: string) {
    this.bootcampService.getBootcampListByInstructorId(pageRequest, instructorId).subscribe((response) => {
      this.bootcampList = response;
      this.updateCurrentPageNumber();
    })
  }

  onViewMoreClicked(): void {
    const nextPageIndex = this.bootcampList.index + 1;
    const pageSize = this.bootcampList.size;
    
    //this.getList({ page: nextPageIndex, pageSize })

    this.activatedRoute.params.subscribe(params => {
      if (params["instructorId"]) {
        this.getBootcampListByInstructor({ page: nextPageIndex, pageSize: pageSize }, params["instructorId"])
      } else { this.getList({ page: nextPageIndex, pageSize: pageSize }) }
    })
    
    this.updateCurrentPageNumber();
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    const pageSize = this.bootcampList.size;
    //this.getList({ page: previousPageIndex, pageSize });

    this.activatedRoute.params.subscribe(params => {
      if (params["instructorId"]) {
        this.getBootcampListByInstructor({ page: previousPageIndex, pageSize: pageSize }, params["instructorId"])
      } else { this.getList({ page: previousPageIndex, pageSize: pageSize }) }
    })
    this.lowerCurrentPageNumber();
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }

  lowerCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index - 1;
  }
}
