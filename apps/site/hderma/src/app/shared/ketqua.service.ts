import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class KetquaService {
  private APIURL = environment.APIURL;
  private _ketqua: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _ketquas: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get ketquas$(): Observable<any[]> {
    return this._ketquas.asObservable();
  }
  get ketqua$(): Observable<any> {
    return this._ketqua.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-ketqua/findid/${id}`).pipe(
      tap((response: any) => {
        console.log(response);
        
        this._ketqua.next(response);
      })
    );
  }
  getBySlug(slug: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-ketqua/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._ketqua.next(response);
      })
    );
  }
  getByidKH(idKH: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-ketqua/findidKH/${idKH}`).pipe(
      tap((response: any) => {  
        this._ketqua.next(response);
      })
    );
  }
  getBySDT(SDT: any): Observable<any> {    
    return this._httpClient.get<any>(`${this.APIURL}/hderma-ketqua/findsdt/${SDT}`).pipe(
      tap((response: any) => {
        this._ketquas.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-ketqua`).pipe(
      tap((response: any[]) => {
        this._ketquas.next(response);
      })
    );
  }
  createKetqua(dulieu: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/hderma-ketqua`, dulieu).pipe(
        map((res: any) => {
          return res;
        })
    );
  }
  updateKetqua(dulieu: any): Observable<any> {
    return this._httpClient.patch(`${this.APIURL}/hderma-ketqua/${dulieu.id}`, dulieu).pipe(
          map((ketqua: any) => {
            return ketqua;
          })
        )
  }
  deleteKetqua(dulieu: any) {
    return this.ketquas$.pipe(
      take(1),
      switchMap((ketquas: any) =>
        this._httpClient.delete(`${this.APIURL}/hderma-ketqua/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = ketquas.filter((e: any) => e.id != dulieu.id);
            this._ketquas.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

