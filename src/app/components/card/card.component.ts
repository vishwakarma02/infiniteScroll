import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  card: HTMLElement | undefined;
  mouseDown = false;
  startX = 0;
  endX = 0;
  threshold = 100;
  dragTravel = 0;
  dragDirection = '';
  isTouchEnabled: boolean = false;

  @Input() author: string = '';
  @Input() content: string = '';
  @Input() photoUrl: string = '';
  @Input() updatedAt: string = '';

  @ViewChild('card')
  set pane(el: ElementRef) {
    this.card = el.nativeElement;
  }

  get dragTravelCssValue(): string {
    return `translate( ${this.dragTravel}px )`;
  }

  constructor() { }

  ngOnInit(): void {
    this.isTouchEnabled =  ( 'ontouchstart' in window ) || 
             ( navigator.maxTouchPoints > 0 ) || 
             ( navigator.msMaxTouchPoints > 0 );
  }

  public handleMouseDown(event:any): void {
    if (this.isTouchEnabled) {
      return;
    }
    this.mouseDown = true;
    this.startX = event.screenX;
  }

  public handleMouseUp(event:any): void {
    if (this.isTouchEnabled) {
      return;
    }
    this.mouseDown = false;
    this.endX = event.screenX;
    if ( Math.abs(this.dragTravel) > this.threshold) {
      if (this.dragTravel > 0) {
        this.dragTravel = 64;
      } else {
        this.dragTravel = -64;
      }
    } else {
      this.dragTravel = 0;
    }
    console.log(event.screenX);
  }

  public handleMouseMove(event:any): void {
    event.stopPropagation();
    if (this.isTouchEnabled) {
      return;
    }
    if (this.mouseDown){
      this.dragTravel = event.screenX - this.startX;
    }
  }

  public editMessage(event: any): void {
    event.stopPropagation();
    console.log('edit');
  }

  public deleteMessage(event: any): void {
    event.stopPropagation();
    console.log('delete');
  }

  public handleTouchMove(event:any): void {
    event.stopPropagation();
    if (!this.isTouchEnabled) {
      return;
    }
    console.log(event);
    if(this.mouseDown) {
      this.dragTravel = event.changedTouches[0].screenX - this.startX;
    }
  }

  public handleTouchStart(event:any): void {
    event.stopPropagation();
    if (!this.isTouchEnabled) {
      return;
    }
    this.mouseDown = true;
    this.startX = event.changedTouches[0].screenX;
    console.log('touch start', event);
  }

  public handleTouchEnd(event:any): void {
    event.stopPropagation();
    if (!this.isTouchEnabled) {
      return;
    }
    this.mouseDown = false;
    this.endX = event.changedTouches[0].screenX;    
    if ( Math.abs(this.dragTravel) > this.threshold) {
      if (this.dragTravel > 0) {
        this.dragTravel = 64;
      } else {
        this.dragTravel = -64;
      }
    } else {
      this.dragTravel = 0;
    }
    console.log('touch end', event);
  }
}
