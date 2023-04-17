import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataPipe } from './datapipe';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [
    CadastroComponent,
    DataPipe
  ],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CurrencyMaskModule
  ],
  providers: [
    provideNgxMask()
  ]
})
export class CadastroModule { }