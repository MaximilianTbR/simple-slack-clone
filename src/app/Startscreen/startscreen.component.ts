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
import { map } from 'rxjs';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';


@Component({
  selector: 'app-channel',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss'],
})
export class StartscreenComponent implements OnInit {
  darkmode = false;
  userId: any;
  channel = new Channel();
  user = new User()
  message: string;
  allChannels = [];
  UserName;
  UserMail;
  allChannels2 = [];
  allUsers = [];
  channelData: Channel;
  index: any;
  participantsLength; // wird
  refreshing = false;
  viewAllChannels = true;
  messageField = '';
  channelId;
  viewAllUsers = true;
  filteredChannels: any;
  filteredChannels2 = [];
  channelCollection = this.firestore.collection('channels');

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public firestore: AngularFirestore, private afAuth: AngularFireAuth) {

  }

  async ngOnInit(): Promise<void> {

    await this.getUserId();
    await this.User();
  } 


  test(){
    console.log(this.userId, this.UserName, this.UserMail, this.allChannels)
    
  }


 async User(){
    this.firestore
    .collection('users')
    .valueChanges()
    .subscribe((changes: any) => {
      this.allUsers = changes;

      console.log('user', this.allUsers);
      this.currentUser()
    })
  }



// 
 currentUser(){
 for (let i = 0; i < this.allUsers.length; i++) {
  let user  = this.allUsers[i];
  if(this.userId == user.userId) {
          this.UserName = user.userName;
          this.UserMail = user.userMail;
      for (let index = 0; index < user.userChannels.length; index++) {
     const channel = user.userChannels[index];
            console.log(channel)
           this.allChannels.push(channel)
}
         }
 }  this.getChannel();
  }



    getChannel() {
      this.firestore
    .collection('channels')
    .valueChanges()
    .subscribe((changes: any) => {
      this.allChannels2 = changes;

      console.log('channels', this.allChannels2);
    })  
}



  consoleChannel(){
    console.log(this.filteredChannels2)
  }






  async getUserId() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
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