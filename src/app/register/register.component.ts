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

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, private router: Router, public dialog: MatDialog) {
    this.afAuth.onAuthStateChanged(user => {
      if (!user) {
        // logged in or user exists
        if (this.signInAutomatically) {
          this.router.navigate(['/channel'])
        }
        console.log('user exists!')
      }
      else {
        //this.createNewUser()
        this.dialog.open(RegisterComponent);
      }
    })
  }

  uiConfig = {
    signInSuccessUrl: '/channel',
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
        console.log(this.allUsers);
      })
    this.ui.start('#firebaseui-auth-container', this.uiConfig);
    this.user.userId = this.userId;
    this.user.userMail = this.userMail;
    /*
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {
        console.log(result)
      })*/
  }

  continue() {
    document.getElementById('form-1').classList.add('d-none');
    document.getElementById('form-2').classList.remove('d-none');
  }
}
