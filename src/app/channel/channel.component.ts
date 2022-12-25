import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  allMessages: [] = [];
  messageOfChannel: any;
  userId: any;
  channel!: Channel;
  message!: string;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allMessages = changes;
        console.log(this.allMessages);
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

    this.firestore
      .collection('channels')
      .doc(this.userId)
      .update(this.channel.toJSON())
      .then((result: any) => {
        console.log(this.channel)
      })
  }
}
