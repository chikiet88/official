import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { CreateVnpayDto } from './dto/create-vnpay.dto';
import { UpdateVnpayDto } from './dto/update-vnpay.dto';  
import { environment } from '@taza-base/environments';
import * as CryptoJS from 'crypto-js';
import qs from 'qs';
import { DonhangService } from '../donhang/donhang.service';
import { DonhangEntity } from '../donhang/entities/donhang.entity';
@Controller('hderma-vnpay')
export class VnpayController {
  constructor(
    private readonly vnpayService: VnpayService,
    private readonly _DonhangService: DonhangService,
    ) {}
  @Post()
  create(@Body() createVnpayDto: CreateVnpayDto) {
    return this.vnpayService.create(createVnpayDto);
  }
  @Get()
  async handleVnpayIPN(@Query() vnp_Params: any)
   {
    // return vnp_Params
    //?vnp_Amount=1250000&vnp_BankCode=NCB&vnp_CardType=ATM&vnp_OrderInfo=Don+Hang+Test+2&vnp_PayDate=20230906105001&vnp_ResponseCode=00&vnp_SecureHash=d17457f013e06358bed4e600a2e96a0f6f8ae37491a74e036d3cac25e54490e86896b87a6d751a4e7a6d681f2e8e85b19ef49a4c67553e510a8e862a8d471552&vnp_TmnCode=HDERMAWT&vnp_TransactionNo=14107936&vnp_TransactionStatus=00&vnp_TxnRef=DHkYxu1Myq
    // console.error(vnp_Params);
    // /hderma-vnpay?vnp_HashSecret=''&vnp_Amount=1000000&vnp_BankCode=NCB&vnp_BankTranNo=20170829152730&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang+thoi+gian%3A+2017-08-29+15%3A27%3A02&vnp_PayDate=20170829153052&vnp_ResponseCode=00&vnp_TmnCode=2QXUI4J4&vnp_TransactionNo=12996460&vnp_TxnRef=23597&vnp_SecureHashType=SHA256&vnp_SecureHash=20081f0ee1cc6b524e273b6d4050fefd
    let secureHash = vnp_Params.vnp_SecureHash;
   // let orderId = 'vnp_Params.vnp_TxnRef'; 
    let _order = new DonhangEntity(); 
    await this._DonhangService.findVNPAY(vnp_Params.vnp_TxnRef).then((data)=>{_order = Object.assign({}, data)})
    let rspCode = vnp_Params.vnp_ResponseCode;
    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;
    vnp_Params = this.sortObject(vnp_Params);
    let secretKey = environment.VNPAY.vnp_HashSecret;
    let signData = qs.stringify(vnp_Params, { encode: false });    
    const hmac = CryptoJS.HmacSHA512(signData, secretKey);
    const signed = hmac.toString(CryptoJS.enc.Hex);
    //let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = _order.TotalAmount*100==vnp_Params.vnp_Amount?true:false; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn        
    console.error(_order.TotalAmount);
    console.error(vnp_Params.vnp_Amount);
    
    if(secureHash === signed){ //kiểm tra checksum
        if(_order.MaDonHang){
            if(checkAmount){
                if(_order.Status==0){ //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                    if(rspCode=="00"){
                        //thanh cong
                        //paymentStatus = '1'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                        _order.Status = 1
                        await this._DonhangService.update(_order.id,_order)     
                        return ({RspCode: '00', Message: 'Success'})
                    }
                    else {
                        //that bai
                        //paymentStatus = '2'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                        _order.Status = 2
                        await this._DonhangService.update(_order.id,_order)
                        return ({RspCode: '00', Message: 'Success'})
                    }
                }
                else{
                    return ({RspCode: '02', Message: 'This order has been updated to the payment status'})
                }
            }
            else{
                return ({RspCode: '04', Message: 'Amount invalid'})
            }
        }       
        else {
            return ({RspCode: '01', Message: 'Order not found'})
        }
    }
    else {
        return ({RspCode: '97', Message: 'Checksum failed'})
    }
  }
  @Get('pagina')
  findPagina(@Query('page') page: number, @Query('limit') limit: number) {
    console.error();
    return this.vnpayService.findPagina(page,limit);
  }
  @Get('findslug/:slug')
  findslug(@Param('slug') slug: string) {
    return this.vnpayService.findslug(slug);
  }
  @Get('findid/:id')
  findid(@Param('id') id: any) {    
    return this.vnpayService.findid(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVnpayDto: UpdateVnpayDto) {
    return this.vnpayService.update(id, updateVnpayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vnpayService.remove(id);
  }
  sortObject(obj:any) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj){
      if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
      }
    }
    str.sort();
      for (key = 0; key < str.length; key++) {
          sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
      }
      return sorted;
  }
}
