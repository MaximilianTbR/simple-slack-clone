import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { privateChat } from '../models/privateChat';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';
@Component({
  selector: 'app-dm-dialog',
  templateUrl: './dm-dialog.component.html',
  styleUrls: ['./dm-dialog.component.scss']
})
export class DmDialogComponent implements OnInit {
  privateChat = new privateChat();
  allUsers = [];
  userId: string = '';
  userIsNotKnown: number;
  docIDfromUser: any;
  UserMail: any;
  UserName: any;
  UserChannels: any;
  userPP: any;
  userStatus: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.User()
  }

  async User() {
    this.firestore
      .collection('users')
      .snapshotChanges()
      .subscribe((docs: any) => {
        this.allUsers = docs;
        console.log(this.allUsers);
      })
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

  currentUser() {
    for (let i = 0; i < this.allUsers.length; i++) {
      let user = this.allUsers[i];
      if (this.userId == user.payload.doc.data().userId) {
        this.docIDfromUser = user.payload.doc.id
        this.UserMail = user.payload.doc.data().userMail;
        this.UserName = user.payload.doc.data().userName;
        this.UserChannels = user.payload.doc.data().userChannels;
        this.userPP = user.payload.doc.data().userPP;
        this.userStatus = user.payload.doc.data().status
      }
    }
    this.userIsNotKnown = 0;
  }

  openDialogNewUser() {
    this.dialog.open(NameDialogComponent);
  }

  newPrivateChat() {
    const participants = [this.data.docIDfromUser, this.data.UserID]
    const participantNames = [this.data, this.data.UserID]
    console.log(participantNames)
    const chatMessages = []
    const newChat = new privateChat({ participants, chatMessages })

    this.firestore
      .collection('privateChat')
      .add(newChat.toJSON())
      .then(ref => {
        this.addChatToUser(ref.id, participants)
      })
  }


  addChatToUser(ref, participants) {
    for (let i = 0; i < participants.length; i++) {
      const element = participants[i];
      this.firestore
        .collection('users')
        .doc(element)
        .collection('userChat')
        .add({
          ChatID: ref,
          participants: participants,
          participantNames: participants
        })
    }
  }


}
