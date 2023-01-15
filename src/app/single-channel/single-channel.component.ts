<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, Input, OnInit } from '@angular/core';
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { map } from 'rxjs';
import { Channel } from '../models/channel';
import { User } from '../models/user';
=======
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { map } from 'rxjs';
import { Channel } from '../models/channel';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb

@Component({
  selector: 'app-single-channel',
  templateUrl: './single-channel.component.html',
  styleUrls: ['./single-channel.component.scss']
})
export class SingleChannelComponent implements OnInit {
  messageOfChannel: any;
  userId: any;
  channel = new Channel();
  user = new User();
  message: string;
  allChannels = [];
  allUsers = [];
  channelData: Channel;
  index: any;
  participantsLength;
  refreshing = false;
  messageField = '';
  channelID = '';
  channelCollection = this.firestore.collection('channels');
  filteredChannels: any;
  filteredChannels2 = [];
<<<<<<< HEAD
  automaticallyGeneratedUserIndex = this.allUsers.length - 1;

=======
  hallo: any;
  automaticallyGeneratedUserIndex = this.allUsers.length - 1;
  userIsNotKnown = 0;
  @Input() userName: any;
  @Input() userMail: any;

  allMessages: any = [];
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb

  constructor(
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
<<<<<<< HEAD
    private afAuth: AngularFireAuth
  ) { }

  async ngOnInit() {
=======
    private afAuth: AngularFireAuth,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
    this.route.paramMap.subscribe(paramMap => {
      this.channelID = paramMap.get('id');
      this.getChannel();
    });
<<<<<<< HEAD
=======

>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
    await this.downloadChannels();
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
    await this.downloadUsers();
<<<<<<< HEAD

    /*
    if(this.userId) { // wenn die UserId bekannt ist/der aktuelle Nutzer bereits bekannt ist (= also sowohl Name, Email, als auch userId, dann sollen die Channels geladen werden, in welchen dieser User drin ist)

    } else {
//wenn der aktuelle Nutzer nicht bekannt ist, dann er zu den users im Firestore hinzugfügt werden mit der aktuellen UserId, es soll ein Dialog aufgehen in welchen dann Name und Email eingetragen(= how should we call you?) werden sollen und anschliesend soll dieser User zu allen allgemeinen Channels hinzugefügt werden und diese sollen dann angezeigt werden
    }*/
=======
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
  }

  async downloadUsers() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
        this.user.userId = this.userId;
<<<<<<< HEAD
        //this.searchForUser()
=======
        this.searchForUser();
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
      })
  }

  filterChannels() {
    this.filteredChannels = this.channelCollection.valueChanges().pipe(
      map((channels: Channel[]) => channels.filter(channel => {
        // Make sure the `channel` object has a `participants` property
        if (channel.hasOwnProperty('participants')) {
          this.filteredChannels2.push(channel);
          //&& Object.values(channel.participants).includes(this.userId)
        } else {
          //console.log(channel);
        }
        return false;
      })),
      map(channels => JSON.stringify(channels))
    );

    this.filteredChannels.toPromise().then(json => {
      console.log(json);
    });
  }


  async downloadChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        this.searchForIndex();
        this.channel = this.allChannels[this.index];
        this.filterChannels();
      })
  }

  async getUserId() {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
  }

  emptyArray() {
    this.channel.channelName = '';
    this.channel.channelMessages = [];
    this.channel.channelDescription = '';
    this.channel.unread = false;
    Object.keys(this.channel.participants).forEach(key => {
      delete this.channel.participants[key];
    });
  }

  async searchForIndex() {
    this.allChannels.forEach((channel) => {
      if (this.channelID == channel.customIdName) {
        this.getsIndexOfClass(channel);
        this.channel.channelDescription = this.allChannels[this.index].channelDescription;
        this.channel.channelMessages = this.allChannels[this.index].channelMessages;
        //this.channel.channelIndex = this.allChannels[this.index].channelIndex;
        this.channel.unread = this.allChannels[this.index].unread;
        this.channel.channelName = this.allChannels[this.index].channelName;
        this.channel.participants = this.allChannels[this.index].participants;
        this.participantsLength = Object.keys(this.channel.participants).length;
      }
    })
  }

  searchForUser() {
<<<<<<< HEAD
    this.allUsers.forEach((user) => {
      if (this.userId == user.userId) {
        this.getsIndexOfUser(user);
        if (this.allUsers[this.index].userName.length > 0) {
          this.user.userName = this.allUsers[this.index].userName;
          this.user.userId = this.allUsers[this.index].userId;
          this.user.userMail = this.allUsers[this.index].userMail;
        } else {
          console.log('open dialog!')
        }
      } else {

      }
    })
=======
    console.log(this.allUsers)
    this.allUsers.forEach((user) => {
      if (this.userId == user.userId) {
        this.getsIndexOfUser(user);
      } else {
        this.userIsNotKnown++;
      }
    })
    if (this.userIsNotKnown == this.allUsers.length) {
      this.openDialog();
    }
  }

  openDialog(): void {
    this.dialog.open(NameDialogComponent);
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
  }

  getsIndexOfUser(user) {
    return this.index = this.allUsers.indexOf(user);
  }

<<<<<<< HEAD
=======


>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
  sendMessage() {
    //this.searchForIndex()
    this.channel.channelMessages.push(this.message);
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .update(this.channel.toJSON())
      .then((result: any) => {
      });
    this.message = '';
  }

  getsIndexOfClass(channel) {
    return this.index = this.allChannels.indexOf(channel);
  }

  getChannel() {
    this.firestore
      .collection('channels')
<<<<<<< HEAD
      .doc(this.channelID)
=======
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
      .valueChanges()
      .subscribe((user: any) =>
        this.channel = new Channel(user))
    this.participantsLength = Object.keys(this.channel.participants).length;
<<<<<<< HEAD
  }
=======
    this.test2()
  }


  test2() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('channelMessages')
      .valueChanges()
      .subscribe(allMessages => {
        this.allMessages = allMessages
      });
  }




  sendMessage2() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('channelMessages')
      .add({
        text: this.message,
        user: this.userId,
      })

    console.log(this.message, this.userId)
  }





  test() {



    console.log(this.allMessages)
  }



>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
}
