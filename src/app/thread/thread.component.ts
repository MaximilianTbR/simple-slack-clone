import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor() {
    console.log(this.threadMessages)
  }

  @Input() threadMessages: any;

  ngOnInit(): void {
    console.log(this.threadMessages)
  }

}
