import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[highlighted]',
  standalone: true,
})
export class HighlightDirective {
  @Input() rowId = 0;
  @Output() rowClicked = new EventEmitter<number>();

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.rowClicked.emit(this.rowId);
  }
}
