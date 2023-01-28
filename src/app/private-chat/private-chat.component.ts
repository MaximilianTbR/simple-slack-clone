import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Channel } from '../models/channel';
import { User } from '../models/user';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {

  test3 = ['121323', '21212112', '45', '1212'];
  userId: any;
  channel = new Channel();
  UserName;
  user = new User();
  message: string;
  allChannels = [];
  allUsers = [];
  channelData: Channel;
  index: any;
  participantsLength;
  refreshing = false;
  channelID = '';
  channelCollection = this.firestore.collection('channels');
  filteredChannels: any;
  filteredChannels2 = [];
  automaticallyGeneratedUserIndex = this.allUsers.length - 1;
  userIsNotKnown = 0;

  allMessages: any = [];

  constructor(
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {

    this.route.paramMap.subscribe(paramMap => {
      this.channelID = paramMap.get('id');
      this.getChannel();
    });


    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId)
      }
    })

    //  await this.downloadChannels();

    await this.downloadUsers();
  }


  async downloadUsers() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
        this.user.userId = this.userId;
        this.searchForUser();
      })
  }

  filterChannels() {
    this.filteredChannels = this.channelCollection.valueChanges().pipe(
      map((channels: Channel[]) => channels.filter(channel => {
        // Make sure the `channel` object has a `participants` property
        if (channel.hasOwnProperty('participants') && Object.values(channel.participants).includes(this.userId)) {
          this.filteredChannels2.push(channel);
          console.log(this.filteredChannels2)
        } else {
          console.log(channel);
        }
        return false;
      })),
      map(channels => JSON.stringify(channels))
    );

    this.filteredChannels.toPromise().then(json => {
      console.log('here it is!', json);
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
        console.log(this.filteredChannels2[0].customIdName)
      })
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
        //     this.participantsLength = Object.keys(this.channel.participants).length;
      }
    })
  }

  searchForUser() {
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
  }

  getsIndexOfUser(user) {
    return this.index = this.allUsers.indexOf(user);
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
        this.allMessages = this.sortByTimestamp(this.allMessages)
      });

    this.allMessages = this.sortByTimestamp(this.allMessages)
  }

  sortByTimestamp(messages: any[]): any[] {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  }


  sendMessage2() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('channelMessages')
      .add({
        text: this.message,
        user: this.userId,
        timestampe: new Date().getTime()
      })

    console.log(this.message, this.userId)
    this.message = '';
  }
}
