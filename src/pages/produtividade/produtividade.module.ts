import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutividadePage } from './produtividade';

@NgModule({
  declarations: [
    ProdutividadePage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutividadePage),
  ],
})
export class ProdutividadePageModule {}
