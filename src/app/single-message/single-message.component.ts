import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.scss']
})
export class SingleMessageComponent implements OnInit {

  constructor() { }

  @Input() message: any;

  ngOnInit(): void {
  }

}
