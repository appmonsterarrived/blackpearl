import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { HttpHeaders } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';
import { retry } from 'rxjs';

@Component({
  selector: 'app-view-repo-file',
  templateUrl: './view-repo-file.component.html',
  styleUrls: ['./view-repo-file.component.css']
})
export class ViewRepoFileComponent implements OnInit {

  private pat:string = "Z2hwX3BNaDhBM0d4YWFiRnd2OVZ1N3FjRHpsZlNEb04zVzNqTmVyVw==";
  public data :any;
  public sha:string;
  public fileSelected:string;
  public updateSuccess:boolean;
  public newSha:any;
  public commitMessage:string;
  public commitSuccess:boolean;
  public updateResponse:any;
  public loggedInUser:string;
  public historyData:Array<any>;

  public accessibleFiles: Array<any> = [
    { name: "webhooktriggerfile.txt", description: "Trigger File" },
    { name: "filetocreate.txt", description: "Second file" }
  ]

  

  public repoFileInfo:Array<any>;
  

  constructor(public dataService: DataServiceService,private formBuilder: FormBuilder) {
      this.data=null;
      this.sha='';
      this.fileSelected = '';
      this.updateSuccess=false;
      this.commitMessage='';
      this.commitSuccess=false;
      this.updateResponse='';
      this.loggedInUser='';
      this.repoFileInfo=Array<any>();
      this.historyData=Array<any>();
   }

   viewFileForm = this.formBuilder.group({
    fileContent:'',
    commitMessage:''

  });
  

  onSubmit(): void {
    
    if(this.viewFileForm.value.fileContent==undefined){
      alert("ERROR - content can not be empty")
      this.viewFileForm.value.fileContent=this.data;
    }else{
      this.saveFileToGit(this.fileSelected,this.viewFileForm.value.fileContent,this.sha)
    }
    
  }

  onClickFileName(fileName:string):void{
    this.updateResponse='';
    this.commitMessage='';
    this.getFileDataFromGit(fileName);
  }

  saveFileToGit(fileName:string, content:string, sha:string):void{
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json',
      'Authorization':'token'+" "+atob(this.pat)
    });

    const body = {
        message:this.commitMessage,
        content:btoa(content),
        sha:sha
    }

    this.dataService.sendPutRequest(fileName,body,headers).subscribe((data)=> {
      this.newSha = JSON.parse(JSON.stringify(data)).content.sha;
      this.updateResponse = {
        status: "Update success",
        fromSha:this.sha,
        toSha:this.newSha
      };
    
      this.getFileDataFromGit(fileName);
      
      //alert("new SHA -"+this.newSha+", old sha - "+this.sha);
      
    });
  }

  getFileDataFromGit(fileName : string):void{
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json'
    });

    this.dataService.sendGetRequest(fileName,headers).subscribe((data) => {
      var jsonData = JSON.stringify(data);
      var parsedData = JSON.parse(jsonData);
      this.data=atob(parsedData.content);
      this.sha=parsedData.sha;
      this.fileSelected=fileName;
    });
    const headers2 = new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json',
      'Authorization':'token'+" "+atob(this.pat)
    });

    this.dataService.getHistoryForFile(fileName,headers2).subscribe((data) => {
      this.historyData=JSON.parse(JSON.stringify(data));
      console.log(this.historyData);
    });
    
    
  }
  
  ngOnInit(): void {

      this.dataService.appInit();
      this.loggedInUser = this.dataService.GreetingMessage;
      this.dataService.getListOfFiles(this.loggedInUser,(data:string)=> {
          this.repoFileInfo = JSON.parse(data);
      });
    
  

  }




}
