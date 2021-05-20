import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Message } from './models/message.i';
import { MessagesService } from './services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages : Message[] = [];
  pageToken : string = '';
  isLoadingMessages: boolean = false;
  screenHeight: number = 0;
  loaderProximity = 0.5;
  
  @ViewChild('loader') loader!: ElementRef;

  @HostListener('document:scroll', ['$event'])
  scrolled(): void {
    this.getOffsetTop();
  }

  constructor (protected _service: MessagesService) {}

  ngOnInit(): void {
    this.getMessages();
    this.screenHeight = window.innerHeight;
  }

  getMessages(): void {
    this.isLoadingMessages = true;
    const messageUrl = `http://message-list.appspot.com/messages${this.pageToken}`;
    this._service.getResponse(messageUrl).subscribe(res => {
      this.messages = [...this.messages, ...res.messages];
      // this.pageToken = `/${res.pageToken}`;
      this.pageToken = '';
      this.isLoadingMessages = false;
    });
  }

  getOffsetTop() {
    const loaderOffsetTop = this.loader.nativeElement.getBoundingClientRect()
      .top;
    const trigger =
      this.screenHeight + this.screenHeight * this.loaderProximity;
    if (!this.isLoadingMessages && loaderOffsetTop < trigger) {
      this.getMessages();
    }
  }
}


// http://message-list.appspot.com/messages.