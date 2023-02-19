import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { Storage, ref, uploadBytesResumable, getDownloadURL, StorageReference } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.scss']
})
export class UploadDataComponent implements OnInit {

  files = [];
  public file: any = {};
  constructor(public storage: Storage,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public afAuth: AngularFireAuth) { }
  userId: string;
  downloadURL2;

  async ngOnInit(): Promise<void> {
    await this.getUserId();
  }

  async getUserId() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
      console.log(this.userId);
    })
  }


  chooseFile(event: any) {
    this.file = event.target.files[0];
  }

  addData() {
    const StorageRef = ref(this.storage, 'allChannelPictures/' + this.file.name)
    const uploadTask = uploadBytesResumable(StorageRef, this.file)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, (error) => {
      console.log(error.message)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        if (downloadURL) {
          this.downloadURL2 = downloadURL;
          console.log(this.downloadURL2)
        }
      });
    })
  }


  createFolder(folderName: string) {
    //const parentFolder = this.storage.ref('users');
    //const newFolder = parentFolder.child(folderName);
    // The folder has been created, but it doesn't actually exist on the server until you start uploading files to it.
  }

  // In Progress
  uploadFile(event) {
    let file = event.target.files[0];
    const filePath = './assets/img/';
    console.log(file);
    //const task = this.storage.upload(filePath, file);
    //this.files.push(task);
    console.log(this.storage)
  }
  selectedFile: File = null;

}

