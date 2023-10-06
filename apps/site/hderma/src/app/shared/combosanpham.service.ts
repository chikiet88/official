import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CombosanphamService {
  private APIURL = environment.APIURL;
  private _combosanpham: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _combosanphams: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get combosanphams$(): Observable<any[]> {
    return this._combosanphams.asObservable();
  }
  get combosanpham$(): Observable<any> {
    return this._combosanpham.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-combosanpham/findid/${id}`).pipe(
      tap((response: any) => {
        this._combosanpham.next(response);
      })
    );
  }
  getBySlug(slug: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-combosanpham/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._combosanpham.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-combosanpham`).pipe(
      tap((response: any[]) => {
        this._combosanphams.next(response);
      })
    );
  }
  createCombosanpham(dulieu: any): Observable<any> {
    console.log(dulieu);
    
    return this.combosanphams$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/hderma-combosanpham`, dulieu).pipe(
        map((res: any) => {
          this._combosanphams.next([res, ...datas]);
          return res;
        })
      ))
    );
  }
  updateCombosanpham(dulieu: any): Observable<any> {
    return this.combosanphams$.pipe(
      take(1),
      switchMap((combosanphams: any) =>
        this._httpClient.patch(`${this.APIURL}/hderma-combosanpham/${dulieu.id}`, dulieu).pipe(
          map((combosanpham: any) => {
            const index = combosanphams.findIndex((item: any) => item.id === combosanpham.id);
            combosanphams[index] = combosanpham;
            this._combosanphams.next(combosanphams);
            return combosanpham;
          })
        )
      ))
  }
  deleteCombosanpham(dulieu: any) {
    return this.combosanphams$.pipe(
      take(1),
      switchMap((combosanphams: any) =>
        this._httpClient.delete(`${this.APIURL}/hderma-combosanpham/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = combosanphams.filter((e: any) => e.id != dulieu.id);
            this._combosanphams.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

