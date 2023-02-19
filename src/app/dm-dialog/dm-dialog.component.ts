import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { privateChat } from '../models/privateChat';
@Component({
  selector: 'app-dm-dialog',
  templateUrl: './dm-dialog.component.html',
  styleUrls: ['./dm-dialog.component.scss']
})
export class DmDialogComponent implements OnInit {
 privateChat = new privateChat();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,    
    public dialog: MatDialog,
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {

    
  }


  newPrivateChat() {
    const participants = [this.data.docIDfromUser, this.data.UserID]
    const chatMessages = []
    const newChat = new privateChat({participants, chatMessages})

    this.firestore
      .collection('privateChat')
      .add(newChat.toJSON())
      .then(ref =>{
        this.addChatToUser(ref.id, participants)
      })
  }


  addChatToUser(ref, participants){
        for (let i = 0; i < participants.length; i++) {
          const element = participants[i];
          this.firestore
          .collection('users')
          .doc(element)
          .collection('userChat')
          .add({
            ChatID: ref,
            participants : participants        
          })
        }
    }


}
