import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TinhtrangdaService {
  private APIURL = environment.APIURL;
  private _tinhtrangda: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _tinhtrangdas: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get tinhtrangdas$(): Observable<any[]> {
    return this._tinhtrangdas.asObservable();
  }
  get tinhtrangda$(): Observable<any> {
    return this._tinhtrangda.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-tinhtrangda/findid/${id}`).pipe(
      tap((response: any) => {
        this._tinhtrangda.next(response);
      })
    );
  }
  getBySlug(slug: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-tinhtrangda/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._tinhtrangda.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-tinhtrangda`).pipe(
      tap((response: any[]) => {
        this._tinhtrangdas.next(response);
      })
    );
  }
  createTinhtrangda(dulieu: any): Observable<any> {
    console.log(dulieu);
    
    return this.tinhtrangdas$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/hderma-tinhtrangda`, dulieu).pipe(
        map((res: any) => {
          this._tinhtrangdas.next([res, ...datas]);
          return res;
        })
      ))
    );
  }
  updateTinhtrangda(dulieu: any): Observable<any> {
    return this.tinhtrangdas$.pipe(
      take(1),
      switchMap((tinhtrangdas: any) =>
        this._httpClient.patch(`${this.APIURL}/hderma-tinhtrangda/${dulieu.id}`, dulieu).pipe(
          map((tinhtrangda: any) => {
            const index = tinhtrangdas.findIndex((item: any) => item.id === tinhtrangda.id);
            tinhtrangdas[index] = tinhtrangda;
            this._tinhtrangdas.next(tinhtrangdas);
            return tinhtrangda;
          })
        )
      ))
  }
  deleteTinhtrangda(dulieu: any) {
    return this.tinhtrangdas$.pipe(
      take(1),
      switchMap((tinhtrangdas: any) =>
        this._httpClient.delete(`${this.APIURL}/hderma-tinhtrangda/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = tinhtrangdas.filter((e: any) => e.id != dulieu.id);
            this._tinhtrangdas.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

