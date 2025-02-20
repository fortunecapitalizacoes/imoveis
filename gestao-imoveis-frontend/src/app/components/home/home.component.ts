import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images = [
    'https://www.jll.com.br/images/v2-needs-page/Heroimage_5.jpg.rendition/Heroimage_5_1600x600.jpg',
    'https://www.jll.com.br/images/hero/jll-global-sustainability-banner-desktop.jpg',
    'https://eskipaper.com/images/batman-2.jpg'
  ]; 

  currentIndex = 0;
  intervalId: any;
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }
  
}
