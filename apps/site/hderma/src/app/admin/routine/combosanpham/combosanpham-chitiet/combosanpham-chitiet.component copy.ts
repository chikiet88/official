// import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NotifierService } from 'angular-notifier';
// import { EditorComponent } from '@tinymce/tinymce-angular';
// import { MatTabChangeEvent } from '@angular/material/tabs';
// import { environment } from 'apps/site/hderma/src/environments/environments';
// import { UsersService } from '../../../../shared/users.service';
// import { CombosanphamService } from '../../../../shared/combosanpham.service';
// import { UploadService } from '../../../../shared/upload.service';
// import { GenId, GetImage, groupByfield } from '../../../../shared/shared.utils';
// import { CombosanphamComponent } from '../combosanpham.component';
// import { SanphamService } from '../../../../shared/sanpham.service';
// import { Observable, map, startWith } from 'rxjs';
// import { Overlay, OverlayRef } from '@angular/cdk/overlay';
// import { TemplatePortal } from '@angular/cdk/portal';
// import { findIndex, indexOf } from 'cypress/types/lodash';
// import { ThongtinchungService } from '../../../../shared/thongtinchung.service';
// import { DomSanitizer } from '@angular/platform-browser';
// import { PhanloaidaService } from '../../../../shared/phanloaida.service';
// import { TinhtrangdaService } from '../../../../shared/tinhtrangda.service';
// @Component({
//   selector: 'app-combosanpham-chitiet',
//   templateUrl: './combosanpham-chitiet.component.html',
//   styleUrls: ['./combosanpham-chitiet.component.css']
// })
// export class CombosanphamChitietComponent implements OnInit {
//   Detail: any = {}
//   Danhmuc: any[] = []
//   APITINYMCE = environment.APITINYMCE;
//   Sanphams: any[] = []
//   filterSanphams: any[] = []
//   Thongtins: any[] = []
//   SelectSanpham:any
//   filterCombos: any[] = []
//   SelectCombo:any
//   SelectThongtin:any
//   SelectDapanThongtin:any
//   DapanThongtins: any[] = []

//   Phanloais: any[] = []
//   SelectPhanloai:any
//   SelectDapanPhanloai:any
//   DapanPhanloais: any[] = []

//   Tinhtrangs: any[] = []
//   Tinhtrang: any = {}
//   SelectTinhtrang:any
//   SelectDapanTinhtrang:any
//   DapanTinhtrangs: any[] = []
//   Dieukien:any={}
//   receivedData:any={}
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private _userservice: UsersService,
//     private _NotifierService: NotifierService,
//     private _CombosanphamComponent: CombosanphamComponent,
//     private _CombosanphamService: CombosanphamService,
//     private _ThongtinchungService: ThongtinchungService,
//     private _PhanloaidaService: PhanloaidaService,
//     private _TinhtrangdaService: TinhtrangdaService,
//     private _UploadService: UploadService,
//     private _SanphamService: SanphamService,
//     private _overlay: Overlay,
//     private _renderer2: Renderer2,
//     private _viewContainerRef: ViewContainerRef,
//     private _DomSanitizer: DomSanitizer

//   ) { }
//   ngOnInit(): void {
//     // this._ThongtinchungService.getAll().subscribe()
//     // this._ThongtinchungService.thongtinchungs$.subscribe((data)=>{
//     //   if(data)
//     //   {
//     //   // console.log("Thongtin",data);
//     //   this.Thongtins = data   
//     //   data.forEach((v,k) => {
//     //     this.Dieukien['idThongtin_'+k] = ""
//     //     this.Dieukien['idDapanThongtin_'+k] = ""
//     //   });
//     // }
//     // })
//     // this._PhanloaidaService.getAll().subscribe()
//     // this._PhanloaidaService.phanloaidas$.subscribe((data)=>{    
//     //   if(data)
//     //   {
//     //     this.Phanloais = groupByfield(data)
//     //     this.Phanloais.forEach((v,k) => {
//     //       this.Dieukien['idPhanloai_'+k] = ""
//     //       this.Dieukien['idDapanPhanloai_'+k] = ""
//     //     });
//     //   }  
//     // })
//     this._SanphamService.getProducts().subscribe();
//     this._SanphamService.products$.subscribe((data: any) => {      
//       data = data?.map((item: any) => {
//         return { id: item.id, Tieude: item.Tieude,Slug:item.Slug,Hinhanh:item?.Hinhanh?.hinhthongtin?.spath};
//       })
//       this.Sanphams = this.filterSanphams = this.filterCombos = data
//       this.route.params.subscribe((paramsId) => {
//         const id = paramsId['id'];
//         if (id) {
//           this._CombosanphamComponent.drawer.open();
//           this._CombosanphamService.getByid(id).subscribe();
//           this._CombosanphamService.combosanpham$.subscribe((res: any) => {
//             if (res) {
//               // console.log(res); 
//               this.Detail = res  
//               // if(res.Dieukien.length>0) 
//               // {
//               // this.Dieukien = res.Dieukien[0]  
//               // this.GetTinhtrang(res.Dieukien[0])
//               // } 
//             }
//           });
//         }
//       });
//     })
//   }
//   // GetTinhtrang(Dieukien:any)
//   // {
//   //   this._TinhtrangdaService.getAll().subscribe()
//   //   this._TinhtrangdaService.tinhtrangdas$.subscribe((data)=>{ 
//   //     if(data)
//   //     {
//   //       data= groupByfield(data)
//   //       const Thongtin =  this.Thongtins.find((v:any)=>v.id==Dieukien.idThongtin_0);
//   //       const idThongtin =  Thongtin.Dapan.find((v:any)=>v.id==Dieukien.idDapanThongtin_0)?.Nhom.id;               
//   //       this.Tinhtrang  = data.find((v:any)=> v.Nhom.id == idThongtin)
//   //       // this.Tinhtrang = groupByfield(data)
//   //      // console.log("tinhtrang",this.Tinhtrang); 
//   //     }
//   //   })
//   // }
//   // DieukienThongtin(data:any)
//   // {
    
//   //   this.Thongtins.forEach((v,k) => {
//   //     // console.log(v);
//   //     if(data['idThongtin_'+k] ==v.id)
//   //     {
//   //      return v.Dapan.find((v1:any)=>v1.id == data['idDapanThongtin_'+k])
//   //     }
//   //     else return false
//   //     // data['idThongtin_'+k]
//   //     // this.Dieukien['idThongtin_'+k] = ""
//   //     // this.Dieukien['idDapanThongtin_'+k] = ""
//   //   });
//   // }
//   displayFn(option: any): string {
//     return option ? option.Tieude : '';
//   }
//   displayFn1(option: any): string {
//     return option ? option.Cauhoi : '';
//   }
//   displayFn2(option: any): any {
//     return option ? option.value : '';
//   }
//   applyFilter(event: Event) {
//     const value = (event.target as HTMLInputElement).value;
//     if (value.length > 2) {      
//       this.filterSanphams = this.Sanphams.filter((v) => {
//            return  v.Tieude.toLowerCase().includes(value)
//        }
//       )
//     }
//     else
//     {
//       this.filterSanphams = this.Sanphams
//     }
//   }
//   // AddDieukienThongtin(item:any,item1:any,index:any)
//   // {
//   //   this.Dieukien['idThongtin_'+index] = item?.id
//   //   this.Dieukien['idDapanThongtin_'+index] = item1?.id
//   //   this.GetTinhtrang(this.Dieukien)
//   //  // this.LoadTinhtrang(item1,index)
//   // }
//   // CheckThongtin(item:any,item1:any,index:any)
//   // {    
//   //   if(this.Dieukien['idThongtin_'+index]==item?.id && this.Dieukien['idDapanThongtin_'+index] == item1?.Nhom?.id)
//   //   {
//   //     // console.log(this.Dieukien);
//   //     return true
//   //   }
//   //   else if(this.Dieukien['idThongtin_'+index]==item?.id && this.Dieukien['idDapanThongtin_'+index] == item1?.id)
//   //   {
//   //     return true
//   //   }
//   //   else return false
//   // }
//   // AddDieukienPhanloai(item:any,item1:any,index:any)
//   // {    
//   //   this.Dieukien['idPhanloai_'+index] = item.Nhom.id
//   //   this.Dieukien['idDapanPhanloai_'+index] = item1.id
//   // }
//   // CheckPhanloai(item:any,item1:any,index:any)
//   // {
//   //   if(this.Dieukien['idPhanloai_'+index]==item?.Nhom?.id && this.Dieukien['idDapanPhanloai_'+index] == item1?.id)
//   //   {
//   //     return true
//   //   }
//   //   else return false
//   // }
//   // LoadTinhtrang(item1:any,index:any)
//   // {
//   //   if(index==0)
//   //   {      
//   //    this.Tinhtrang = this.Tinhtrangs.find(v=>v.Nhom.id==item1.Nhom.id)
//   //    this.Tinhtrang?.children?.forEach((v:any,k:any) => {
//   //    this.Dieukien['idTinhtrang_'+k] =""
//   //    this.Dieukien['idDapanTinhtrang_'+k] =""
//   //    });
//   //   }
//   // }
//   // AddDieukienTrangthai(item:any,item1:any,index:any)
//   // {
//   //   this.Dieukien['idTinhtrang_'+index] = item.id
//   //   this.Dieukien['idDapanTinhtrang_'+index] = item1.id
//   //   // console.log(this.Dieukien); 
//   // }
//   // CheckTinhtrang(item:any,item1:any,index:any)
//   // {
//   //   if(this.Dieukien['idTinhtrang_'+index]==item?.id && this.Dieukien['idDapanTinhtrang_'+index] == item1?.id)
//   //   {
//   //     return true
//   //   }
//   //   else return false
//   // }
//   ChoosenSanpham(item:any)
//   {   
//     this.Detail.Sanpham.push(item);
//     this.SelectSanpham={}
//     this.filterSanphams = this.Sanphams.filter(item =>
//       !this.Detail.Sanpham.some((dataItem: any) => dataItem.id === item.id)
//     );
//   }
//   RemoveSanpham(item:any)
//   {    
//     this.Detail.Sanpham =  this.Detail.Sanpham.filter((v:any)=>v.id!==item.id)
//     this.SelectSanpham={}
//     this.filterSanphams = this.Sanphams.filter(item =>
//       !this.Detail.Sanpham.some((dataItem: any) => dataItem.id === item.id)
//     );    
//   }

//   ChoosenCombo(item:any)
//   {
    
//     this.Detail.Combo.push(item);
//     this.SelectCombo={}
//     this.filterCombos = this.Sanphams.filter(item =>
//       !this.Detail.Combo.some((dataItem: any) => dataItem.id === item.id)
//     );
//   }
//   RemoveCombo(item:any)
//   {    
//     this.Detail.Combo =  this.Detail.Combo.filter((v:any)=>v.id!==item.id)
//     this.SelectCombo={}
//     this.filterCombos = this.Sanphams.filter(item =>
//       !this.Detail.Combo.some((dataItem: any) => dataItem.id === item.id)
//     );    
//   }
//   configTiny: EditorComponent['init'] = {
//     // selector: '.dfree-header',
//     content_style: '.mce-content-body { border: 1px dashed blue; padding: 10px;  } '+'.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
//     menubar: false,
//     inline: false,
//     toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
//     plugins: [
//        'quickbars','advlist','autolink','lists','link','image','charmap','preview','anchor',
//       'searchreplace','visualblocks','code','fullscreen',
//       'insertdatetime','media','table','code','help'
//        ],
//     // quickbars_insert_toolbar: 'undo redo',
//     // quickbars_selection_toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
//     branding: false,
//     image_advtab: true,
//     autoresize_bottom_margin: 20,
//     autoresize_min_height: 50,
//     height:"200",
//     statusbar:false,
//     deprecation_warnings: false,
//     default_link_target: '_blank',
//     block_unsupported_drop: true,
//     entity_encoding: 'raw',
//         images_upload_handler: (blobInfo: any) => {
//           const file = blobInfo.blob();
//           const promise = new Promise<string>((resolve, reject) => {
//             this._UploadService.uploadDriver(file).subscribe((res) => {
//               if (res) {   
//                 resolve(GetImage(res.spath));
//               }
//             });
//           });
//           return promise;
//         }, 
//   };
//   CloseDrawer() {
//     this.router.navigate(['../'], { relativeTo: this.route });
//     this._CombosanphamComponent.drawer.close();
//   }
//   receiveData(data: any) {
//     console.log(data);
    
//     this.Detail.Dieukien[data.index] = data.Dieukien
//     console.log(this.Detail.Dieukien);
    

//     this._CombosanphamService.updateCombosanpham(this.Detail).subscribe((res) => {
//       if (res) {
//         console.log(res);
//         this._CombosanphamComponent.ngOnInit()
//         this._NotifierService.notify("success", "Cập nhật thành công")
//         //location.reload();
//       }
//     });
//   }
//   Update(data: any) {
//     this._CombosanphamService.updateCombosanpham(data).subscribe((res) => {
//       if (res) {
//         console.log(res);
        
//         this._CombosanphamComponent.ngOnInit()
//         this._NotifierService.notify("success", "Cập nhật thành công")
//         //location.reload();
//       }
//     });
//   }
//   trackByFn(index: number, item: any): any
//   {
//       return item.id || index;
//   }
//   GetImage(data: any) {
//     return 'https://images.tazagroup.vn/'+data
//   }
// }
