import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { ActivatedRoute } from '@angular/router';
import { collection, collectionData, DocumentData } from '@angular/fire/firestore';
import * as admin from 'firebase-admin/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';



export class MyModule { }


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  allMessages = [];
  messageOfChannel: any;
  userId: any;
  channel = new Channel();
  message: string;
  allChannels = [];
  allUsers = [];
  channelData: Channel;
  index: any;
  participantsLength;
  refreshing = false;
  viewAllChannels = true;
  messageField = '';

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public firestore: AngularFirestore, private afAuth: AngularFireAuth) {

  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    this.allMessages.length = 0;
    this.emptyArray();
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        this.searchForIndex();
        this.allMessages = this.allChannels[this.index].channelMessages;
      })
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    });
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
        this.searchForUser()
      })
    this.searchForUser()
  }

  async getUserId() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
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
    this.allChannels.forEach((channel) => {
      if (this.userId == channel.customIdName) {
        this.getsIndexOfClass(channel);
        this.channel.channelDescription = this.allChannels[this.index].channelDescription;
        this.channel.channelMessages = this.allChannels[this.index].channelMessages;
        //this.channel.channelIndex = this.allChannels[this.index].channelIndex;
        this.channel.unread = this.allChannels[this.index].unread;
        this.channel.channelName = this.allChannels[this.index].channelName;
        this.channel.participants = this.allChannels[this.index].participants;
        this.participantsLength = Object.keys(this.channel.participants).length;
      }
    })
  }

  searchForUser() {
    this.allUsers.forEach((user) => {
      if (this.userId == user.userId) {
        /*this.getsIndexOfClass(user);
        this.channel.channelDescription = this.allChannels[this.index].channelDescription;
        this.channel.channelMessages = this.allChannels[this.index].channelMessages;
        //this.channel.channelIndex = this.allChannels[this.index].channelIndex;
        this.channel.unread = this.allChannels[this.index].unread;
        this.channel.channelName = this.allChannels[this.index].channelName;
        this.channel.participants = this.allChannels[this.index].participants;
        this.participantsLength = Object.keys(this.channel.participants).length;*/
        console.log('Hallo Welt!')
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
      .doc(this.userId)
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




