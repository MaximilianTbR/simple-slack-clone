import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddUserComponent implements OnInit {
    
   
  

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { }
  channel = new Channel();
  loading = false;

  ngOnInit(): void {

  }

  

  close() {
    this.dialogRef.close();
  }

  createNewChannel() {
    this.loading = true;
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result: any) => {
        console.log(result)
      })
    this.loading = false;
    this.dialogRef.close();
  }
}
