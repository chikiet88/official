import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhanloaidaService {
  private APIURL = environment.APIURL;
  private _phanloaida: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _phanloaidas: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get phanloaidas$(): Observable<any[]> {
    return this._phanloaidas.asObservable();
  }
  get phanloaida$(): Observable<any> {
    return this._phanloaida.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-phanloaida/findid/${id}`).pipe(
      tap((response: any) => {
        this._phanloaida.next(response);
      })
    );
  }
  getBySlug(slug: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-phanloaida/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._phanloaida.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-phanloaida`).pipe(
      tap((response: any[]) => {
        this._phanloaidas.next(response);
      })
    );
  }
  createPhanloaida(dulieu: any): Observable<any> {
    console.log(dulieu);
    
    return this.phanloaidas$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/hderma-phanloaida`, dulieu).pipe(
        map((res: any) => {
          this._phanloaidas.next([res, ...datas]);
          return res;
        })
      ))
    );
  }
  updatePhanloaida(dulieu: any): Observable<any> {
    return this.phanloaidas$.pipe(
      take(1),
      switchMap((phanloaidas: any) =>
        this._httpClient.patch(`${this.APIURL}/hderma-phanloaida/${dulieu.id}`, dulieu).pipe(
          map((phanloaida: any) => {
            const index = phanloaidas.findIndex((item: any) => item.id === phanloaida.id);
            phanloaidas[index] = phanloaida;
            this._phanloaidas.next(phanloaidas);
            return phanloaida;
          })
        )
      ))
  }
  deletePhanloaida(dulieu: any) {
    return this.phanloaidas$.pipe(
      take(1),
      switchMap((phanloaidas: any) =>
        this._httpClient.delete(`${this.APIURL}/hderma-phanloaida/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = phanloaidas.filter((e: any) => e.id != dulieu.id);
            this._phanloaidas.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

