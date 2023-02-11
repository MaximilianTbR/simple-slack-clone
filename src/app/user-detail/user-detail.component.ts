import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DmDialogComponent } from '../dm-dialog/dm-dialog.component';
import { User } from '../models/message';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
   @Input () userName:any
  constructor(
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    
    ) { }

  ngOnInit(): void {
    

  }

  



  openDialogForDirectMessage() {
    this.dialog.open(DmDialogComponent);
    
  }

}
