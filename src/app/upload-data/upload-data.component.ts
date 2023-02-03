import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, uploadBytes } from "firebase/storage";


@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.scss']
})
export class UploadDataComponent implements OnInit {
  files = [];
  constructor(public storage: AngularFireStorage) { }

  ngOnInit(): void {

  }

  // In Progress
  uploadFile(event) {
    let file = event.target.files[0];
    const filePath = './assets/img/';
    console.log(file);
    const task = this.storage.upload(filePath, file);
    this.files.push(task);
    console.log(this.storage)
  }
}

