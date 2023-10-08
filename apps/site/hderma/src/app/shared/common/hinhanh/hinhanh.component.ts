import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'app-hinhanh',
  templateUrl: './hinhanh.component.html',
  styleUrls: ['./hinhanh.component.css']
})
export class HinhanhComponent implements OnInit {
  @Input() Hinhanh!:any;
  @Output() UploadEmit = new EventEmitter();
  constructor(
    private _UploadService:UploadService
  ) { }
  ngOnInit() {
  }
  onSelect(event: any) {
    this._UploadService.uploadDriver(event.addedFiles[0]).subscribe((data) => {
      console.log(data);
      this.Hinhanh = data
      this.UploadEmit.emit(this.Hinhanh);
      }
    )
  }
  onRemove(data: any) {
    this._UploadService.DeleteuploadDriver(data).subscribe(() => {
      console.log(data);
      this.Hinhanh = {}
      this.UploadEmit.emit(this.Hinhanh);
    })
  }
}
