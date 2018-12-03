import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';



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
  ocorrenciasCadastradas;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {
    this.atividades = [];
    this.indicadores = [];
    this.ocorrenciasCadastradas = [];
    this.atividadeSelecionada = {};
    this.indicadorSelecionado = {};
    this.ocorrencia = {};
    this.ocorrencia.indicadorRelacionado = {};
    this.ocorrencia.atividade = {};

    this.storage.get('ocorrencias').then((val) => {
      if (val != null) {
        this.ocorrenciasCadastradas = val;
      }
    });

  }

  salvarOcorrencia() {
    let ocorrencias = [];
    this.storage.get('ocorrencias').then((val) => {
      ocorrencias = val;
      if (val == null) {
        ocorrencias = [];
      }
      this.ocorrencia.idTemporario = (ocorrencias.length + 1) + "" + new Date();
      ocorrencias.push(this.ocorrencia);
      this.storage.set('ocorrencias', ocorrencias);
      this.ocorrencia = {};
      this.ocorrencia.indicadorRelacionado = {};
      this.ocorrencia.atividade = {};
      this.sucesso();
    });

  }

  removerOcorrencia(idTemporario) {
    console.log("ID " + idTemporario);
    let alert = this.alertCtrl.create();
    alert.setTitle('Mensagem');
    alert.setMessage("Deseja Excluir a Ocorrência??");
    alert.addButton({
      text: 'Cancelar'
    });
    alert.addButton({
      text: 'Excluir',
      handler: data => {


        this.storage.get('ocorrencias').then((val) => {
          let ocorrencias = [];
          let ocorrenciasCadastradas = [];
          ocorrenciasCadastradas = val;
          if (val == null) {
            ocorrenciasCadastradas = [];
          }
          for (let x = 0; x < ocorrenciasCadastradas.length; x++) {
            if (ocorrenciasCadastradas[x].idTemporario != idTemporario) {
              ocorrencias.push(ocorrenciasCadastradas[x]);
            }
          }
          this.storage.set('ocorrencias', ocorrencias);
          this.ocorrencia = {};
          this.ocorrencia.indicadorRelacionado = {};
          this.ocorrencia.atividade = {};
          this.sucesso();
        });

      }
    });
    alert.present();
  }

  sucesso() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Feito');
    alert.setMessage("Operação realizada com sucesso!!");

    alert.addButton({
      text: 'Fechar',
      handler: data => {
        this.navCtrl.pop();
        //console.log('Checkbox data:', this.indicadorSelecionado);

      }
    });
    alert.present();
  }

  selecionarIndicador() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecionar Indicador');

    for (let x = 0; x < this.indicadores.length; x++) {
      alert.addInput({
        type: 'radio',
        label: this.indicadores[x].descricao,
        value: this.indicadores[x],
        checked: false
      });
    }
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Selecionar',
      handler: data => {
        if (data != null) {
          this.ocorrencia.indicadorRelacionado = data
        }
        //console.log('Checkbox data:', this.indicadorSelecionado);

      }
    });
    alert.present();
  }

  selecionarAtividade() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecionar Atividade');

    for (let x = 0; x < this.atividades.length; x++) {
      alert.addInput({
        type: 'radio',
        label: this.atividades[x].descricao,
        value: this.atividades[x],
        checked: false
      });
    }
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Selecionar',
      handler: data => {
        if (data != null) {
          this.ocorrencia.atividade = data;
          console.log('Checkbox data:', this.atividadeSelecionada);
        }

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
