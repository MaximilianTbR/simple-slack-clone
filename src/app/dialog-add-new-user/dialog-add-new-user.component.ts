import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../models/channel';

@Component({
  selector: 'app-dialog-add-new-user',
  templateUrl: './dialog-add-new-user.component.html',
  styleUrls: ['./dialog-add-new-user.component.scss']
})
export class DialogAddNewUserComponent implements OnInit {

  participantsLength;
  channel: Channel = new Channel;
  channelID = '';
  message: string;
  constructor(
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
  ) { }

  


  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap =>{
      this.channelID = paramMap.get('id');
        this.getChannel();
    });
  }

  getChannel(){
  this.firestore
  .collection('channels')
  .doc(this.channelID)
  .valueChanges()
  .subscribe((user:any) =>
  this.channel = new Channel(user))
  this.participantsLength = Object.keys(this.channel.participants).length;
}



  test(){
    console.log(this.channelID)

  }  

  sendMessage(){
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      this.message = '';
  }
}
