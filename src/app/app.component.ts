import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Firestore } from 'firebase/firestore';
import { DialogAddUserComponent } from './dialog-add-channel/dialog-add-channel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slack-clone';
  allChannels = [];
  viewAllChannels = true;


  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
      })
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  viewAllChannel() {
    if (!this.viewAllChannels)
      this.viewAllChannels = true;
    else {
      this.viewAllChannels = false;
    }
  }
}
