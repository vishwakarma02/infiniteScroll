import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  mouseDown = false;
  startX = 0;
  endX = 0;
  threshold = 100;
  dragTravel = 0;
  isTouchEnabled: boolean = false;
  blockVertialSwipeIfDragValueIs = 20;

  @Input() author: string = '';
  @Input() content: string = '';
  @Input() photoUrl: string = '';
  @Input() updatedAt: string = '';

  @Output() swiping = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  get dragTravelCssValue(): string {
    return `translate( ${this.dragTravel}px )`;
  }

  get buttonWidth(): string {
    return `${Math.abs(this.dragTravel - 4)}px`;
  }

  @HostListener("mousedown", ['$event'])
  @HostListener("mouseup", ["$event"])
  @HostListener("mousemove", ["$event"])
  handleClick(event: MouseEvent): void {
    if (this.isTouchEnabled) {
      return;
    }
    switch (event.type) {
      case 'mousedown': {
        this.pointerDown(event.screenX);
        break;
      }
      case 'mouseup': {
        this.pointerUp(event.screenX);
        break;
      }
      case 'mousemove': {
        this.pointerMove(event.screenX);
        break;
      }
    }
  }

  @HostListener("touchstart", ["$event"])
  @HostListener("touchend", ["$event"])
  @HostListener("touchmove", ["$event"])
  @HostListener("touch", ["$event"])
  handleTouch(event: TouchEvent): void {
    if (!this.isTouchEnabled) {
      return;
    }

    switch (event.type) {
      case 'touchstart': {
        this.pointerDown(event.changedTouches[0].screenX);
        break;
      }
      case 'touchend': {
        this.pointerUp(event.changedTouches[0].screenX);
        break;
      }
      case 'touchmove': {
        this.pointerMove(event.changedTouches[0].screenX);
        break;
      }
    }
  }

  @HostListener("document:click", ['$event'])
  @HostListener("document:touch", ["$event"])
  handleClickOutside(event: TouchEvent | MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elRef.nativeElement.contains(target.closest('.card'))) {
      this.dragTravel = 0;
    }
  }

  constructor(protected elRef: ElementRef) { }

  ngOnInit(): void {
    this.isTouchEnabled = ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0);
  }

  protected pointerDown(positionX: number): void {
    this.mouseDown = true;
    this.startX = positionX;
  }

  protected pointerUp(positionX: number): void {
    this.mouseDown = false;
    this.endX = positionX;
    if (Math.abs(this.dragTravel) > this.threshold) {
      if (this.dragTravel > 0) {
        this.dragTravel = this.threshold;
      } else {
        this.dragTravel = -this.threshold;
      }
    } else {
      this.dragTravel = 0;
    }
  }

  protected pointerMove(positionX: number): void {
    if (this.mouseDown) {
      const temp = positionX - this.startX;
      if (Math.abs(temp) > 104) {
        this.dragTravel = temp > 0 ? 104 : -104;
      } else {
        this.dragTravel = positionX - this.startX;
      }
      // this.swiping.emit(Math.abs(this.dragTravel) > this.blockVertialSwipeIfDragValueIs);
    }
  }

  public editMessage(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();
    console.log('edit')
    this.edit.emit();
  }

  public deleteMessage(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();
    console.log('delete')
    this.delete.emit();
  }
}
