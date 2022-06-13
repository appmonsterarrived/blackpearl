import { Component, OnInit } from '@angular/core';
import { ViewRepoFileComponent } from '../view-repo-file/view-repo-file.component';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userName:string;

  constructor(public viewRepoComponent:ViewRepoFileComponent,public dataService:DataServiceService) {
    this.userName = viewRepoComponent.loggedInUser;
   }

  ngOnInit(): void {
    this.dataService.appInit();
  }

  onClickLogOut():void {
    localStorage.removeItem("status");
    window.location.href = 'http://localhost:8081/login';
  }

}
