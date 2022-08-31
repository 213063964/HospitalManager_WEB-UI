import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; 
import { ReactiveFormsModule } from '@angular/forms';

import { ShiftsManagementComponent } from './shifts-management/shifts-management.component';

const routes : Routes = [
  { path: 'shifts-management', component: ShiftsManagementComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ShiftsManagementComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)],
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
