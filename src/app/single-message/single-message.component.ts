import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.scss']
})
export class SingleMessageComponent implements OnInit {

  constructor() { }

  @Input() messageOfChannel: any;

  ngOnInit(): void {
  }

}
