import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.scss']
})
export class SingleMessageComponent implements OnInit {

  constructor() { }

  @Input() messageOfChannel!: any;

  renderedMessage: string;
  renderedMessage2: string;

  ngOnInit(): void {
<<<<<<< HEAD
    this.renderedMessage = this.messageOfChannel.substring(3);
    this.renderedMessage2 = this.renderedMessage.substring(0, this.renderedMessage.length - 4);
=======
  //  this.renderedMessage = this.messageOfChannel.substring(3);
   // this.renderedMessage2 = this.renderedMessage.substring(0, this.renderedMessage.length - 4);
>>>>>>> 06497fef039b394df133d5bd255344352bdbf6bb
  }

  test2(){
    console.log(this.messageOfChannel)
  }

}
