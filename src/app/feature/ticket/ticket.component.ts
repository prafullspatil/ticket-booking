import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  public show: any = [];
  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  cols: number[] = [1, 2, 3, 4, 5];
  selected: string[] = [];
  totalPrice: number = 0;
  
  constructor(private api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.getShowById();
  }

  getShowById() {
    this.api.getShowById(this.router.snapshot.params['id'])
      .subscribe((resp) => {
        this.show = resp;
        console.log(resp);
      });
  }

 
  onSeatClicked(seatPosition: string) {
    let i = this.selected.indexOf(seatPosition);

    if (i !== -1) {
      this.selected.splice(i, 1)
    } else {
    
      if (this.show.reserved.indexOf(seatPosition) === -1)
        this.selected.push(seatPosition);
    }
  }

  
   seatStatus(seatPosition: string) {
    if (this.show.reserved.indexOf(seatPosition) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPosition) !== -1) {
      return 'selected';
    } else {
      return 0;
    }
  }

  clearSeats() {
    this.selected = [];
  }
  
   bookSeat() {
    if (this.selected.length > 0) {
      alert("Selected Seats: " + this.selected + "\nTotal: " + (this.show.price * this.selected.length));
    } else {
      alert("No seats selected!");
    }
  }


  

}
