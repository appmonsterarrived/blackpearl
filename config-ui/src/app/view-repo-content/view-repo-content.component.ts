import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-view-repo-content',
  templateUrl: './view-repo-content.component.html',
  styleUrls: ['./view-repo-content.component.css']
})
export class ViewRepoContentComponent implements OnInit {

  public accessibleFiles: Array<any> = [
    { name: "webhooktriggerfile.txt", description: "Trigger File" },
    { name: "filetocreate.txt", description: "Second file" }
  ]

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
  }

}
