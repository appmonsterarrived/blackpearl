import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
// import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private httpClient: HttpClient) { }

  private REST_API_SERVER = "https://api.github.com/repos";
  private REPO_OWNER = "/akmkbkk";
  private REPO_NAME = "/codelightwebhooktest"
  private AUTH = "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"
  private CONTENTS = "/contents"
  private slash = "/";

  private ENCRYPTION_URL = "localhost:8888/encrypt";
  private GREETING_URL = "localhost:8081/anchor/greeting";

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  public sendGetRequest(fileName: string, headers: HttpHeaders) {
    const requestOptions = { headers: headers };
    return this.httpClient.get(this.REST_API_SERVER + this.REPO_OWNER + this.REPO_NAME + this.CONTENTS
      + this.slash + fileName, requestOptions).pipe(catchError(this.handleError));
  }

  public sendPutRequest(fileName: string, body: any, headers: HttpHeaders) {
    const requestOptions = { headers: headers };
    return this.httpClient.put(this.REST_API_SERVER + this.REPO_OWNER + this.REPO_NAME + this.CONTENTS
      + this.slash + fileName, body, requestOptions).pipe(catchError(this.handleError));
  }

  public greeting() {
    return this.httpClient.get(`http://localhost:8081/anchor/user`, { observe: 'response' });
  }

  private greetingMessage: string = "";
  public get GreetingMessage(): string {
    return this.greetingMessage;
  }

  private listOfFile:any ='';
  public get ListOfFile():any {
    return this.listOfFile;
  }

  public async appInit() {

    let queryParamString: string = window.location.href.split("?")[1];

    if (!queryParamString && localStorage.getItem("status") === "loggedIn") {

      var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        let _serviceObject = this;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            _serviceObject.greetingMessage = this.responseText;
          }
        });

        xhr.open("GET", "http://localhost:8081/anchor/greeting");
        // WARNING: Cookies will be stripped away by the browser before sending the request.
        // xhr.setRequestHeader("Cookie", "JSESSIONID=B0F22490181F6F86EAEEE9A785D9EB8C");

        xhr.send();

    }
    else if (queryParamString) {

      let params: URLSearchParams = new URLSearchParams(queryParamString);

      if (params && params.get("status") === "loggedIn") {

        localStorage.setItem("status", "loggedIn")

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        let _serviceObject = this;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            _serviceObject.greetingMessage = this.responseText;
          }
        });

        xhr.open("GET", "http://localhost:8081/anchor/greeting");
        // WARNING: Cookies will be stripped away by the browser before sending the request.
        // xhr.setRequestHeader("Cookie", "JSESSIONID=B0F22490181F6F86EAEEE9A785D9EB8C");

        xhr.send();

      }

    }
    else {

      window.location.href = `http://localhost:8081/anchor/greeting`;

    }
  }

  public async getListOfFiles(loggerdInUser:string, callback:any):Promise<any>{

    var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        let _serviceObject = this;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            callback(this.responseText);
          }
        });

        xhr.open("GET", "http://localhost:8081/anchor/applicationProperties");

        xhr.send();



  }

  public getHistoryForFile(fileName:string,headers:HttpHeaders){
    const requestOptions = { headers: headers };
    return this.httpClient.get(this.REST_API_SERVER + this.REPO_OWNER + this.REPO_NAME + "/commits"
      +"?path="
      + fileName
      +"&per_page=5", requestOptions).pipe(catchError(this.handleError));
  }

  public async encrypt(toEncrypt: string, callback:any) :Promise<any>{

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    let _serviceObject = this;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText)
        callback(this.responseText);
      }
    });

    xhr.open("POST", this.ENCRYPTION_URL);
    xhr.setRequestHeader("Authorization", "Basic cm9vdDpwYXNzd29yZA==");
    xhr.send(toEncrypt);
  }

}
