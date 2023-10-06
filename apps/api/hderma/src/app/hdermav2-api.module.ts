import { Module } from '@nestjs/common';
import { BaivietModule } from './baiviet/baiviet.module';
import { CauhinhModule } from './cauhinh/cauhinh.module';
import { CommentModule } from './comment/comment.module';
import { ContactModule } from './contact/contact.module';
import { DanhmucProductModule } from './danhmuc-product/danhmuc-product.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { LinkModule } from './link/link.module';
import { ProductModule } from './product/product.module';
import { TagsModule } from './tags/tags.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CauhinhHoahongModule } from './cauhinh_hoahong/cauhinh_hoahong.module';
import { DonhangModule } from './donhang/donhang.module';
import { DonhangchitietModule } from './donhangchitiet/donhangchitiet.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerDiemModule } from './customer_diem/customer_diem.module';
import { CauhinhChiendichModule } from './cauhinh_chiendich/cauhinh_chiendich.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotifyModule } from './notify/notify.module';
import { NotifyTokkenModule } from './notify_tokken/notify_tokken.module';
import { CustomerChiendichModule } from './customer_chiendich/customer_chiendich.module';
import { ApinhanhModule } from './apinhanh/apinhanh.module';
import { VnpayModule } from './vnpay/vnpay.module';
import { ThongtinchungModule } from './routine/thongtinchung/thongtinchung.module';
import { UploadModule } from './upload/upload.module';
import { PhanloaidaModule } from './routine/phanloaida/phanloaida.module';
import { TinhtrangdaModule } from './routine/tinhtrangda/tinhtrangda.module';
import { CombosanphamModule } from './routine/combosanpham/combosanpham.module';
import { KetquaModule } from './routine/ketqua/ketqua.module';
import { NhomroutineModule } from './routine/nhomroutine/nhomroutine.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    AuthModule,
    UsersModule,
    BaivietModule,
    DanhmucModule,
    DanhmucProductModule,
    ProductModule,
    DonhangModule,
    DonhangchitietModule,
    TagsModule,
    ContactModule,
    CauhinhModule,
    WishlistModule,
    CommentModule,
    LinkModule,
    CauhinhHoahongModule,
    CustomerModule,
    CustomerDiemModule,
    CauhinhChiendichModule,
    NotifyModule,
    NotifyTokkenModule,
    CustomerChiendichModule,
    ApinhanhModule,
    VnpayModule,
    ThongtinchungModule,
    UploadModule,
    PhanloaidaModule,
    TinhtrangdaModule,
    CombosanphamModule,
    KetquaModule,
    NhomroutineModule
  ],
})
export class Hdermav2ApiModule { }
