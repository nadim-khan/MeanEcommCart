import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-gym-view',
  templateUrl: './gym-view.component.html',
  styleUrls: ['./gym-view.component.scss']
})
export class GymViewComponent implements OnInit {
  slides = [
    {image: 'https://gsr.dev/material2-carousel/assets/demo.png'},
     {image: 'https://gsr.dev/material2-carousel/assets/demo.png'},
     {image: 'https://gsr.dev/material2-carousel/assets/demo.png'},
     {image: 'https://gsr.dev/material2-carousel/assets/demo.png'},
     {image: 'https://gsr.dev/material2-carousel/assets/demo.png'}];

  constructor() { }

  ngOnInit(): void {
  }

}
