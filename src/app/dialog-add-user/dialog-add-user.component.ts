import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }


  ngOnInit(): void {

  }


  close() {
    this.dialogRef.close();
  }
}
