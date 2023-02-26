import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DmDialogComponent } from '../dm-dialog/dm-dialog.component';
import { Storage, ref, uploadBytesResumable, getDownloadURL, StorageReference } from '@angular/fire/storage';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../models/user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() userName: any
  constructor(
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public storage: Storage,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public afAuth: AngularFireAuth
  ) { }
  User;
  userId: any;
  public file: any = {};
  allUsers: any = [];
  userIsNotKnown = 0;
  allChannels: any = [];
  docIDfromUser;
  UserMail;
  UserName;
  UserChannels = [];
  profileImg = './../../assets/img/blank-pp.webp';
  userPP;
  userPP2 = "https://firebasestorage.googleapis.com/v0/b/simple-slack-clone.appspot.com/o/users%2FpK6Y7WqHSQUzWvuBj9Hi38iDfWy2%2Fportfolio.png?alt=media&token=ac8c669c-adb9-48a2-8998-e7c43ecf4f7a";
  activeUser = false;

  async ngOnInit(): Promise<void> {
    await this.getUserId();
    await this.UserDetail();
  }

  async getUserId() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
      console.log(this.userId);
    })
  }

  UserDetail() {
    this.firestore
      .collection('users')
      .doc(this.data.UserID)
      .valueChanges()
      .subscribe(user =>
        this.User = user)
    this.checkUser()
  }

  /*
    async User() {
      this.firestore
        .collection('users')
        .snapshotChanges()
        .subscribe((docs: any) => {
          this.allUsers = docs;
          // this.loadChannels()
        })
    }
  
    searchForUser() {
      //console.log('test',this.allUsers, this.userId, this.allUsers[7].payload.doc.data().userId)
      this.allUsers.forEach((user) => {
        if (this.userId == user.payload.doc.data().userId) {
          this.currentUser();
        } else {
          this.userIsNotKnown++;
          if (this.userIsNotKnown == this.allUsers.length) {
            this.openDialogNewUser();
          }
        }
      })
  
    } */

  openDialogNewUser() {
    this.dialog.open(NameDialogComponent);
  }

  checkUser() {
    if (this.data.UserID == this.data.docIDfromUser) {
      this.activeUser = true;
    }
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
        console.log(this.userPP);
      }
    }
    this.loadChannels()
  }

  loadChannels() {
    this.allChannels = [];
    this.firestore
      .collection('users')
      .doc(this.docIDfromUser)
      .collection('channels')
      .valueChanges()
      .subscribe((channels: any) => {
        this.allChannels = channels;
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

  openDialogForDirectMessage() {
    this.dialog.open(DmDialogComponent, {
      data:
      {
        UserID: this.data.UserID,
        docIDfromUser: this.data.docIDfromUser,
      }
    })

  }


  openEditUser() {
    let dialog = this.dialog.open(EditUserComponent, {
      data: {
        docIDfromUser: this.data.docIDfromUser,
      }
    })
    dialog.componentInstance.user = new User(this.User);
  }


  test() {
    console.log(this.User)
  }

}
