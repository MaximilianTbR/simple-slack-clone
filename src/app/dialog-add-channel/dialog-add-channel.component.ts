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

<<<<<<< HEAD



=======
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { }
  channel = new Channel();
  loading = false;

  ngOnInit(): void {
<<<<<<< HEAD
      
  }



=======

  }

>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
  close() {
    this.dialogRef.close();
  }

  createNewChannel() {
    this.loading = true;
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
<<<<<<< HEAD
     
    this.loading = false;
    this.dialogRef.close();
  }

=======
    this.loading = false;
    this.dialogRef.close();
  }
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
}
