import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss'
})
export class JumbotronComponent implements AfterViewInit {
  words = ["Merhaba!", "Teach It Free sitesine hoş geldiniz!", "Burada sizi geliştirecek dersler bulabilirsiniz."];
  i = 0;
  j = 0;
  currentWord = "";
  isDeleting = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.type();
  }

  type() {
    this.currentWord = this.words[this.i];
    const typewriterElement = this.elementRef.nativeElement.querySelector('#typewriter');
    if (typewriterElement) {
      if (this.isDeleting) {
        typewriterElement.textContent = this.currentWord.substring(0, this.j - 1);
        this.j--;
        if (this.j == 0) {
          this.isDeleting = false;
          this.i++;
          if (this.i == this.words.length) {
            this.i = 0;
          }
          this.type();
        } else {
          setTimeout(() => this.type(), 100); 
        }
      } else {
        typewriterElement.textContent = this.currentWord.substring(0, this.j + 1);
        this.j++;
        if (this.j == this.currentWord.length) {
          this.isDeleting = true;
          setTimeout(() => this.type(), 1000); 
        } else {
          setTimeout(() => this.type(), 100); 
        }
      }
    }
  }
}
