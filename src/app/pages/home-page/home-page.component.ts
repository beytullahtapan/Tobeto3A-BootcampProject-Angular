import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FaqComponent } from '../../features/components/faq/faq.component';
import { BootcampListGroupComponent } from '../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { JumbotronComponent } from '../../features/components/jumbotron/jumbotron.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule,BootcampListGroupComponent,JumbotronComponent,FaqComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}