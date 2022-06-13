import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css']
})
export class EncryptComponent implements OnInit {

  public toEncrypt:string;
  public encryptedValue:string;

  constructor(private dataService: DataServiceService,private formBuilder: FormBuilder) { 
    this.toEncrypt='';
    this.encryptedValue='';
  }

  

  ngOnInit(): void {
  }

  onSubmitEncrypt():void {
    this.encryptedValue='';
    this.dataService.encrypt(this.toEncrypt, (data:string)=>{
        alert("Encrypted Value: "+this.encryptedValue);
    });
    
  }



}
