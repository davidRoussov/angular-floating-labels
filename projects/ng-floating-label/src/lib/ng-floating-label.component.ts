import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'ng-floating-label',
  template: `
    <ng-container>
      <div>
        <input
          [(ngModel)]="ngModel"
          required
          [ngClass]="{'input-float': inputElementRef.nativeElement.value.length > 0}"
        />
        <span 
          [ngClass]="{'span-float': inputElementRef.nativeElement.value.length > 0}"
          [style.paddingLeft]="getLabelPadding()"
        >{{ placeholder }}</span>
      </div>
    </ng-container>
  `,
  styles: [`
    div {
      position: relative;
    }
    span {
      position: absolute;
      top: 25%;
      transition: 0.25s ease-in-out;
      color: #98a6ad;
    }
    .span-float {
      top: 5px;
      font-size: 12.5px;
    }
    input {
      height: 50px;
      font-size: 20px;
    }
    .input-float {
      padding-top: 25px;
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
}
