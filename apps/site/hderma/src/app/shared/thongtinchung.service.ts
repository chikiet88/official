import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ThongtinchungService {
  private APIURL = environment.APIURL;
  private _thongtinchung: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _thongtinchungs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get thongtinchungs$(): Observable<any[]> {
    return this._thongtinchungs.asObservable();
  }
  get thongtinchung$(): Observable<any> {
    return this._thongtinchung.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-thongtinchung/findid/${id}`).pipe(
      tap((response: any) => {
        this._thongtinchung.next(response);
      })
    );
  }
  getBySlug(slug: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-thongtinchung/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._thongtinchung.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-thongtinchung`).pipe(
      tap((response: any[]) => {
        this._thongtinchungs.next(response);
      })
    );
  }
  createThongtinchung(dulieu: any): Observable<any> {
    return this.thongtinchungs$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/hderma-thongtinchung`, dulieu).pipe(
        map((res: any) => {
          this._thongtinchungs.next([res, ...datas]);
          return res;
        })
      ))
    );
  }
  updateThongtinchung(dulieu: any): Observable<any> {
    return this.thongtinchungs$.pipe(
      take(1),
      switchMap((thongtinchungs: any) =>
        this._httpClient.patch(`${this.APIURL}/hderma-thongtinchung/${dulieu.id}`, dulieu).pipe(
          map((thongtinchung: any) => {
            const index = thongtinchungs.findIndex((item: any) => item.id === thongtinchung.id);
            thongtinchungs[index] = thongtinchung;
            this._thongtinchungs.next(thongtinchungs);
            return thongtinchung;
          })
        )
      ))
  }
  deleteThongtinchung(dulieu: any) {
    return this.thongtinchungs$.pipe(
      take(1),
      switchMap((thongtinchungs: any) =>
        this._httpClient.delete(`${this.APIURL}/hderma-thongtinchung/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = thongtinchungs.filter((e: any) => e.id != dulieu.id);
            this._thongtinchungs.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

