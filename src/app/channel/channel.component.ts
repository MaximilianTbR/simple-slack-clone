import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { ActivatedRoute } from '@angular/router';
import { collection, collectionData, DocumentData } from '@angular/fire/firestore';

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
  participantsLength;
  refreshing = false;
  viewAllChannels = true;
  messageField = '';
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public firestore: AngularFirestore) {
  }


  async ngOnInit(): Promise<void> {
    this.allMessages.length = 0;
    this.emptyArray();
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        //console.log(this.allChannels);
        this.searchForIndex();
        this.allMessages = this.allChannels[this.index].channelMessages;
      })
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      console.log('got id', this.channelId);
    });
  }

  emptyArray() {
    this.channel.channelName = '';
    this.channel.channelMessages = [];
    this.channel.channelDescription = '';
    this.channel.unread = false;
    Object.keys(this.channel.participants).forEach(key => {
      delete this.channel.participants[key];
    });
  }

  searchForIndex() {
    console.log('searchForIndex works')
    this.allChannels.forEach((channel) => {
      if (this.channelId == channel.customIdName) {
        this.getsIndexOfClass(channel);
        this.channel.channelDescription = this.allChannels[this.index].channelDescription;
        this.channel.channelMessages = this.allChannels[this.index].channelMessages;
        //this.channel.channelIndex = this.allChannels[this.index].channelIndex;
        this.channel.unread = this.allChannels[this.index].unread;
        this.channel.channelName = this.allChannels[this.index].channelName;
        this.channel.participants = this.allChannels[this.index].participants;
        this.participantsLength = Object.keys(this.channel.participants).length;
        console.log('got channel', channel)
        console.log('IT WORKED', this.channel)
      }
    })
  }

  viewAllChannel() {
    if (!this.viewAllChannels)
      this.viewAllChannels = true;
    else {
      this.viewAllChannels = false;
    }
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  sendMessage() {
    this.searchForIndex()
    this.allMessages.push(this.message);
    this.allChannels[this.index].channelMessages = this.allMessages;
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update(this.channel.toJSON())
      .then((result: any) => {
        console.log(result)
      });
     this.messageField = '';
  }

  getsIndexOfClass(channel) {
    return this.index = this.allChannels.indexOf(channel);
  }



}




