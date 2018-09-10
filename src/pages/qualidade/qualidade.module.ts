import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QualidadePage } from './qualidade';

@NgModule({
  declarations: [
    QualidadePage,
  ],
  imports: [
    IonicPageModule.forChild(QualidadePage),
  ],
})
export class QualidadePageModule {}
