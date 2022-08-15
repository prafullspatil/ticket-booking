import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeatService } from 'src/app/shared/service/seat.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardShow: any;
  constructor(private seat: SeatService, private router: Router) { }

  ngOnInit(): void {

  }
  
  // seatBook(show : any) {
  //   // alert('product added to Cart ');
  //   this.seat.seatBook(show);
  //   console.log("show",show);
  // }

}
