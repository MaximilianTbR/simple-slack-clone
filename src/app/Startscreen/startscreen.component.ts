import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { ActivatedRoute } from '@angular/router';
// import * as admin from 'firebase-admin/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user';
import { map } from 'rxjs';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';


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
  docIDfromUser;
  UserChannels = [];
  UserName;
  UserMail;
  userIsNotKnown = 0;
  allChannels2 = [];
  allUsers = [];
  allChannels = [];
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
  test2;
  channelName = {};

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public firestore: AngularFirestore, private afAuth: AngularFireAuth) {

  }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    await this.User();
    
  } 


    async getUserId() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
  }

  test(){
    console.log(this.allUsers)
    
  }

 // alle user werden in allUsers gespeichert
 async User(){
  this.firestore
  .collection('users')
  .snapshotChanges()
  .subscribe((docs: any) => {
    this.allUsers = docs;

    this.currentUser()
   // this.loadChannels()
  })
}
// lädt alle Channels des Users runter
loadChannels(){
  this.firestore
  .collection('users')
  .doc(this.docIDfromUser)
  .collection('channels')
  .valueChanges()
  .subscribe((channels: any) => {
    this.allChannels = channels;
  })
}

// der aktuell eingeloggte user wird ermittelt und deren name und mail werden in username und usermail abgespeichert. außerdem haben wir hiermit die DocID des Users und können immer auf ihn zugreifen
 currentUser(){
 for (let i = 0; i < this.allUsers.length; i++) {
  let user  = this.allUsers[i];
  if(this.userId ==  user.payload.doc.data().userId) {
    this.docIDfromUser= user.payload.doc.id
    this.UserMail = user.payload.doc.data().userMail;
    this.UserName = user.payload.doc.data().userName;
    this.UserChannels = user.payload.doc.data().userChannels;
    }
  }
  this.loadChannels()
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


  searchForUser() {
    //  console.log(this.allUsers)
      this.allUsers.forEach((user) => {
        if (this.userId == user.userId) {
          this.getsIndexOfUser(user);
        } else {
          this.userIsNotKnown++;
        }
      })
      if (this.userIsNotKnown == this.allUsers.length) {
        this.openDialogNewUser();
      }
    }
  
    openDialogNewUser(): void {
      this.dialog.open(NameDialogComponent);
    }

    getsIndexOfUser(user) {
      return this.index = this.allUsers.indexOf(user);
      }
}