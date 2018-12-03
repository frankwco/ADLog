import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LancamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html',
})
export class LancamentosPage {

  item;
  atividades;
  variaveis;
  lancamentosCadastrados;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {
    this.atividades = [];
    this.variaveis = [];
    this.item = {};
    this.item.atividade = {};
    this.item.grupoLancamento = {};

    this.storage.get('itens').then((val) => {
      if (val != null) {
        this.lancamentosCadastrados = val;
      }
    });
  }

  ionViewDidLoad() {
    this.storage.get('atividades').then((val) => {
      this.atividades = val;
    });

    this.storage.get('variaveis').then((val) => {
      this.variaveis = val;
    });
  }

  salvarLancamento() {
    let itens = [];
    this.storage.get('itens').then((val) => {
      itens = val;
      if (val == null) {
        itens = [];
      }
      this.item.idTemporario = (itens.length + 1) + "" + new Date();
      itens.push(this.item);
      this.storage.set('itens', itens);
      this.item = {};
      this.item.atividade = {};
      this.item.grupoLancamento = {};
      this.sucesso();
    });
  }

  removerLancamento(idTemporario) {
    console.log("ID " + idTemporario);
    let alert = this.alertCtrl.create();
    alert.setTitle('Mensagem');
    alert.setMessage("Deseja Excluir o Lançamento??");
    alert.addButton({
      text: 'Cancelar'
    });
    alert.addButton({
      text: 'Excluir',
      handler: data => {


        this.storage.get('itens').then((val) => {
          let itens = [];
          let itensCadastrados = [];
          itensCadastrados = val;
          if (val == null) {
            itensCadastrados = [];
          }
          for (let x = 0; x < itensCadastrados.length; x++) {
            if (itensCadastrados[x].idTemporario != idTemporario) {
              itens.push(itensCadastrados[x]);
            }
          }
          this.storage.set('itens', itens);
          this.item = {};
          this.item.atividade = {};
          this.item.grupoLancamento = {};
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
          this.item.atividade = data;
        }

      }
    });
    alert.present();
  }

  selecionarVariavel() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecionar Variável');

    for (let x = 0; x < this.variaveis.length; x++) {
      alert.addInput({
        type: 'radio',
        label: this.variaveis[x].descricao,
        value: this.variaveis[x],
        checked: false
      });
    }
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Selecionar',
      handler: data => {
        if (data != null) {
          this.item.grupoLancamento = data;
        }

      }
    });
    alert.present();
  }


}
