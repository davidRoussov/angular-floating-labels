import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

const FLOATING_LABEL_FONT_SIZE_RATIO: Readonly<number> = 0.8;
const FLOATING_LABEL_PADDING: Readonly<number> = 5;

@Component({
  selector: 'ng-floating-label',
  template: `
    <div>
      <input
        [(ngModel)]="ngModel"
        [style.paddingTop]="getInputPaddingBottom()"
        [style.paddingTop]="getInputPaddingTop()"
      />
      <span 
        [style.fontSize]="getLabelFontSize()"
        [style.paddingLeft]="getLabelPadding()"
        [style.top]="getLabelTop()"
        [style.color]="getLabelColor()"
      >{{ labelText }}</span>
    </div>
  `,
  styles: [`
    div {
      position: relative;
    }
    span {
      position: absolute;
      left: 0;
      transition: 0.25s ease-in-out;
      -webkit-user-select: none;
         -moz-user-select: none;
              user-select: none; 
      pointer-events: none;
    }
    input {
      min-height: 3em;
    }
  `]
})
export class NgFloatingLabelComponent implements OnInit {

  private elementRef: ElementRef;

  @ViewChild(NgModel, { static: true, read: ElementRef }) inputElementRef: ElementRef;

  public labelText: string = '';
  public ngModel;

  constructor(element: ElementRef) { 
    this.elementRef = element;
  }

  ngOnInit() {
    const attributes = this.elementRef.nativeElement.attributes;
    const inputAttributes = this.inputElementRef.nativeElement.attributes;

    Array.from(attributes).forEach((attribute: any) => {

      if (attribute.name === 'placeholder') {
        this.labelText = attribute.value;
      }

      if (attribute.name !== 'placeholder' && !inputAttributes.getNamedItemNS(attribute.namespaceURI, attribute.name)) {
        this.inputElementRef.nativeElement.setAttributeNS(attribute.namespaceURI, attribute.name, attribute.value);
        this.elementRef.nativeElement.removeAttributeNS(attribute.namespaceURI, attribute.name, attribute.value);
      }
    });
  }

  getLabelPadding() {
    const styles = window.getComputedStyle(this.inputElementRef.nativeElement);
    const padding = styles.getPropertyValue('padding-left');
    return padding;
  }

  getLabelFontSize() {
    const styles = window.getComputedStyle(this.inputElementRef.nativeElement);

    if (this.inputElementRef.nativeElement.value.length > 0) {
      const fontSize = Number(styles.getPropertyValue('font-size').split('px').join(''));
      const newFontSize =  `${fontSize * FLOATING_LABEL_FONT_SIZE_RATIO}px`;
      return newFontSize;
    } else {
      return styles.getPropertyValue('font-size');
    }
  }

  getLabelTop() {
    const styles = window.getComputedStyle(this.inputElementRef.nativeElement);
    
    if (this.inputElementRef.nativeElement.value.length > 0) {
      return `${FLOATING_LABEL_PADDING}px`;
    } else {
      const fontSize = Number(styles.getPropertyValue('font-size').split('px').join(''));
      const labelTop = `calc(50% - ${3 * fontSize / 4}px)`;

      return labelTop;
    }
  }

  getInputPaddingTop() {
    const styles = window.getComputedStyle(this.inputElementRef.nativeElement);

    if (this.inputElementRef.nativeElement.value.length > 0) {
      const height = Number(styles.getPropertyValue('height').split('px').join(''));
      const fontSize = Number(styles.getPropertyValue('font-size').split('px').join(''));
      const paddingTop = height - FLOATING_LABEL_PADDING - fontSize;

      return `${paddingTop}px`;
    } else {
      return 'inherit';
    }
  }

  getInputPaddingBottom() {
    const styles = window.getComputedStyle(this.inputElementRef.nativeElement);

    if (this.inputElementRef.nativeElement.value.length > 0) {
      return `${FLOATING_LABEL_PADDING}px`;
    } else {
      return 'inherit';
    }
  }

  getLabelColor() {
    return window.getComputedStyle(this.inputElementRef.nativeElement, '::placeholder').color;
  }
}
