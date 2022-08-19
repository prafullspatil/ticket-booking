import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../auth/signin/signin.component';
import { AuthGuard } from '../shared/auth-guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { SingleShowComponent } from './shows/single-show/single-show.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'show/:id', canActivate: [AuthGuard], component: SingleShowComponent },
  { path: 'ticket/:id', canActivate: [AuthGuard], component: TicketComponent },
  { path: 'history', canActivate: [AuthGuard], component: HistoryComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
