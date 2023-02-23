import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user';
import { Storage, ref, uploadBytesResumable, getDownloadURL, StorageReference } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: User;
  public file: any = {};
  profileImg = './../../assets/img/blank-pp.webp';
  userId: any;
  allUsers = [];
  userPP: string;
  userIsNotKnown = 0;
  docIDfromUser: any;
  UserName: any;
  UserMail: any;
  UserChannels: any;
  userStatus: string;

  constructor(
    public storage: Storage,
    private afAuth: AngularFireAuth,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public firestore: AngularFirestore,
    public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    this.User()
  }

  async getUserId() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
  }

  async User() {
    this.firestore
      .collection('users')
      .snapshotChanges()
      .subscribe((docs: any) => {
        this.allUsers = docs;

        this.searchForUser();
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

  test() {
    console.log(this.data.docIDfromUser)
  }

  saveUser() {
    this.user.userId = this.userId;
    if (this.user.userName === undefined) {
      this.user.userName = this.UserName;
    }
    if (this.user.userMail === undefined) {
      this.user.userMail = this.UserMail;
    }
    if (this.user.userPP === undefined) {
      this.user.userPP = this.userPP;
    }
    if (this.user.status === undefined) {
      this.user.status = this.userStatus;
    }
    this.firestore
      .collection('users')
      .doc(this.data.docIDfromUser)
      .update(this.user.toJSON())
      .then(() => {
        this.dialogRef.close()
      })
  }

  chooseFile(event: any) {
    this.file = event.target.files[0];
  }

  addData() {
    const StorageRef = ref(this.storage, 'users/' + this.userId + '/' + this.file.name)
    const uploadTask = uploadBytesResumable(StorageRef, this.file)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, (error) => {
      console.log(error.message)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        this.profileImg = downloadURL;
        console.log(this.profileImg)
        this.firestore
          .collection('users')
          .doc(this.userId)
          .update({
            userPP: this.profileImg
          })
      });
    })
  }
}