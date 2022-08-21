import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
  constructor(private http:HttpClient) { }
  Url='https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';

  getContacts(){
    return this.http.get<any[]>(this.Url)
  }

  addEmployee(employee: any): Observable<any> {
    return this.http
      .post<any>("http://localhost:4200/contacts", employee, {
        observe: "response",
      })
      .pipe(catchError(this.handleError));
  }
  editEmployee(employee: any): Observable<any> {
    return this.http
      .put<any>("http://localhost:4200/contacts", employee, {
        observe: "response",
      })
      .pipe(catchError(this.handleError));
  }
  deleteEmployee(empId: any) {
    return this.http
      .delete<any>("http://localhost:4200/contacts/" + empId, {
        observe: "response",
      })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
}
