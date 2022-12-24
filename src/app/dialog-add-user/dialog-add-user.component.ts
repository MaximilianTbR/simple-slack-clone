import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from '../models/channel';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }
  channel = new Channel();
  loading = false;

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  createNewChannel() {
    //commands for creating new channel
    this.loading = true;
    this.dialogRef.close();
  }
}
