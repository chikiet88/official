import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { LocalStorageService } from './localstorage.service';
import { GenId, dateVNPAY, sortObject } from './shared.utils';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class ApiVNPAYService {
  private APIURL = environment.APIURL;
  VNPAY:any={
    vnp_Amount:environment.VNPAY.vnp_Amount,
    vnp_Command:environment.VNPAY.vnp_Command,
    vnp_CreateDate:environment.VNPAY.vnp_CreateDate,
    vnp_CurrCode:environment.VNPAY.vnp_CurrCode,
    vnp_IpAddr:environment.VNPAY.vnp_IpAddr,
    vnp_Locale:environment.VNPAY.vnp_Locale,
    vnp_OrderInfo:environment.VNPAY.vnp_OrderInfo,
    vnp_OrderType:environment.VNPAY.vnp_OrderType,
    vnp_ReturnUrl:environment.VNPAY.vnp_ReturnUrl,
    vnp_TmnCode:environment.VNPAY.vnp_TmnCode,
    vnp_TxnRef:environment.VNPAY.vnp_TxnRef,
    vnp_Version:environment.VNPAY.vnp_Version,
  }
  vnp_HashSecret:any=environment.vnp_HashSecret
  private _sanpham: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _sanphams: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(
    private _httpClient: HttpClient,
    private _NotifierService: NotifierService,
    private _LocalStorageService: LocalStorageService,
    ) { }
  get sanphams$(): Observable<any[]> {
    return this._sanphams.asObservable();
  }
  get sanpham$(): Observable<any> {
    return this._sanpham.asObservable();
  }
  getLink(MaHD: any,Amount:any){
    const today = new Date()
    this.VNPAY.vnp_CreateDate = dateVNPAY(today)
    this.VNPAY.vnp_TxnRef = MaHD;
    this.VNPAY.vnp_Amount = Amount*100
    this.VNPAY = sortObject(this.VNPAY)
    let qs = require('qs');
    const signData = qs.stringify(this.VNPAY, { encode: false });
    const hmac = CryptoJS.HmacSHA512(signData, this.vnp_HashSecret);
    const signed = hmac.toString(CryptoJS.enc.Hex);
    const VNPAYLink = environment.VNPAYURL+
    `vnp_Amount=${this.VNPAY.vnp_Amount}&`+
    `vnp_Command=${this.VNPAY.vnp_Command}&`+
    `vnp_CreateDate=${dateVNPAY(today)}&`+
    `vnp_CurrCode=${this.VNPAY.vnp_CurrCode}&`+
    `vnp_IpAddr=${this.VNPAY.vnp_IpAddr}&`+
    `vnp_Locale=${this.VNPAY.vnp_Locale}&`+
    `vnp_OrderInfo=${this.VNPAY.vnp_OrderInfo}&`+
    `vnp_OrderType=${this.VNPAY.vnp_OrderType}&`+
    `vnp_ReturnUrl=${this.VNPAY.vnp_ReturnUrl}&`+
    `vnp_TmnCode=${this.VNPAY.vnp_TmnCode}&`+
    `vnp_TxnRef=${this.VNPAY.vnp_TxnRef}&`+
    `vnp_Version=${this.VNPAY.vnp_Version}&`+
    `vnp_SecureHash=${signed}`
    return VNPAYLink
  }
  // getPhiship(data: any): Observable<any> {
  //   console.log(data);
    
  //   return this._httpClient.post<any>(`${this.APIURL}/hderma-apightk/phiship`,data).pipe(
  //     tap((response: any) => {
  //               console.log(response);
  //               return response      
  //     })
  //   );
  // }
  // getByid(id: any): Observable<any> {
  //   return this._httpClient.get<any>(`${this.APIURL}/sanpham/id`).pipe(
  //     tap((response: any) => {
  //       this._sanpham.next(response);
  //       console.log(response);
  //     })
  //   );
  // }
  // getAll(): Observable<any[]> {
  //   return this._httpClient.get<any[]>(`${this.APIURL}/sanpham`).pipe(
  //     tap((response: any[]) => {
  //       this._sanphams.next(response);
  //     })
  //   );
  // }
  // createSanpham(dulieu: any): Observable<any> {
  //   return this.sanphams$.pipe(
  //     take(1),
  //     switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/sanpham`, dulieu).pipe(
  //       map((res: any) => {
  //         this._sanphams.next([res[1], ...datas]);
  //         console.log(res);
  //         return res[1];
  //       })
  //     ))
  //   );
  // }
  // updateSanpham(dulieu: any): Observable<any> {
  //   return this.sanphams$.pipe(
  //     take(1),
  //     switchMap((sanphams: any) =>
  //       this._httpClient.patch(`${this.APIURL}/sanpham/${dulieu.id}`, dulieu).pipe(
  //         map((sanpham: any) => {
  //           const index = sanphams.findIndex((item: any) => item.id === sanpham.id);
  //           sanphams[index] = sanpham;
  //           this._sanphams.next(sanphams);
  //           return sanpham;
  //         })
  //       )
  //     ))
  // }
  // deleteSanpham(dulieu: any) {
  //   return this.sanphams$.pipe(
  //     take(1),
  //     switchMap((sanphams: any) =>
  //       this._httpClient.delete(`${this.APIURL}/sanpham/${dulieu.id}`).pipe(
  //         map((isDelete) => {
  //           const updatePhanquyens = sanphams.filter((e: any) => e.id != dulieu.id);
  //           this._sanphams.next(updatePhanquyens);
  //           return isDelete;
  //         })
  //       )
  //     ));
  // }
}
