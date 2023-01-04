import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  constructor(public firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid
        this.userMail = user.email;
        console.log(this.userId)
        console.log(this.userMail)
      };
      console.log(this.userId);
    })
  }




  uiConfig = {
    signInSuccessUrl: '/channel',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
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
    this.user.userName;
    this.firestore.collection('users').doc(this.userId).set({
      userName: "Los Angeles",
      userId: "CA",
      userChannels: "USA",
      userMail: ''
    })
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {
        console.log(result)
      })
  }
  /*
    addUser(uid: string, data: User) {
      this.usersCollection.doc(uid).set(data);
    }*/
}