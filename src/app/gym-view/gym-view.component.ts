import { Component, HostListener, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-gym-view',
  templateUrl: './gym-view.component.html',
  styleUrls: ['./gym-view.component.scss']
})
export class GymViewComponent implements OnInit {
  heightProportion = 30;
  image;
  slides = [
     {image: 'https://source.unsplash.com/Frx8qskriDI/1600x900'},
     {image: 'https://source.unsplash.com/VJ2s0c20qCo/1600x900'},
     {image: 'https://source.unsplash.com/RKfJhC_bF2A/1600x900'},
     {image: 'https://source.unsplash.com/AB7TcT_GVU0/1600x900'},
     {image: 'https://source.unsplash.com/gEbn_y-2RSM/1600x900'}];

  constructor() { }

  ngOnInit(): void {
  }

  // Check screen width and size
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    const height = event.target.innerHeight;
    if (event.target.innerWidth < 420) {
      this.heightProportion = 150;
    } else {
      this.heightProportion = 30;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

}
