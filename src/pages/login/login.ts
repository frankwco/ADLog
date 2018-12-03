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
  static urlBase = "http://200.17.98.122:8080/avaliacaodesempenho/rest/service/"
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
    let autenticado = false;
    this.http.get(LoginPage.urlBase + "autenticar?email=" + this.usuario + "&senha=" + this.senha)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log("dasdd: " + data.status);
          if (data.id > 0) {
            this.storage.set('usuario', data);
            this.http.get(LoginPage.urlBase + "atividades")
              .map(res => res.json())
              .subscribe(
                data => {
                  this.storage.set('atividades', data);
                },
                error => {
                  console.log(error);
                  this.verificaConexaoInternet(error);
                });

            this.http.get(LoginPage.urlBase + "indicadores")
              .map(res => res.json())
              .subscribe(
                data => {
                  this.storage.set('indicadores', data);
                },
                error => {
                  console.log(error);
                  this.verificaConexaoInternet(error);
                });

            this.http.get(LoginPage.urlBase + "variaveis")
              .map(res => res.json())
              .subscribe(
                data => {
                  this.storage.set('variaveis', data);
                },
                error => {
                  console.log(error);
                  this.verificaConexaoInternet(error);
                });

            if (this.salvarSenha == true) {
              this.storage.set('salvarSenha', true);
            }
            this.navCtrl.setRoot(TabsPage);
          }
        },
        error => {
          console.log("Erro:: " + error.status);
          if (error.status == 401) {
            this.toastCtrl.create({
              message: 'Usuário ou Senha Incorretos',
              duration: 3000
            }).present();
          }
          this.verificaConexaoInternet(error);
        });

  }

  verificaConexaoInternet(error) {
    if (error.status == 404) {
      this.toastCtrl.create({
        message: 'Verifique a Conexão com a Internet',
        duration: 3000
      }).present();
    } else if (error.status == 0) {
      this.toastCtrl.create({
        message: 'Verifique a Conexão com a Internet',
        duration: 3000
      }).present();
    }
  }

}
