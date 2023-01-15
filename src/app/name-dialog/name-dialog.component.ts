import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../models/user';

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NameDialogComponent>
  ) { }

  user = new User();

  ngOnInit(): void {
  }

  submitNewName() {
    this.dialogRef.close(NameDialogComponent);
  }

}
