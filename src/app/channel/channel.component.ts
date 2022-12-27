import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Component
  ]
})
export class MyModule { }


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  allMessages = [];
  messageIndex: number = 0;
  messageOfChannel: any;
  userId: any;
  channel: Channel;
  message: string;
  allChannels = [];

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log(this.allChannels);
      })
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log(this.userId);
    });
  }


  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  sendMessage() {
    //this.user.birthDate = this.birthDate.getTime();
    /*this.message = this.messageOfChannel;
    this.allMessages.push(this.message);
    let index = this.allMessages.indexOf(this.message);
    this.allMessages.push(this.allMessages[index]);
    this.firestore
      .collection('text')
      .add(this.message)
      .then((result: any) => {
        console.log(result)
      })*/      //this.user.birthDate = this.birthDate.getTime();
    /*
  this.firestore
    .collection('channels')
    .doc(this.userId)
    .update(this.channel.toJSON())
    .then((result: any) => {
      console.log(this.channel)
    })*/
    if (this.messageIndex > 0) {
      this.messageIndex + 1;
    }
    this.allMessages.push(this.message);
    console.log(this.allMessages)
    this.firestore
      .collection(this.userId)
      .add(this.allMessages)
      .then((result: any) => {
        console.log(result)
      })
  }
}
