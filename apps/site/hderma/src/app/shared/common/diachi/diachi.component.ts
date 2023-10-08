import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DiaChiInit } from '../../diachi';
import { UsersService } from '../../users.service';
import { GenId } from '../../shared.utils';
@Component({
  selector: 'app-diachi',
  templateUrl: './diachi.component.html',
  styleUrls: ['./diachi.component.css']
})
export class DiachiComponent implements OnInit {
  @Input() Diachis:any[]=[];
  @Input() isSingle:boolean=true;
  @Output() diachiEmit = new EventEmitter();
  DiaChiInit = DiaChiInit;
  isEdit:any=false
  ChosenTinh:any={}
  ChosenQuan:any={}
  ChosenPhuong:any={}
  ChosenDiachi:any
  filterTinh:any[]=[]
  Tinh:any[]=[]
  filterQuan:any[]=[]
  Quan:any[]=[]
  filterPhuong:any[]=[]
  Phuong:any[]=[]
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _notifierService: NotifierService,
    private fb: FormBuilder,
    private _usersService: UsersService,
    private _dialog: MatDialog,

  ) {}
  ngOnInit(): void {
    this.Tinh = this.filterTinh = this.DiaChiInit
  }
  displayFn(data: any): string {
    return data && data.name ? data.name : '';
  }
  onTinhChange(state: any) {
    this.filterTinh = this.Tinh.filter(v => v.name.toLowerCase().includes(state));
    console.log(this.filterTinh);
    console.log(state);
    
    if(state &&state.name)
    {
      this.Quan = this.filterQuan = state.districts  
    }
  }
  onQuanChange(state: any) {
      this.filterQuan = this.Quan.filter(v => v.name.toLowerCase().includes(state));
      console.log(this.filterQuan);
      console.log(state);
      if(state &&state.name)
      {
        this.Phuong = this.filterPhuong = state.wards  
      }
  }
  onPhuongChange(state: string) {
    this.filterPhuong = this.Phuong.filter(v => v.name.toLowerCase().includes(state));
  }

  onTinhChangeSingle(state: any) {
    this.filterTinh = this.Tinh.filter(v => v.name.toLowerCase().includes(state));    
    if(state &&state.name)
    {
      const data = {id:GenId(8,false),Tinh:this.ChosenTinh.name,Active:true}
      this.Diachis.push(data)
      this.diachiEmit.emit(this.Diachis);
      this.Quan = this.filterQuan = state.districts  
    }
  }
  onQuanChangeSingle(state: any) {
      this.filterQuan = this.Quan.filter(v => v.name.toLowerCase().includes(state));
      if(state &&state.name)
      {
        this.Diachis[0].Quan = this.ChosenQuan.name
        this.diachiEmit.emit(this.Diachis);
        this.Phuong = this.filterPhuong = state.wards  
      }
  }
  onPhuongChangeSingle(state: string) {
    this.filterPhuong = this.Phuong.filter(v => v.name.toLowerCase().includes(state));
    this.Diachis[0].Phuong = this.ChosenQuan.Phuong
    this.diachiEmit.emit(this.Diachis);
  }
  onDiachiSingle(state: string) {
    this.Diachis[0].Diachi = this.ChosenDiachi
    this.diachiEmit.emit(this.Diachis);
  }


  OpenDelete(item:any,teamplate:TemplateRef<any>)
  {
    const dialogRef = this._dialog.open(teamplate,{
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result)
      {
        this.Diachis = this.Diachis.filter((v:any)=>v.id!==item.id)
      }
    });
  }
  ThemDiachi()
  { 
    if(this.ChosenTinh.name!=undefined)
    {
    const data = {id:GenId(8,false),Tinh:this.ChosenTinh.name,Quan:this.ChosenQuan.name,Phuong:this.ChosenPhuong.name,Diachi:this.ChosenDiachi}
    this.Diachis.push(data)
    this.diachiEmit.emit(this.Diachis);
    this.isEdit = !this.isEdit 
    }
    else 
    {
      this._notifierService.notify("error","Vui lòng thêm thông tin")
    }
  }
  SetActive(item:any)
  {
    this.Diachis.forEach(v => v.Active = v.id === item.id);
    this.diachiEmit.emit(this.Diachis);
  }
}