import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { Router } from "@angular/router"
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { from, take } from 'rxjs';
// import * as admin from 'firebase-admin/app';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { idToken } from '@angular/fire/auth';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  allUsers = [];
  user = new User();
  userId: string;
  userMail: string;
  signInAutomatically = false;
  currentUserName: string;
  currentUserMail: string;
  userFromFirebase: firebase.User;

  constructor(public firestore: AngularFirestore, private afAuth: AngularFireAuth, private router: Router, public dialog: MatDialog) {
    this.afAuth.onAuthStateChanged((user) => {
      this.userFromFirebase = user;
    })
  }


  uiConfig = {
    signInSuccessUrl: '/channel/SbNH3sbeTNT7nKmDJ8Ss',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      //firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign('<your-privacy-policy-url>');
    }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
      })
    this.ui.start('#firebaseui-auth-container', this.uiConfig);
  }

  continue() {
    document.getElementById('form-1').classList.add('d-none');
    document.getElementById('form-2').classList.remove('d-none');
  }

  addNewUser() {
    if (this.userFromFirebase) {
      this.user.userId = this.userFromFirebase.uid
    }
    console.log(this.user);
    this.firestore
      .collection('users')
      .add(this.user.toJSON(),)
      .then((result: any) => {
      })
    this.ui.start('#firebaseui-auth-container-2', this.uiConfig);
    this.continue();
  }
}