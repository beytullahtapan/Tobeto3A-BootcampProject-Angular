import { CommonModule } from '@angular/common';
import { PageRequest } from '../../../../core/models/page-request';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BootcampListDto } from '../../../models/responses/bootcamp/bootcamp-list-item-dto';
import { UserService } from '../../../services/concretes/user.service';
import { AuthService } from '../../../services/concretes/auth.service';
import { BootcampApplicationService } from '../../../services/concretes/bootcampApplication.service';
import { BootcampItem } from '../../../models/responses/bootcamp/get-bootcamps-response';
import { BootcampApplicationRequest } from '../../../models/requests/bootcampapplication/bootcamp-application-request';
import { AppToastrService, ToastrMessageType } from '../../../services/concretes/app-toastr.service';
import { Observable } from 'rxjs';
import { BootcampListService } from '../../../services/concretes/bootcamplist.service';
import { BootcampCardComponent } from '../bootcamp-card/bootcamp-card.component';

@Component({
  selector: 'app-bootcamp-list-group',
  standalone: true,
  imports: [CommonModule,RouterModule,BootcampCardComponent],
  templateUrl: './bootcamp-list-group.component.html',
  styleUrl: './bootcamp-list-group.component.scss'
})
export class BootcampListGroupComponent implements OnInit {

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

  readonly PAGE_SIZE = 3;

  ngOnInit(): void {
    this.loadBootcamps();
  }
  

  loadBootcamps(): void {
    const pageRequest = { page: 0, pageSize: 5 }; 
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
  

  
}