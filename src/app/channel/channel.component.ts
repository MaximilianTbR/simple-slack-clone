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
  index: any;

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public firestore: AngularFirestore) { }


  async ngOnInit(): Promise<void> {
    await this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log(this.allChannels);
      })
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      console.log('got id', this.channelId);
    });
    this.searchForIndex();
  }

  searchForIndex() {
    console.log('searchForIndex works')
    this.allChannels.forEach((channel) => {
      console.log('got channel', channel)
      if (this.channelId == channel.customIdName) {
        this.getsIndexOfClass(channel);
        this.allChannels[this.index] = this.channel;
        console.log(this.channel)
      } else {
        console.log('it did not work')
      }
    })
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
      });
  }

  getsIndexOfClass(channel) {
    return this.index = this.allChannels.indexOf(channel);
  }
}
