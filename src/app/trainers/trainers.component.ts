import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {
  allTrainers;
  rows;
  cols;
  constructor(private service: AuthService) { 
    this.service.getAllUsersList().subscribe(listData => {
      this.allTrainers = listData;
      this.allTrainers = this.allTrainers.filter(role => role.roles[0] === 'trainer');

    })
  }

  ngOnInit(): void {
  }

}
