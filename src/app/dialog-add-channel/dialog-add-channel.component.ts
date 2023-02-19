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
    this.filteredUsers = this.allUsers;
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

/*
  addUserToChannel(index: number) {
    if (this.checked == false) {
      this.checked = true;
      document.getElementById('icon-' + index).classList.add('d-none');
      document.getElementById('icon2-' + index).classList.remove('d-none');
    } else {
      this.checked = false;
      document.getElementById('icon-' + index).classList.remove('d-none');
      document.getElementById('icon2-' + index).classList.add('d-none');
    }
    console.log(this.checked)
  }
  */

  createNewChannel() {
    console.log(this.channel.participants, this.channel.channelName, this.channel.channelDescription)
     this.loading = true;
    
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then(ref =>{
        this.addChannelToUser(ref.id, this.channel.participants, this.channel.channelName)
      })
    this.loading = false;
    this.dialogRef.close();
  }

 test(user){
  let index = this.channel.participants.indexOf(user)
  if(index !== -1){
    this.channel.participants.splice(index,1)
  }
  else(
    this.channel.participants.push(user))
    
    console.log(this.channel.participants)
    }
 


    addChannelToUser(ref, participants, name){
      for (let i = 0; i < participants.length; i++) {
        const element = participants[i];
        this.firestore
          .collection('users')
          .doc(element)
          .collection('userChannels')
          .add({
            ChannelId: ref,
            name: name,      
          })
        }
      
    }





hallo(){
  console.log(this.filteredUsers)
}

    filterUser(){
      
      this.filteredUsers = this.allUsers.filter(user => user.payload.doc.data().userName.toLowerCase().includes(this.inputParticipants.toLowerCase()))
    }
  /*
  refreshSearchResults() {
    //this.inputParticipants2 = this.inputParticipants.toLowerCase();
    if (this.inputParticipants && this.inputParticipants.length > 0) {
      console.log(this.inputParticipants)
    }
    this.allUsers.forEach(user => {
      user.userName = this.userName;
      if (this.userName.includes(this.inputParticipants2)) {
        console.log('works')
        let list = document.getElementById('all-users');
        list.innerHTML += `<li>${user.userName}</li>`;
      }
    });
  }
  */
}
