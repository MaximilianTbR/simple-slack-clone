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
  }


  test() {
    console.log(this.data.UserID, this.data.docIDfromUser)
  }


  newPrivateChat() {
    const participants = [this.data.docIDfromUser, this.data.UserID]
    const participantName = []
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
        })
    }
  }


}
