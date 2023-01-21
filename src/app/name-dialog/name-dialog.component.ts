import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
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
  allChannels: any;
  allUsers: any;
  index: any;

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
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
    /*this.user.userId = this.userId;
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {
        console.log(result)
      })*/
    this.joinGeneralChannel();
    this.firestore
      .collection('channels')
      .doc('vsbfzlJW10O3Jvfq7XVF')
      .update(this.allChannels)
      .then((result: any) => {
      })/*
    this.dialogRef.close(NameDialogComponent);*/
  }

  joinGeneralChannel() {
    this.allChannels.forEach((channel) => {
      if ('vsbfzlJW10O3Jvfq7XVF' == channel.customIdName) {
        this.getsIndexOfChannel(channel);
        this.allChannels[this.index].participants.push(this.userId);
        console.log(this.allChannels[this.index].participants);
      }
    })
  }

  getsIndexOfChannel(user) {
    return this.index = this.allUsers.indexOf(user);
  }

}
