import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgFloatingLabelComponent } from './ng-floating-label.component';

@NgModule({
  declarations: [NgFloatingLabelComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [NgFloatingLabelComponent]
})
export class NgFloatingLabelModule { }
