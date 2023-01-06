import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { Router } from "@angular/router"
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  allUsers = [];
  user = new User();
  userId: string;
  userMail: string;
  signInAutomatically = false;

  constructor(public firestore: AngularFirestore, private router: Router, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
        console.log(this.allUsers);
      })
    this.user.userId = this.userId;
    this.user.userMail = this.userMail;
  }

  continue() {
    document.getElementById('form-1').classList.add('d-none');
    document.getElementById('form-2').classList.remove('d-none');
  }
}
