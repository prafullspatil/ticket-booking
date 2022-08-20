import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  reserved: string[] = [];
  totalPrice: number = 0;
  seatDetails: any = []
  user = JSON.parse(localStorage.getItem('user')!);

  constructor(private api: ApiService, private router: ActivatedRoute, private routes: Router) { }

  ngOnInit(): void {

    this.getShowById();
    this.getReservedSeat()

  }

  getReservedSeat() {
    this.api.getSeatDetails(this.router.snapshot.params['id']).subscribe((res) => {
      this.splitString(res);
    })
  }

  splitString(data: any) {
    data.forEach((a: any) => {
      let split:any=[];
      split=a.reserved.split(", ");
      this.mergerArray(split);
    });
  }

  mergerArray(data:any){
    data.forEach((a:any)=>{
      this.reserved = this.reserved.concat(a);
    })
  }

  getShowById() {
    this.api.getShowById(this.router.snapshot.params['id'])
      .subscribe((resp) => {
        this.show = resp;
      });
  }

  onSeatClicked(seatPosition: string) {
    let i = this.selected.indexOf(seatPosition);

    if (i !== -1) {
      this.selected.splice(i, 1)
    } else {
      if (this.reserved.indexOf(seatPosition) === -1)
        this.selected.push(seatPosition);
    }
  }


  seatStatus(seatPosition: string) {
    if (this.reserved.indexOf(seatPosition) !== -1) {
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
      const data = {
        userId: this.user.id,
        reserved: this.selected,
        showId: this.show.id
      }
      this.api.saveSeatDetails(data).subscribe((res) => {
      });
      localStorage.clear();
      alert("Booked Successfully");
      this.routes.navigate(['/dashboard']);

    } else {
      alert("No seats selected!");
    }
  }




}
