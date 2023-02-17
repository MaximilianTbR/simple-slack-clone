import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dm-dialog',
  templateUrl: './dm-dialog.component.html',
  styleUrls: ['./dm-dialog.component.scss']
})
export class DmDialogComponent implements OnInit {
 currentUser;
 contactedPerson;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,    
    public dialog: MatDialog,
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.data.docIDfromUser
    this.contactedPerson = this.data.UserID
  }


    test(){
      console.log(this.currentUser, this.contactedPerson)
    }
}
