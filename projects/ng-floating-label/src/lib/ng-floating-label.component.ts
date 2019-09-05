import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'ng-floating-label',
  template: `
    <ng-container>
      <input
        [(ngModel)]="ngModel"
      />
    </ng-container>
  `,
  styles: []
})
export class NgFloatingLabelComponent implements OnInit {

  private elementRef: ElementRef;

  @ViewChild(NgModel, { static: true, read: ElementRef }) inputElementRef: ElementRef;

  constructor(element: ElementRef) { 
    this.elementRef = element;
  }

  ngOnInit() {
    const attributes = this.elementRef.nativeElement.attributes;
    const inputAttributes = this.inputElementRef.nativeElement.attributes;

    Array.from(attributes).forEach((attribute: any) => {
      if (attribute.name !== 'ngModel' && !inputAttributes.getNamedItemNS(attribute.namespaceURI, attribute.name)) {
        this.inputElementRef.nativeElement.setAttributeNS(attribute.namespaceURI, attribute.name, attribute.value);
        this.elementRef.nativeElement.removeAttributeNS(attribute.namespaceURI, attribute.name, attribute.value);
      }
    });
  }

}
