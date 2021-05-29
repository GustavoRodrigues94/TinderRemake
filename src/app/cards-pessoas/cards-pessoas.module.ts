import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CardsPessoasComponent } from './cards-pessoas.component';
@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [
    CardsPessoasComponent
  ],
  exports: [CardsPessoasComponent]
})
export class CardsPessoasComponentModule {}
