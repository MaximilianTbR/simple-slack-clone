import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { FormControl } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { user } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  allUsers = []
  loading = false;
  channel = new Channel();
  inputParticipants: string;
  filteredUsers: any [];
  // inputParticipants2;
  participants:any[] = [];
  userName;


  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
     private firestore: AngularFirestore,) {
    
  }
  ngOnInit(): void {
    this.firestore
      .collection('users')
      .snapshotChanges()
      .subscribe((docs: any) => {
        this.allUsers = docs;
        this.filteredUsers = this.allUsers;
      })
  }

  close() {
    this.dialogRef.close();
  }

  createNewChannel() {
    
    let userIDs = this.channel.participants.map(p => p.userID);
     this.loading = true;
    
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then(ref =>{
        this.addChannelToUser(ref.id, userIDs, this.channel.channelName)
      })
    this.loading = false;
    this.dialogRef.close();
  }

 test(userID, userName ){
  let participant = this.channel.participants.find(p => p.userID === userID)
  if(participant){
    participant.userName = userName
  }
  else{
    this.channel.participants.push({userID, userName})
  }
  console.log(this.channel.participants)
 }
 

 test2(User){
  let index = this.channel.participants.indexOf(User)
  if(index !== -1)
  {this.channel.participants.splice(index,1)}
 }



addChannelToUser(test, participants, name){
      for (let i = 0; i < participants.length; i++) {
        const element = participants[i];
        this.firestore
          .collection('users')
          .doc(element)
          .collection('userChannels')
          .add({
            ChannelId: test,
            name: name,  
            unread: true,
            unReadMessage: 0,    
          })
          .then(ref=>{
            this.firestore
            .collection('channels')
            .doc(test)
            .collection('test')
            .add({
              participant: element,
              UserChannelID: ref.id
            })

          })
        }
      
    }





hallo(){
  let userIDs = this.channel.participants.map(p => p.userID)
  console.log(userIDs)
}

    filterUser(){
      
      this.filteredUsers = this.allUsers
      .filter(user => 
        user.payload.doc.data().userName
        .toLowerCase()
        .includes(this.inputParticipants.toLowerCase()))
    }
 

}
