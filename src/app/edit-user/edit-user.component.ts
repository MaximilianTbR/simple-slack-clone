import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user';
import { Storage, ref, uploadBytesResumable, getDownloadURL, StorageReference } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  constructor(
    public storage: Storage,
    private afAuth: AngularFireAuth,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public firestore: AngularFirestore) { }

  async ngOnInit(): Promise<void> {
    await this.getUserId();
  }

  async getUserId() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
  }

  test() {
    console.log(this.userId)
  }

  saveUser() {
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