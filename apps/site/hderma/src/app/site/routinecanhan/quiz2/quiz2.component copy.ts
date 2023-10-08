// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { TinhtrangdaService } from '../../../shared/tinhtrangda.service';
// import { NotifierService } from 'angular-notifier';
// import { KetquaService } from '../../../shared/ketqua.service';
// import { LocalStorageService } from '../../../shared/localstorage.service';
// import { groupBy } from '../../../shared/shared.utils';
// @Component({
//   selector: 'app-quiz2',
//   templateUrl: './quiz2.component.html',
//   styleUrls: ['./quiz2.component.css']
// })
// export class Quiz2Component implements OnInit {
//   Quiz2:any
//   Ketqua: any = this._LocalStorageService.getItem('Routine_Khachhang') || {Thongtin:[],Tinhtrangda:[],Phanloaida:[]}
//   constructor(
//     private _TinhtrangdaService:TinhtrangdaService,
//     private _router: Router,
//     private _NotifierService: NotifierService,
//     private _LocalStorageService: LocalStorageService,
//     private _KetquaService: KetquaService,
//   ) { }
//   ngOnInit() {
//     if(!this.Ketqua.id)
//     {
//       this._router.navigate(['/routine-canhan/thongtin'])
//     }
//     this._TinhtrangdaService.getAll().subscribe()
//     this._TinhtrangdaService.tinhtrangdas$.subscribe((data)=>{       
//       if(data)
//       {
        
//         this.Ketqua.Tinhtrangda = data.map((item:any) => ({
//           id: item.id,
//           Nhom:item.Nhom,
//           Cauhoi:item.Cauhoi,
//           Dapan: item.Dapan.map((dapanItem:any) => ({
//             ...dapanItem,
//             Traloi: ""
//           }))
//         }));
//         console.log(this.Ketqua.Tinhtrangda);  
//         this.Quiz2 = groupBy(this.Ketqua.Tinhtrangda)
//         console.log(this.Quiz2);
//       }
//     })
//   }
//   ChonTraloi(item:any,item1:any)
//   {
//     const index = this.Ketqua.Tinhtrangda.findIndex((v:any) => v.id === item.id);
//     if (index !== -1) {
//       let temp = this.Ketqua.Tinhtrangda[index].Dapan  
//       temp.forEach((v:any) => {
//         v.Traloi=""
//       });    
//       const index1 = temp.findIndex((v1:any) => v1.id === item1.id);
//       if (index1 !== -1) {
//         this.Ketqua.Tinhtrangda[index].Dapan[index1].Traloi = true;
//       }
//     }
//   }
//   Backstep()
//   {
//     this._router.navigate(['/routine-canhan/step1'])
//   }
//   NextStep()
//   {
//       const checkTraloi = this.Ketqua.Tinhtrangda.every((item:any) =>
//         item.Dapan.some((item1:any) => item1.Traloi !== "")
//         );
//        if(!checkTraloi)
//        {
//         this._NotifierService.notify("error","Vui lòng chọn đáp án")
//        }
//        else
//        {
//         this.Ketqua.Step = 3
//         this._KetquaService.updateKetqua(this.Ketqua).subscribe(()=>
//         {
//         this._LocalStorageService.setItem('Routine_Khachhang',this.Ketqua) 
//         this._router.navigate(['/routine-canhan/step3'])
//         })
//        } 
//   }
// }
