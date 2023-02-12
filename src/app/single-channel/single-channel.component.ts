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
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-single-channel',
  templateUrl: './single-channel.component.html',
  styleUrls: ['./single-channel.component.scss']
})


export class SingleChannelComponent implements OnInit {


  docIDfromUser = this.Start.docIDfromUser;
  channel = new Channel;
  UserName = this.Start.UserName;
  message: string;
  allUsers = [];
  refreshing = false;
  channelID = '';
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

    console.log(this.channel)
  }
  
 getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .valueChanges()
      .subscribe((channel: any) =>
        this.channel = channel)
    this.loadAllMessages()
  
  }

  openCurrentUser(UserID){
    this.dialog.open(UserDetailComponent,{
      data:
       {UserID: UserID}
    })
  }

  loadAllMessages() {
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

  sortsMessages(){ 
    this.allMessages.sort((a, b) => {
    return Number(a.timestampe) - Number(b.timestampe);
  });

}



  sendMessage() {
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
