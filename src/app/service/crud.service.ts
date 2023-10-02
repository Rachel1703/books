import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //Nodejs API link
REST_API:string = "http://localhost:5001/api/books";
//Set HTTP Headers
httpHeaders=new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  //add books
  addBook(data:Book):Observable<any>{
      let API_URL = `${this.REST_API}`;
      return this.http.post(API_URL,data).pipe(catchError(this.handleError));
  }

  //
  getBooks(){
    return this.http.get(`${this.REST_API}`);
  }

  getBook(id:any) : Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any) => {
        return res || {}
    }),catchError(this.handleError))
  }

  updateBook(id:any,data:any) : Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.put(API_URL,data,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  // delete book from server
  deleteBook(id:any,data:any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.http.delete(API_URL,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
    let errorMessage ="";
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code : ${error.status }\nMessage : ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
    
  }
}
