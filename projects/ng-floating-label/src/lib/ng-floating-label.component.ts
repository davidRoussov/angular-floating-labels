import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

const FLOATING_LABEL_FONT_SIZE_RATIO: Readonly<number> = 0.6;

@Component({
  selector: 'ng-floating-label',
  template: `
    <div>
      <input
        [(ngModel)]="ngModel"
        [ngClass]="{'input-float': inputElementRef.nativeElement.value.length > 0}"
        [style.paddingTop]="getInputPaddingTop()"
      />
      <span 
        [ngClass]="{'span-float': inputElementRef.nativeElement.value.length > 0}"
        [style.fontSize]="getLabelFontSize()"
        [style.paddingLeft]="getLabelPadding()"
        [style.top]="getLabelTop()"
      >{{ placeholder }}</span>
    </div>
  `,
  styles: [`
    div {
      position: relative;
    }
    span {
      position: absolute;
      transition: 0.25s ease-in-out;
      color: #98a6ad;
    }
    .span-float {
    }
    input {
      min-height: 50px;
    }
    .input-float {
      padding-bottom: 5px;
    }
  `]
})
export class NgFloatingLabelComponent implements OnInit {

  private elementRef: ElementRef;

  @ViewChild(NgModel, { static: true, read: ElementRef }) inputElementRef: ElementRef;

  public placeholder: string = '';

  constructor(element: ElementRef) { 
    this.elementRef = element;
  }

  ngOnInit() {
    const attributes = this.elementRef.nativeElement.attributes;
    const inputAttributes = this.inputElementRef.nativeElement.attributes;

    Array.from(attributes).forEach((attribute: any) => {

      if (attribute.name === 'placeholder') {
        this.placeholder = attribute.value;
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
      return '5px';
    } else {
      const fontSize = Number(styles.getPropertyValue('font-size').split('px').join(''));
      const labelTop = `calc(50% - ${3 * fontSize / 4}px)`;
      console.log('labelTop', labelTop);

      return labelTop;
    }
  }

  getInputPaddingTop() {
    const styles = window.getComputedStyle(this.inputElementRef.nativeElement);

    if (this.inputElementRef.nativeElement.value.length > 0) {
      const height = Number(styles.getPropertyValue('height').split('px').join(''));
      const fontSize = Number(styles.getPropertyValue('font-size').split('px').join(''));
      const paddingTop = height - 5 - fontSize;

      return `${paddingTop}px`;
    } else {
      return 'inherit';
    }
  }
}
