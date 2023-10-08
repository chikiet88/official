import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApightkService } from '../../apightk.service';
@Component({
  selector: 'app-giaohangtietkiem',
  templateUrl: './giaohangtietkiem.component.html',
  styleUrls: ['./giaohangtietkiem.component.css']
})
export class GiaohangtietkiemComponent implements OnInit {
  constructor(
    private _apightkService:ApightkService
  ) { }
  ngOnInit() {
    const data={
      "pick_province": "Hà Nội",
      "pick_district": "Quận Hai Bà Trưng",
      "province": "Hà nội",
      "district": "Quận Cầu Giấy",
      "address": "P.503 tòa nhà Auu Việt, số 1 Lê Đức Thọ",
      "weight": 1000,
      "value": 3000000,
      "transport": "fly",
      "deliver_option": "xteam",
      "tags": [1,7]
    }
    this._apightkService.getPhiship(data).subscribe((data)=>console.log(data));
  }



}
