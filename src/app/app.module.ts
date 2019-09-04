import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgFloatingLabelModule } from '../../projects/ng-floating-label/src/lib/ng-floating-label.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgFloatingLabelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
