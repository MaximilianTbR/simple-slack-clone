import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../models/message';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  message = new Message();
  allMessages: Message[] = [];
  messageOfChannel: any;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allMessages = changes;
        console.log(this.allMessages);
      })
  }


  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  sendMessage() {
    //this.user.birthDate = this.birthDate.getTime();
    this.message = this.messageOfChannel;
    this.allMessages.push(this.message);
    let index = this.allMessages.indexOf(this.message);
    this.allMessages.push(this.allMessages[index]);
    this.firestore
      .collection('text')
      .add(this.message)
      .then((result: any) => {
        console.log(result)
      })

  }
}
