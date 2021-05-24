import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from './models/message.i';
import { MessagesService } from './services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages: Message[] = [];
  pageToken: string = '';
  isLoadingMessages: boolean = false;
  screenHeight: number = 0;
  loaderProximity = 0.5;
  isSwiping: boolean = false;

  dummyResponse = { "count": 10, "pageToken": "Cj4KEAoKbWVzc2FnZV9pZBICCAoSJmoOc35tZXNzYWdlLWxpc3RyFAsSB01lc3NhZ2UYgICAgOvJkQoMGAAgAA==", "messages": [{ "content": "Her pretty looks have been mine enemies, And therefore have I invoked thee for her seal, and meant thereby Thou shouldst print more, not let that pine to aggravate thy store Buy terms divine in selling hours of dross Within be fed, without be rich no more So shalt thou feed on Death, that feeds on men, And Death once dead, there's no more to shame nor me nor you.", "updated": "2015-02-01T07:46:23Z", "id": 1, "author": { "name": "William Shakespeare", "photoUrl": "/photos/william-shakespeare.jpg" } }, { "content": "At five o'clock the two who were still able to indulge herself in bidding farewell, the more probable Supposing him to say for themselves.", "updated": "2015-02-01T08:45:23Z", "id": 2, "author": { "name": "Jane Austen", "photoUrl": "/photos/jane-austen.jpg" } }, { "content": "I'll look first,\" she said, \"than wasting it in asking riddles that have no answers.\" \"Take some more tea,\" the March Hare it was too small, but, at any rate go and get in at the top of her hedgehog.", "updated": "2015-02-01T08:59:23Z", "id": 3, "author": { "name": "Lewis Carroll", "photoUrl": "/photos/lewis-carroll.jpg" } }, { "content": "Finding the first 'tis flattery in my thought, the other my desire, These present absent with swift motion slide. For when these quicker elements are gone In tender embassy of love with a false esteem Yet so they mourn, becoming of things ill, That in thy face O, let my books be then the eloquence And dumb presagers of my sinful earth, these rebel powers that thee array Why dost thou use So great a sum of sums, yet canst not live For having traffic with thyself alone, Thou of thyself thy beauty's use, If thou wilt for I, being pent in", "updated": "2015-02-01T09:05:23Z", "id": 4, "author": { "name": "William Shakespeare", "photoUrl": "/photos/william-shakespeare.jpg" } }, { "content": "\"What a curious appearance in the distance and she added rather doubtfully, as she could. \"No,\" said the King, \"that saves a world of trouble, you know, as we needn't try to find herself still in existence.", "updated": "2015-02-01T09:23:23Z", "id": 5, "author": { "name": "Lewis Carroll", "photoUrl": "/photos/lewis-carroll.jpg" } }, { "content": "Justine Moritz, who was allowed to speak, with the stigma of disgrace marked on your lips first have recourse to death.", "updated": "2015-02-01T09:38:23Z", "id": 6, "author": { "name": "Mary Shelley", "photoUrl": "/photos/mary-shelley.jpg" } }, { "content": "If our impulses were confined to his deliverer and Felix remained with them increased that regret which I had first beheld the bare trees waved their branches above me now and then retired to our union had been progressively led to my mother, and departed.", "updated": "2015-02-01T10:05:23Z", "id": 7, "author": { "name": "Mary Shelley", "photoUrl": "/photos/mary-shelley.jpg" } }, { "content": "I'll tell you my history and you'll understand why it is to do it.\" First it marked out a race course, in a sorrowful tone.", "updated": "2015-02-01T10:58:23Z", "id": 8, "author": { "name": "Lewis Carroll", "photoUrl": "/photos/lewis-carroll.jpg" } }, { "content": "Darcy, it determined her not to have such tremblings, such flutterings, all over before I left Hunsford between our pools at quadrille, while Mrs.", "updated": "2015-02-01T11:30:23Z", "id": 9, "author": { "name": "Jane Austen", "photoUrl": "/photos/jane-austen.jpg" } }, { "content": "The question is, what did the archbishop find\" The Mouse gave a sudden leap out of his shrill little voice, the name engraved upon it.", "updated": "2015-02-01T12:18:23Z", "id": 10, "author": { "name": "Lewis Carroll", "photoUrl": "/photos/lewis-carroll.jpg" } }] };

  @ViewChild('loader') loader!: ElementRef;

  constructor(
      protected _service: MessagesService,
      protected _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMessages();
    this.screenHeight = window.innerHeight;
  }

  getMessages(): void {
    this.isLoadingMessages = true;
    const messageUrl = `http://message-list.appspot.com/messages${this.pageToken}`;
    this._service.getResponse(messageUrl).subscribe(
      res => {
        this.messages = [...this.messages, ...res.messages];
        this.pageToken = `/${res.pageToken}`;
        this.isLoadingMessages = false;
      },
      error => {
        this._snackBar.open('API Failed');
        this.isLoadingMessages = false;
      }
    );

    // // dummy response for hosting and testing
    // this.isLoadingMessages = true;
    // this.messages = [...this.messages, ...this.dummyResponse.messages];
    // // this.pageToken = `/${res.pageToken}`;
    // this.pageToken = '';
    // this.isLoadingMessages = false;
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

  public deletePost(id: number): void {
    this.messages = this.messages.filter(m => m.id !== id);
    this._snackBar.open('Item Deleted', 'Dismiss', {duration: 3000});
  }

  public editPost(id: number): void {
    this._snackBar.open('Item Edited', 'Dismiss', {duration: 3000});
  }

  handleMenuToggle(): void {
    this._snackBar.open('Menu Clicked', 'Dismiss', {duration: 3000});
  }

  identifyById(index: any, item: any) {
    return item.id;
  }
}
