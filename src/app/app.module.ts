import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';



import { CustoPage } from '../pages/custo/custo';
import { QualidadePage } from '../pages/qualidade/qualidade';
import { ProdutividadePage } from '../pages/produtividade/produtividade';
import { TempoPage } from '../pages/tempo/tempo';
import { OutrosPage } from '../pages/outros/outros';
import { LoginPage } from '../pages/login/login';
import { OcorrenciasPage } from '../pages/ocorrencias/ocorrencias';
import { LancamentosPage } from '../pages/lancamentos/lancamentos';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CustoPage,
    QualidadePage,
    ProdutividadePage,
    TempoPage,
    OutrosPage,
    LoginPage,
    OcorrenciasPage,
    LancamentosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CustoPage,
    QualidadePage,
    ProdutividadePage,
    TempoPage,
    OutrosPage,
    LoginPage,
    OcorrenciasPage,
    LancamentosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
