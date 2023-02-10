import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DmDialogComponent } from '../dm-dialog/dm-dialog.component';
import { User } from '../models/message';
import { StartscreenComponent } from '../Startscreen/startscreen.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
   
  User = new User();
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    
    public Start: StartscreenComponent,) { }

  ngOnInit(): void {
    

  }

  



  user(){
    console.log(this.User)
  }
  openDialogForDirectMessage() {
    this.dialog.open(DmDialogComponent);
    
  }

}
