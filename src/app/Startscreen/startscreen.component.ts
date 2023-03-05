import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { ActivatedRoute } from '@angular/router';
// import * as admin from 'firebase-admin/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';
import { DmDialogComponent } from '../dm-dialog/dm-dialog.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { collection } from 'firebase/firestore';



@Component({
  selector: 'app-channel',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss'],
})
export class StartscreenComponent implements OnInit {
  hallotest = ['fdsjk', 'dfklsjdf']
  onlySearchUsers = false;
  onlySearchChannels = false;
  filteredChannels:any [];
  filteredOptions: Observable<string[]>;;
  inputParticipants;
  filteredUsers: any [];
  darkmode = false;
  userId: any;
  viewChannel = false;
  channel = new Channel();
  user = new User()
  docIDfromUser;
  UserChannels = [];
  UserName;
  UserMail;
  userIsNotKnown = 0;
  allUsers = [];
  allChannels = [];
  chats = [];
  viewAllChannels = true;
  viewAllPrivateChats = true;

  constructor(
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth) {
  }

  async ngOnInit(): Promise<void> {


    await this.getUserId();   // speichert die ID von auth in der variable userID ab
    await this.User(); // lädt alle User runter

  }
  async getUserId() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
  }

  test() {
    console.log('channel:',this.UserChannels, 'users:', this.allUsers)
  }

  // alle user werden in allUsers gespeichert
  async User() {
    this.firestore
      .collection('users')
      .snapshotChanges()
      .subscribe((docs: any) => {
        this.allUsers = docs;

        this.searchForUser();
      })
  }
  // lädt alle Channels des Users runter
  loadChannels() {
    this.firestore
      .collection('users')
      .doc(this.docIDfromUser)
      .collection('userChannels')
      .valueChanges()
      .subscribe((channels: any) => {
        this.allChannels = channels;
        this.pushToChannel()
      })

  }

  loadChats() {
    this.firestore
      .collection('users')
      .doc(this.docIDfromUser)
      .collection('userChat')
      .valueChanges()
      .subscribe((chat: any) =>
        this.chats = chat,
        )
  }


  pushToChannel() {
    if (this.allChannels.length == 0) {
      this.firestore
        .collection('users')
        .doc(this.docIDfromUser)
        .collection('userChannels')
        .add({
          ChannelId: 'SbNH3sbeTNT7nKmDJ8Ss',
          name: 'Herzlich Willkommen',
        })
    }
  }

  // der aktuell eingeloggte user wird ermittelt und deren name und mail werden in username und usermail abgespeichert. außerdem haben wir hiermit die DocID des Users und können immer auf ihn zugreifen
  currentUser() {
    for (let i = 0; i < this.allUsers.length; i++) {
      let user = this.allUsers[i];
      if (this.userId == user.payload.doc.data().userId) {
        this.docIDfromUser = user.payload.doc.id
        this.UserMail = user.payload.doc.data().userMail;
        this.UserName = user.payload.doc.data().userName;
        this.UserChannels = user.payload.doc.data().userChannels;
      }
    }
    this.userIsNotKnown = 0;
    this.loadChannels()
    this.loadChats()

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

  openCurrentUser(userID) {
    this.dialog.open(UserDetailComponent, {
      data:
      {
        UserID: userID,
        docIDfromUser: this.docIDfromUser
      }
    })
  }


  viewAllOwnPrivateChats() {
    if (!this.viewAllPrivateChats)
      this.viewAllPrivateChats = true;
    else {
      this.viewAllPrivateChats = false;
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
    this.allUsers.forEach((user) => {
      if (this.userId == user.payload.doc.data().userId) {
        this.currentUser();
        console.log(this.userIsNotKnown)
      } else {
        this.userIsNotKnown++;
        if (this.userIsNotKnown == this.allUsers.length) {

          console.log(this.userIsNotKnown, this.allUsers)
          this.openDialogNewUser();
          this.userIsNotKnown = 0;
        }
      }
    })
  }

  openDialogNewUser() {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true; // Schließen durch Klick außerhalb des Dialogs deaktivieren
  
    const dialogRef: MatDialogRef<NameDialogComponent> = this.dialog.open(NameDialogComponent, dialogConfig);
  }


  search() {
    if(this.onlySearchUsers){
      this.searchUsers()
      console.log('users')
    }
   else if(this.onlySearchChannels){
      this.searchChannels()
      console.log('channels')
    }  else{
      this.searchUsers(),
      this.searchChannels()
    }
    console.log('users:',this.filteredUsers, 'channes:', this.filteredChannels);
  }

  
    searchUsers(){
      this.filteredUsers = this.allUsers
      .filter(user => 
        user.payload.doc.data().userName
          .toLowerCase()
          .includes(this.inputParticipants.toLowerCase())
      );
    }

    searchChannels(){
      this.filteredChannels =  this.allChannels
      .filter(channel => 
        channel.name
          .toLowerCase()
          .includes(this.inputParticipants.toLowerCase())
      );
    }
  
    onlyUserSearch(){
      if(this.onlySearchUsers)
      {
        this.onlySearchUsers = false;
      }
      else{

        this.onlySearchUsers = true;
      }
      this.onlySearchChannels = false;
      this.filteredChannels = [];
      console.log(this.onlySearchUsers)
    }

    onlyChannelSearch(){
      if(this.onlySearchChannels)
      {
        this.onlySearchChannels = false;
      }
      else{

        this.onlySearchChannels = true;
      }
      console.log(this.onlySearchChannels)
      this.onlySearchUsers = false;
      this.filteredUsers = [];
    }

}