import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel';

@Component({
  selector: 'app-single-channel-sidenav-link',
  templateUrl: './single-channel-sidenav-link.component.html',
  styleUrls: ['./single-channel-sidenav-link.component.scss']
})
export class SingleChannelSidenavLinkComponent implements OnInit {
  @Input() channelName: any;
  @Input() unReadMessage: number;
  @Input() unread:boolean;
  channel = new Channel();
  channelId;

  constructor(public firestore: AngularFirestore) { }

  ngOnInit(): void {

  }

 
}
