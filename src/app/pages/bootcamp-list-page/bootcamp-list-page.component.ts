import { Component } from '@angular/core';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { BootcampListDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructorListDto } from '../../features/models/responses/instructor/instructor-list-dto';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { GetBootcampsListResponse } from '../../features/models/responses/bootcamp/get-bootcamps-list-response';


@Component({
    selector: 'app-bootcamp-list-page',
    standalone: true,
    templateUrl: './bootcamp-list-page.component.html',
    styleUrl: './bootcamp-list-page.component.scss',
    imports: [FormsModule, CommonModule, RouterModule]
})
export class BootcampListPageComponent {
    currentPageNumber!: number;    
    instructors!: InstructorListDto;
    filterText="";
    currentBootcamp!:GetBootcampsListResponse;
    bootcampList: BootcampListDto = {
      index: 0,
      size: 0,
      count: 0,
      hasNext: false,
      hasPrevious: false,
      pages: 0,
      items: []
    }; 
    constructor(private bootcampService: BootcampService,private instructorService: InstructorService,private activatedRoute:ActivatedRoute) { }
    readonly PAGE_SIZE=1;
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if(params["instructorid"]){
          this.getBootcampListByInstructor({page:0,pageSize:this.PAGE_SIZE},params["instructorid"])
        }else{this.getList({page:0,pageSize:this.PAGE_SIZE})}
    })
        }
  
    getList(pageRequest: PageRequest) {
      
      this.bootcampService.getList(pageRequest).subscribe((response) => {
        this.bootcampList = response;
        
        this.updateCurrentPageNumber();
      });
    }
  
    getBootcampListByInstructor(pageRequest: PageRequest, instructorId: string) {
      
      this.bootcampService.getBootcampListByInstructorId(pageRequest, instructorId).subscribe((response) => {
        this.bootcampList = response;       
        this.updateCurrentPageNumber();
      });
    }
     
    onInstructorAdded(instructorId: string) {
      if (instructorId) {
        const pageRequest: PageRequest = { page: 0, pageSize: this.PAGE_SIZE };
        this.bootcampService.getBootcampListByInstructorId(pageRequest, instructorId).subscribe(bootcamps => {
          this.bootcampList = bootcamps;
        });
      }
    }

    getBootcamps(pageRequest: PageRequest,instructorId:string){
      this.bootcampService.getBootcampListByInstructorId(pageRequest, instructorId).subscribe((response)=>{
        this.bootcampList=response;
      })
    }
    getCurrentBootcampClass(bootcampList:GetBootcampsListResponse){
      if(bootcampList==this.currentBootcamp){
        return "list-group-item active"
      }else{
       return "list-group-item"
      }
    }
    
    setCurrentBootcamp(bootcampList:GetBootcampsListResponse){
      this.currentBootcamp=bootcampList;
    }

    getDefaultBootcampClass(){
      if(!this.currentBootcamp){
        return "list-group-item list-group-item-info"
      }else{
        return "list-group-item"
      }
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

