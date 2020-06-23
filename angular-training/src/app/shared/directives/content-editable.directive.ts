import { Directive, HostListener, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[editable]'
})
export class ContentEditableDirective {
  @Input() set editable(s) {
    this.el.nativeElement.innerText = s;
  }

  @Output() edit = new EventEmitter();

  @Output() contentBlur = new EventEmitter<string>();

  @HostListener('click') click() {
    this.r.setAttribute(this.el.nativeElement, 'contentEditable', 'true');
    this.el.nativeElement.focus();
  }

  @HostListener('keydown.enter') onKeyPressEnter(){
    this.onBlur();
  }

  @HostListener('blur') onBlur() {
    this.r.removeAttribute(this.el.nativeElement, 'contentEditable');
    this.contentBlur.emit(this.el.nativeElement.innerText);
  }

  constructor(private el: ElementRef, private r: Renderer2) { }

}