import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user : User;
  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
   
  }




  saveUser(){
    this.firestore
    .collection('users')
    .doc(this.data.docIDfromUser)
    .update(this.user.toJSON())
    .then(()=> {
      this.dialogRef.close()
    })
  }

 
}