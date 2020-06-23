import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[digitOnly]',
})
export class DigitOnlyDirective implements OnChanges {
  private hasDecimalPoint = false;
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];

  @Input() min = -Infinity;
  @Input() max = Infinity;
  @Input() pattern?: string | RegExp;
  private regex: RegExp;
  inputElement: HTMLInputElement;

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pattern) {
      this.regex = this.pattern ? RegExp(this.pattern) : null;
    }

    if (changes.min) {
      const maybeMin = Number(this.min);
      this.min = isNaN(maybeMin) ? -Infinity : maybeMin;
    }

    if (changes.max) {
      const maybeMax = Number(this.max);
      this.max = isNaN(maybeMax) ? Infinity : maybeMax;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }

    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }

    // check the input pattern RegExp
    if (this.regex) {
      const newValue = this.forecastValue(e.key);
      if (!this.regex.test(newValue)) {
        e.preventDefault();
      }
    }

    const newValue = Number(this.forecastValue(e.key));

    if (newValue > this.max || newValue < this.min) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedInput: string = event.clipboardData.getData('text/plain');
    this.pasteData(pastedInput);
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    const textData = event.dataTransfer.getData('text');
    this.inputElement.focus();
    this.pasteData(textData);
    event.preventDefault();
  }

  private pasteData(pastedContent: string): void {
    const sanitizedContent = this.sanitizeInput(pastedContent);
    const pasted = document.execCommand('insertText', false, sanitizedContent);
    if (!pasted) {
      const { selectionStart: start, selectionEnd: end } = this.inputElement;
      this.inputElement.setRangeText(sanitizedContent, start, end, 'end');
    }
  }

  private sanitizeInput(input: string): string {
    let result = '';

    const maxLength = this.inputElement.maxLength;
    if (maxLength > 0) {
      // the input element has maxLength limit
      const allowedLength = maxLength - this.inputElement.value.length;
      result = allowedLength > 0 ? result.substring(0, allowedLength) : '';
    }
    return result;
  }

  private forecastValue(key: string): string {
    const selectionStart = this.inputElement.selectionStart;
    const selectionEnd = this.inputElement.selectionEnd;
    const oldValue = this.inputElement.value ? this.inputElement.value : this.inputElement.innerHTML ;
    const selection = oldValue.substring(selectionStart, selectionEnd);
    return selection
      ? oldValue.replace(selection, key)
      : oldValue.substring(0, selectionStart) +
          key +
          oldValue.substring(selectionStart);
  }
}