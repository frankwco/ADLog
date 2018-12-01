import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

import { Http } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario;
  senha;
  salvarSenha;
  urlBase = "http://localhost:8080/avaliacaodesempenho/rest/service/"
  constructor(public http: Http, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

    storage.get('salvarSenha').then((val) => {
      if (val == true) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  login() {
    if (this.usuario == "aaa" && this.senha == "gwh28") {

      this.http.get(this.urlBase + "atividades")
        .map(res => res.json())
        .subscribe(
          data => {
            this.storage.set('atividades', data);
          },
          error => {
            console.log(error);
          });

      this.http.get(this.urlBase + "indicadores")
        .map(res => res.json())
        .subscribe(
          data => {
            this.storage.set('indicadores', data);
          },
          error => {
            console.log(error);
          });

      if (this.salvarSenha == true) {
        this.storage.set('salvarSenha', true);
      }
      this.navCtrl.setRoot(TabsPage);
    } else {
      this.toastCtrl.create({
        message: 'Usuário ou Senha Incorretos',
        duration: 3000
      }).present();
    }
  }

}
