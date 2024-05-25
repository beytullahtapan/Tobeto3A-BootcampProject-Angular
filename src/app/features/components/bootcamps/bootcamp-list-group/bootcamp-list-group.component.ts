import { CommonModule } from '@angular/common';
import { PageRequest } from '../../../../core/models/page-request';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BootcampListDto } from '../../../models/responses/bootcamp/bootcamp-list-item-dto';

@Component({
  selector: 'app-bootcamp-list-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bootcamp-list-group.component.html',
  styleUrl: './bootcamp-list-group.component.scss'
})
export class BootcampListGroupComponent implements OnInit {

  currentPageNumber!:number;
  bootcampList:BootcampListDto={
    index:0,
    size:0,
    count:0,
    hasNext:false,
    hasPrevious:false,
    pages:0,
    items:[]
  };
  constructor(private BootcampService:BootcampService,private activatedRoute:ActivatedRoute){}
  readonly PAGE_SIZE=6;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["instructorId"]){
        this.getBootcampListByInstructor({page:0,pageSize:this.PAGE_SIZE},params["modelId"])
      }else{this.getList({page:0,pageSize:this.PAGE_SIZE})}
    })
    
  }


  getList(pageRequest:PageRequest){
    this.BootcampService.getList(pageRequest).subscribe((response)=>{
      this.bootcampList=response;
      this.updateCurrentPageNumber();
    })
    
  }

  getBootcampListByInstructor(pageRequest:PageRequest,instructorId:string){
    this.BootcampService.getBootcampListByInstructorId(pageRequest,instructorId).subscribe((response)=>{
      this.bootcampList=response;
      this.updateCurrentPageNumber();
    })
  }

  onViewMoreClicked():void{
    const nextPageIndex = this.bootcampList.index+1;
    const pageSize = this.bootcampList.size;

    this.getList({page:nextPageIndex,pageSize})
    this.updateCurrentPageNumber();
  }

  onPreviousPageClicked():void{
    const previousPageIndex = this.bootcampList.index-1;
    const pageSize = this.bootcampList.size;
    this.getList({page:previousPageIndex,pageSize});
    this.updateCurrentPageNumber();
  }

  updateCurrentPageNumber():void{
    this.currentPageNumber=this.bootcampList.index+1;
  }

}