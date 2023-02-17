import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DmDialogComponent } from '../dm-dialog/dm-dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../models/user';
import { StartscreenComponent } from '../Startscreen/startscreen.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    User;
    activeUser = false;
    constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    ) { }

  async ngOnInit(): Promise<void> {
  
    await this.loadUser()

  }


  async loadUser(){
    this.firestore
    .collection('users')
    .doc(this.data.UserID)
    .valueChanges()
    .subscribe(user=> {
      this.User = user;
      this.checkUser()
    })

  }
  
  test(){
    console.log(this.data)
  }

  checkUser(){
    if (this.data.UserID == this.data.docIDfromUser) {
      this.activeUser = true;
    }
  }


  openDialogForDirectMessage() {
    this.dialog.open(DmDialogComponent,{
      data:
         {
          UserID: this.data.UserID,
          docIDfromUser: this.data.docIDfromUser
        }
    })
      
    }

    
    openEditUser(){
     let dialog=  this.dialog.open(EditUserComponent,{
      data:{
        docIDfromUser: this.data.docIDfromUser
      }
     })
     dialog.componentInstance.user = new User(this.User);
    }

}
