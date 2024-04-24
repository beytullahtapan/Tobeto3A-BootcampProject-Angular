import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { BootcampListGroupComponent } from '../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { JumbotronComponent } from '../../shared/components/jumbotron/jumbotron.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FaqComponent } from '../../shared/components/faq/faq.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule,BootcampListGroupComponent,JumbotronComponent,NavbarComponent,FaqComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}