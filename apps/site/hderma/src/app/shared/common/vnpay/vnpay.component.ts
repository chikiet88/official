import { Component, OnInit } from '@angular/core';
import { GenId, dateVNPAY, sortObject } from '../../../shared/shared.utils';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-vnpay',
  templateUrl: './vnpay.component.html',
  styleUrls: ['./vnpay.component.css']
})
export class VnpayComponent implements OnInit {
  VNPAY:any={
    vnp_Amount:1806000,
    vnp_Command:'pay',
    vnp_CreateDate:20210801153333,
    vnp_CurrCode:'VND',
    vnp_IpAddr:'127.0.0.1',
    vnp_Locale:'vn',
    vnp_OrderInfo:'Don Hang Test 2',
    vnp_OrderType:'other',
    vnp_ReturnUrl:'http://localhost:4200/camon',
    vnp_TmnCode:'HDERMAWT',
    // vnp_TxnRef:6,
    vnp_Version:'2.1.0',
    // vnp_SecureHash:'RPEVGGQRQAJTRFYAYKDSDIEWANYGICRT'
  }
  vnp_HashSecret:any="RPEVGGQRQAJTRFYAYKDSDIEWANYGICRT"
  VNPAYLink:any=''
  constructor() { }

  ngOnInit() {
    const today = new Date()
    this.VNPAY.vnp_CreateDate = dateVNPAY(today)
    this.VNPAY.vnp_TxnRef = GenId(8);
    this.VNPAY = sortObject(this.VNPAY)
    let qs = require('qs');
    const signData = qs.stringify(this.VNPAY, { encode: false });
    const hmac = CryptoJS.HmacSHA512(signData, this.vnp_HashSecret);
    const signed = hmac.toString(CryptoJS.enc.Hex);
    this.VNPAYLink = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${this.VNPAY.vnp_Amount}&vnp_Command=${this.VNPAY.vnp_Command}&vnp_CreateDate=${dateVNPAY(today)}&vnp_CurrCode=${this.VNPAY.vnp_CurrCode}&vnp_IpAddr=${this.VNPAY.vnp_IpAddr}&vnp_Locale=${this.VNPAY.vnp_Locale}&vnp_OrderInfo=${this.VNPAY.vnp_OrderInfo}&vnp_OrderType=${this.VNPAY.vnp_OrderType}&vnp_ReturnUrl=${this.VNPAY.vnp_ReturnUrl}&vnp_TmnCode=${this.VNPAY.vnp_TmnCode}&vnp_TxnRef=${this.VNPAY.vnp_TxnRef}&vnp_Version=${this.VNPAY.vnp_Version}&vnp_SecureHash=${signed}`
  }

}
