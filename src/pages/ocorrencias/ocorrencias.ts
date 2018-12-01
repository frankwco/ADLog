import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OcorrenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocorrencias',
  templateUrl: 'ocorrencias.html',
})
export class OcorrenciasPage {

  ocorrencia;
  atividades;
  indicadores;
  indicadorSelecionado;
  atividadeSelecionada;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {
    this.atividades = [];
    this.indicadores = [];
  }

  salvarOcorrencia() {

  }

  selecionarIndicador() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecionar Indicador');

    for (let x = 0; x < this.indicadores.length; x++) {
      console.log("AQui " + x)
      alert.addInput({
        type: 'radio',
        label: this.indicadores[x].descricao,
        value: this.indicadores[x].id,
        checked: false
      });
    }
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Selecionar',
      handler: data => {
        this.indicadorSelecionado = data;
        console.log('Checkbox data:', this.indicadorSelecionado);

      }
    });
    alert.present();
  }

  selecionarAtividade() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecionar Atividade');

    for (let x = 0; x < this.atividades.length; x++) {
      console.log("AQui " + x)
      alert.addInput({
        type: 'radio',
        label: this.atividades[x].descricao,
        value: this.atividades[x].id,
        checked: false
      });
    }
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Selecionar',
      handler: data => {
        this.atividadeSelecionada = data;
        console.log('Checkbox data:', this.atividadeSelecionada);

      }
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.storage.get('atividades').then((val) => {
      this.atividades = val;
    });

    this.storage.get('indicadores').then((val) => {
      this.indicadores = val;
    });
  }

}
