import { Component, Input, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { map } from 'rxjs';
import { Channel } from '../models/channel';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { StartscreenComponent } from '../Startscreen/startscreen.component';

@Component({
  selector: 'app-single-channel',
  templateUrl: './single-channel.component.html',
  styleUrls: ['./single-channel.component.scss']
})


export class SingleChannelComponent implements OnInit {

  userId: any;
  channel = new Channel();
  UserName = this.Start.UserName;
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
    public dialog: MatDialog,
    public Start: StartscreenComponent
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(paramMap => {
      this.channelID = paramMap.get('id');

      this.getChannel();
    });


  }

 
  openDialog(): void {
    this.dialog.open(NameDialogComponent);
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
        userID: this.userId,
        userName: this.Start.UserName,
        timestampe: new Date().getTime()
      })

    this.message = '';
  }


  test(){
   
    console.log(this.Start.UserName)
    
  }
}
