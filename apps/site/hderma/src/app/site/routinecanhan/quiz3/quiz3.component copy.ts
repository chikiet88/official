// import { Component, OnInit } from '@angular/core';
// import { ThongtinchungService } from '../../../shared/thongtinchung.service';
// import { Router } from '@angular/router';
// import { PhanloaidaService } from '../../../shared/phanloaida.service';
// import { NotifierService } from 'angular-notifier';
// import { KetquaService } from '../../../shared/ketqua.service';
// import { LocalStorageService } from '../../../shared/localstorage.service';
// import { groupBy } from '../../../shared/shared.utils';


// @Component({
//   selector: 'app-quiz3',
//   templateUrl: './quiz3.component.html',
//   styleUrls: ['./quiz3.component.css']
// })
// export class Quiz3Component implements OnInit {
//   Quiz3:any
//   Ketqua: any = this._LocalStorageService.getItem('Routine_Khachhang') || {Thongtin:[],Tinhtrangda:[],Phanloaida:[]}
//   constructor(
//     private _PhanloaidaService:PhanloaidaService,
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
//     this._PhanloaidaService.getAll().subscribe()
//     this._PhanloaidaService.phanloaidas$.subscribe((data)=>{      
//       if(data)
//       {
//         this.Ketqua.Phanloaida = data.map((item:any) => ({
//           id: item.id,
//           Nhom:item.Nhom,
//           Cauhoi:item.Cauhoi,
//           Dapan: item.Dapan.map((dapanItem:any) => ({
//             ...dapanItem,
//             Traloi: ""
//           }))
//         }));
//         console.log(this.Ketqua.Phanloaida);  
//         this.Quiz3 = groupBy(this.Ketqua.Phanloaida)
//         console.log(this.Quiz3);
//       }
//     })
//   }
//   ChonTraloi(item:any,item1:any)
//   {
//     const index = this.Ketqua.Phanloaida.findIndex((v:any) => v.id === item.id);
//     if (index !== -1) {
//       let temp = this.Ketqua.Phanloaida[index].Dapan  
//       temp.forEach((v:any) => {
//         v.Traloi=""
//       });    
//       const index1 = temp.findIndex((v1:any) => v1.id === item1.id);
//       if (index1 !== -1) {
//         this.Ketqua.Phanloaida[index].Dapan[index1].Traloi = true;
//       }
//     }
//   }
//   Backstep()
//   {
//     this._router.navigate(['/routine-canhan/step2'])
//   }
//   NextStep()
//   {
//     const checkTraloi = this.Ketqua.Phanloaida.every((item:any) =>
//     item.Dapan.some((item1:any) => item1.Traloi !== "")
//     );
//     // const checkTraloi = this.Ketqua.Phanloaida.every((item:any) => item.Traloi !== "");
//     if(!checkTraloi)
//     {
//      this._NotifierService.notify("error","Vui lòng chọn đáp án")
//     }
//     else
//     {
//       this.Ketqua.Step = 4
//       this._KetquaService.updateKetqua(this.Ketqua).subscribe(()=>
//       {
//       this._LocalStorageService.setItem('Routine_Khachhang',this.Ketqua) 
//       this._router.navigate(['/routine-canhan/ketqua'])
//       })
//     }     
//   }
  

// }
