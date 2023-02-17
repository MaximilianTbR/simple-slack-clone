import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../models/channel';
import { User } from '../models/user';

// import { StartscreenComponent } from '../Startscreen/startscreen.component';
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
    public dialog: MatDialog,

    //   public Start: StartscreenComponent
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
    
    this.dialogRef.close(NameDialogComponent);
  }


  
 
}