import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private APIURL = environment.APIURL;
  private _customer: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _customers: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get customers$(): Observable<any[]> {
    return this._customers.asObservable();
  }
  get customer$(): Observable<any> {
    return this._customer.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-customer/findid/${id}`).pipe(
      tap((response: any) => {
        this._customer.next(response);
      })
    );
  }
  getByidUser(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-customer/findidUser/${id}`).pipe(
      tap((response: any) => {
        this._customer.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-customer`).pipe(
      tap((response: any[]) => {
        this._customers.next(response);
      })
    );
  }
  createCustomer(dulieu: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/hderma-customer`, dulieu).pipe(
      map((res: any) => {
        this._customer.next(res);
        console.log(res);
        return res;
      })
    )
  }
  updateCustomer(dulieu: any): Observable<any> {
    return this.customers$.pipe(
      take(1),
      switchMap((customers: any) =>
        this._httpClient.patch(`${this.APIURL}/hderma-customer/${dulieu.id}`, dulieu).pipe(
          map((customer: any) => {
            const index = customers.findIndex((item: any) => item.id === customer.id);
            customers[index] = customer;
            this._customers.next(customers);
            return customer;
          })
        )
      ))
  }
  deleteCustomer(dulieu: any) {
    return this.customers$.pipe(
      take(1),
      switchMap((customers: any) =>
        this._httpClient.delete(`${this.APIURL}/hderma-customer/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = customers.filter((e: any) => e.id != dulieu.id);
            this._customers.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

