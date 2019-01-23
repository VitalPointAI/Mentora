import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttestationComponent} from './attestation-interface/attestation-interface.component';
import {UtilModule} from '../util/util.module';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule, 
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    UtilModule
  ],
  declarations: [AttestationComponent],
  exports: [AttestationComponent]
})
export class AttestationModule {
}
