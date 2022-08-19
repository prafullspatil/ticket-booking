import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './dashboard/card/card.component';
import { SingleShowComponent } from './shows/single-show/single-show.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { TicketComponent } from './ticket/ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CardComponent,
    SingleShowComponent,
    FilterPipe,
    TicketComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeatureModule { }
