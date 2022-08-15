import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';

import { AuthModule } from './auth/auth.module';
import { FeatureModule } from './feature/feature.module';
import { FilterPipe } from './shared/pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FeatureModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
