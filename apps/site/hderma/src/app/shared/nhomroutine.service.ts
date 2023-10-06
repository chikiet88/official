import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NhomroutineService {
  private APIURL = environment.APIURL;
  private _nhomroutine: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _nhomroutines: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get nhomroutines$(): Observable<any[]> {
    return this._nhomroutines.asObservable();
  }
  get nhomroutine$(): Observable<any> {
    return this._nhomroutine.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-nhomroutine/findid/${id}`).pipe(
      tap((response: any) => {
        this._nhomroutine.next(response);
      })
    );
  }
  getBySlug(slug: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-nhomroutine/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._nhomroutine.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-nhomroutine`).pipe(
      tap((response: any[]) => {
        this._nhomroutines.next(response);
      })
    );
  }
  createNhomroutine(dulieu: any): Observable<any> {
    console.log(dulieu);
    
    return this.nhomroutines$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/hderma-nhomroutine`, dulieu).pipe(
        map((res: any) => {
          this._nhomroutines.next([res, ...datas]);
          return res;
        })
      ))
    );
  }
  updateNhomroutine(dulieu: any): Observable<any> {
    return this.nhomroutines$.pipe(
      take(1),
      switchMap((nhomroutines: any) =>
        this._httpClient.patch(`${this.APIURL}/hderma-nhomroutine/${dulieu.id}`, dulieu).pipe(
          map((nhomroutine: any) => {
            const index = nhomroutines.findIndex((item: any) => item.id === nhomroutine.id);
            nhomroutines[index] = nhomroutine;
            this._nhomroutines.next(nhomroutines);
            return nhomroutine;
          })
        )
      ))
  }
  deleteNhomroutine(dulieu: any) {
    return this.nhomroutines$.pipe(
      take(1),
      switchMap((nhomroutines: any) =>
        this._httpClient.delete(`${this.APIURL}/hderma-nhomroutine/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = nhomroutines.filter((e: any) => e.id != dulieu.id);
            this._nhomroutines.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

