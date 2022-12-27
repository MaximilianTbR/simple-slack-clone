import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { collection, collectionData, DocumentData } from '@angular/fire/firestore';


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
  messageOfChannel: any;
  channelId: any;
  channel = new Channel();
  message: string;
  allChannels = [];
  channelData: Channel;

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
      })
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      console.log(this.channelId);
    });
  }


  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  sendMessage() {
    this.allMessages.push(this.message)
    this.channel.channelMessages = this.allMessages;
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update(this.channel.toJSON())
      .then((result: any) => {
        console.log(result)
      })
  }
}
