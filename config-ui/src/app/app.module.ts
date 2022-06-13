import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewRepoFileComponent } from './view-repo-file/view-repo-file.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ViewRepoContentComponent } from './view-repo-content/view-repo-content.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EncryptComponent } from './encrypt/encrypt.component' 

@NgModule({
  declarations: [
    AppComponent,
    ViewRepoFileComponent,
    ViewRepoContentComponent,
    NavbarComponent,
    EncryptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormsModule,ViewRepoFileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
