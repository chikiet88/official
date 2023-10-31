import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  isShow:boolean = false
  checkemail:boolean = true
  constructor(private firestore: AngularFirestore) { }
  messages:any[] = [];
  message:any = {};
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  ngOnInit() {
    const today = moment();
    const birthday = moment("1988-05-29");
    const work1 = moment("2015-04-01");
    const work2 = moment("2019-03-01");
    const work3 = moment("2019-03-10");
    this.MyAge = today.diff(birthday, "years");
    this.Exp2 = today.diff(work3, "years");
    this.Exp1 = work2.diff(work1, "years");
    this.firestore.collection('messages').valueChanges().subscribe((messages) => {
      this.messages = messages;
    });
  }
  sendMessage(message: any) {
    if(!this.emailPattern.test(message.Email))
    {
      this.checkemail = false
    }
    else
    {
      this.firestore.collection('messages').add({
        message: message
      }).then(()=>this.isShow=true);
    }

  }

}
