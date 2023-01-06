import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../models/channel';
import { User } from '../models/user';

@Component({
  selector: 'app-single-channel',
  templateUrl: './single-channel.component.html',
  styleUrls: ['./single-channel.component.scss']
})
export class SingleChannelComponent implements OnInit {
  allMessages = [];
  messageOfChannel: any;
  userId: any;
  channel = new Channel();
  user = new User()
  message: string;
  allChannels = [];
  allUsers = [];
  channelData: Channel;
  index: any;
  participantsLength;
  refreshing = false;
  viewAllChannels = true;
  messageField = '';
  channelId;
  channelID = '';

  constructor(
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }




  async ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.channelID = paramMap.get('id');
      //this.getChannel();
    });
    this.getUserId();
    this.allMessages.length = 0;
    this.emptyArray();
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .valueChanges()
      .subscribe((channel: any) => {

      })
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
        this.searchForUser()
      })
    if (this.channel && this.allChannels.length > 0) {
      this.searchForIndex();
      this.channel.channelMessages = this.allChannels[this.index].channelMessages;
    }

  }

  async getChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe(async (changes: any) => {
        this.allChannels = changes;
      })
  }



  test() {
    console.log(this.channelID)

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
      } else {
        console.log('undefined!!!')
      }
    })
  }

  searchForUser() {
    this.allUsers.forEach((user) => {
      if (this.userId == user.userId) {
        this.getsIndexOfUser(user);
        if (this.allUsers[this.index].userName.length > 0) {
          this.user.userName = this.allUsers[this.index].userName;
          this.user.userId = this.allUsers[this.index].userId;
          this.user.userMail = this.allUsers[this.index].userMail;
          console.log(this.user)
        } else {
          console.log('open dialog!')
        }
      } else {

      }
    })
  }


  getsIndexOfUser(user) {
    return this.index = this.allUsers.indexOf(user);
  }

  viewAllChannel() {
    if (!this.viewAllChannels)
      this.viewAllChannels = true;
    else {
      this.viewAllChannels = false;
    }
  }

  sendMessage() {
    this.searchForIndex()
    this.allMessages.push(this.message);
    this.allChannels[this.index].channelMessages = this.allMessages;
    this.channel = this.allChannels[this.index];
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .update(this.channel)
      .then((result: any) => {

      });
    this.message = '';
  }

  getsIndexOfClass(channel) {
    return this.index = this.allChannels.indexOf(channel);
  }

}
