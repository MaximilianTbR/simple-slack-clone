import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slack-clone';
  allChannels = [];

  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log(this.allChannels);
      })
  }
}
