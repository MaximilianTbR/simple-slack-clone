import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-channel-sidenav-link',
  templateUrl: './single-channel-sidenav-link.component.html',
  styleUrls: ['./single-channel-sidenav-link.component.scss']
})
export class SingleChannelSidenavLinkComponent implements OnInit {
  @Input() channelName: any;

  constructor() { }

  ngOnInit(): void {
  }

}
