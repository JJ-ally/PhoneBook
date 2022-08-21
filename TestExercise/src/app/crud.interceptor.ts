import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpResponse, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { delay, Observable, of} from 'rxjs';


@Injectable()
export class CrudInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {}
  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleRequests(request, next);
  }
  private _JsonPath = "assets/contacts.json";
  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
      const { url, method } = req;
      if (url.endsWith("/contacts") && method === "POST") {
        const { body } = req.clone();
        body.id = uuid();
        return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
      }
      if (url.endsWith("/contacts") && method === "PUT") {
        const { body } = req.clone();
        body.id = uuid();
        return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
      }
      if (url.match(/\/contacts\/.*/) && method === "DELETE") {
        const empId = this.getEmployeeId(url);
        return of(new HttpResponse({ status: 200, body: empId })).pipe(
          delay(500)
        );
      }
      return next.handle(req);
    }

    getEmployeeId(url: any) {
      const urlValues = url.split("/");
      return urlValues[urlValues.length - 1];
    }
  }
 
  export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: CrudInterceptor,
    multi: true,
  }

