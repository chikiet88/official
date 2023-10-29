import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PortfolioComponent implements OnInit {
  MyAge:any
  Exp2:any
  Exp1:any
  constructor() { }

  ngOnInit() {
    const today = moment();
    const birthday = moment("1988-05-29");
    const work1 = moment("2015-04-01");
    const work2 = moment("2019-03-01");
    const work3 = moment("2019-03-10");
    this.MyAge = today.diff(birthday, "years");
    this.Exp2 = today.diff(work3, "years");
    this.Exp1 = work2.diff(work1, "years");
  }

}
