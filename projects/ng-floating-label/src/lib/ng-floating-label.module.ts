import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgFloatingLabelComponent } from './ng-floating-label.component';

@NgModule({
  declarations: [NgFloatingLabelComponent],
  imports: [
    FormsModule
  ],
  exports: [NgFloatingLabelComponent]
})
export class NgFloatingLabelModule { }
