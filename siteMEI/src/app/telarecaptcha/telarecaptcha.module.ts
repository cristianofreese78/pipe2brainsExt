import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TelarecaptchaRoutingModule } from './telarecaptcha-routing.module';
import { TelarecaptchaComponent } from './telarecaptcha.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'


@NgModule({
  declarations: [
    TelarecaptchaComponent
  ],
  imports: [
    TelarecaptchaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ]
})
export class TelarecaptchaModule { }
