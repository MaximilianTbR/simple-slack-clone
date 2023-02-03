import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';
import { FormControl } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { user } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  allUsers = []
  allUsers2 = []
  loading = false;
  channel = new Channel();
  inputParticipants: string = '';
  inputParticipants2: string = '';


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) {
  }
  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
      })
  }

  close() {
    this.dialogRef.close();
  }

  userIsAdded = false;
  checked = false

  addUserToChannel(index: number) {
    if (this.checked == false) {
      this.checked = true;
      document.getElementById('icon-' + index).classList.add('d-none');
      document.getElementById('icon2-' + index).classList.remove('d-none');
    } else {
      this.checked = false;
      document.getElementById('icon-' + index).classList.remove('d-none');
      document.getElementById('icon2-' + index).classList.add('d-none');
    }
    console.log(this.checked)
  }

  createNewChannel() {
    this.loading = true;
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
    this.loading = false;
    this.dialogRef.close();
  }

  refreshSearchResults() {
    this.inputParticipants2 = this.inputParticipants.toLowerCase();
    for (let j = 0; j < this.allUsers.length; j++) {
      let name = this.allUsers[j].userName;
      if (this.inputParticipants2.includes(name)) {
        let list = document.getElementById('all-users').innerHTML += `<li>${name}</li>`;
      }
    }
    console.log(this.inputParticipants2)
  }
}
