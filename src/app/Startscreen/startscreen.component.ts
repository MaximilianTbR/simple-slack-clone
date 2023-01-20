import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { ActivatedRoute } from '@angular/router';
import { collection, collectionData, DocumentData } from '@angular/fire/firestore';
// import * as admin from 'firebase-admin/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user';


@Component({
  selector: 'app-channel',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss'],
})
export class StartscreenComponent implements OnInit {
  darkmode = false;
  allMessages = [];
  messageOfChannel: any;
  userId: any;
  channel = new Channel();
  user = new User()
  message: string;
  allChannels = [];
  allUsers = [];
  channelData: Channel;
  index: any;
  participantsLength;
  refreshing = false;
  viewAllChannels = true;
  messageField = '';
  channelId;
  viewAllUsers = true;

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public firestore: AngularFirestore, private afAuth: AngularFireAuth) {

  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    this.allMessages.length = 0;
    this.emptyArray();
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe(async (changes: any) => {
        this.allChannels = changes;
      })
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
    });
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
        console.log(this.allUsers);
        this.searchForUser()
      })
    this.searchForUser()



    this.searchForIndex();
  }

  test() {
    console.log(this.allChannels)
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

  async searchForIndex() {
    this.allChannels.forEach((channel) => {
      if (this.channelId == channel.customIdName) {
        this.getsIndexOfClass(channel);
        this.channel.channelDescription = this.allChannels[this.index].channelDescription;
        this.channel.channelMessages = this.allChannels[this.index].channelMessages;
        //this.channel.channelIndex = this.allChannels[this.index].channelIndex;
        this.channel.unread = this.allChannels[this.index].unread;
        this.channel.channelName = this.allChannels[this.index].channelName;
        this.channel.participants = this.allChannels[this.index].participants;
        //   this.participantsLength = Object.keys(this.channel.participants).length;
      } else {
        console.log('undefined!!!')
      }
    })
  }

  searchForUser() {
    this.allUsers.forEach((user) => {
      if (this.userId == user.userId) {
        this.getsIndexOfUser(user);
        if (this.allUsers[this.index].userName.length > 0) {
          this.user.userName = this.allUsers[this.index].userName;
          this.user.userId = this.allUsers[this.index].userId;
          this.user.userMail = this.allUsers[this.index].userMail;
          console.log(this.user)
        } else {
          console.log('open dialog!')
        }
      } else {
        /*
        this.user.userId = this.userId;

        this.firestore
          .collection('users')
          .add(this.user.toJSON())
          .then((result: any) => {

          })*/
      }
    })
  }


  getsIndexOfUser(user) {
    return this.index = this.allUsers.indexOf(user);
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


  getsIndexOfClass(channel) {
    return this.index = this.allChannels.indexOf(channel);
  }


  viewAllUser() {
    if (!this.viewAllUsers)
      this.viewAllUsers = true;
    else {
      this.viewAllUsers = false;
    }
  }

  switchMode() {
    console.log(this.darkmode)
    if (this.darkmode) {
      this.darkmode = false;
    }
    else (this.darkmode = true)

  }


}




