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
        />
        <span [ngClass]="{'float': inputElementRef.nativeElement.value.length > 0}">{{ placeholder }}</span>
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
      left: 1%;
    }
    .float {
      top: 0%;
      font-size: 8px;
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
}
