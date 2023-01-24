import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../models/channel';
import { User } from '../models/user';

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NameDialogComponent>,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog
  ) { }

  user = new User();
  userId: any;
  channel = new Channel();
  allChannels: any;
  allUsers: any;
  index: any;
  channelID: any;

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
    this.route.paramMap.subscribe(paramMap => {
      this.channelID = paramMap.get('id');
    });
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allChannels = changes;
      })
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
      })
  }

  submitNewName() {
    this.user.userId = this.userId;
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {
        console.log(result)
      });
    this.joinGeneralChannel();
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result: any) => {
        console.log(result)
      });
    this.dialogRef.close(NameDialogComponent);
  }

  joinGeneralChannel(){
      this.firestore
      .collection('users')
  }

  /*
  joinGeneralChannel() {
    this.allChannels.forEach((channel) => {
      if ('Herzlich Willkommen' == channel.channelName) {
        this.index = this.allChannels.indexOf(channel)
        console.log(this.index);
        this.allChannels[this.index].participants.push(this.userId);
        this.channel.channelName = this.allChannels[this.index].channelName;
        this.channel.channelDescription = this.allChannels[this.index].channelDescription;
        this.channel.channelMessages = this.allChannels[this.index].channelMessages;
        this.channel.unread = this.allChannels[this.index].unread;
        this.channel.participants = this.allChannels[this.index].participants;
      } else {
        console.log('did not work')
      }
    })
  } */
}