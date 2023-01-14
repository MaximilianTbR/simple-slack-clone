import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Channel } from '../models/channel';
import { User } from '../models/user';

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
  automaticallyGeneratedUserIndex = this.allUsers.length - 1;


  constructor(
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(paramMap => {
      this.channelID = paramMap.get('id');
      this.getChannel();
    });
    await this.downloadChannels();
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
    await this.downloadUsers();
    this.searchForUser();
    if (this.userId == this.user.userId) { // wenn die UserId bekannt ist/der aktuelle Nutzer bereits bekannt ist (= also sowohl Name, Email, als auch userId, dann sollen die Channels geladen werden, in welchen dieser User drin ist)

    } else {
      //wenn der aktuelle Nutzer nicht bekannt ist, dann er zu den users im Firestore hinzugfügt werden mit der aktuellen UserId, es soll ein Dialog aufgehen in welchen dann Name und Email eingetragen(= how should we call you?) werden sollen und anschliesend soll dieser User zu allen allgemeinen Channels hinzugefügt werden und diese sollen dann angezeigt werden
    }
  }

  async downloadUsers() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
        this.user.userId = this.userId;
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
    console.log(this.allUsers)
    this.allUsers.forEach((user) => {
      if (this.userId == user.userId) {
        this.getsIndexOfUser(user);
        console.log(this.allUsers[this.index].userName);
        /*
        if (this.allUsers[this.index].userName.length > 0) {
          this.user.userName = this.allUsers[this.index].userName;
          this.user.userId = this.allUsers[this.index].userId;
          this.user.userMail = this.allUsers[this.index].userMail;
        } else {
          console.log('open dialog!')
        }*/
      } else {
        console.log('didnt work yet!')
      }
    })
  }

  getsIndexOfUser(user) {
    return this.index = this.allUsers.indexOf(user);
  }

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
      .doc(this.channelID)
      .valueChanges()
      .subscribe((user: any) =>
        this.channel = new Channel(user))
    this.participantsLength = Object.keys(this.channel.participants).length;
  }
}
