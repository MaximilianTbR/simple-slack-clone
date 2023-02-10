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


  sortiert = [];
  testsortierung = ['1','423', '1212','3','2','8']
  docIDfromUser = this.Start.docIDfromUser;
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


  test(){
    this.allMessages.sort((a, b) => {
      return Number(a.timestampe) - Number(b.timestampe);
    });
    console.log(this.allMessages);
    
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
        this.sortsMessages()
      });

  }

  sortsMessages(){ this.allMessages.sort((a, b) => {
    return Number(a.timestampe) - Number(b.timestampe);
  });
  console.log(this.allMessages);

}



  sendMessage2() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('channelMessages')
      .add({
        text: this.message,
        userID: this.Start.docIDfromUser,
        userName: this.Start.UserName,
        timestampe: new Date().getTime()
      })

    this.message = '';
  }



}
