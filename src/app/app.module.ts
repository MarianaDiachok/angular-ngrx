import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { TasksModule } from './tasks/tasks.module';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerModule } from './widgets/spinner/spinner.module';

import { AppComponent } from './app.component';
import { RootStoreModule } from './core/@ngrx/root-store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    TasksModule,
    SpinnerModule.forRoot(),
    RootStoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
