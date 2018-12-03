import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Http } from '@angular/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CustoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-custo',
  templateUrl: 'custo.html',
})
export class CustoPage {
  urlBase = LoginPage.urlBase;
  processos;
  processosSelecionados;
  indicadores;
  indicadorSelecionado;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http) {
    this.processos = [];
    this.processosSelecionados = [];
    this.indicadorSelecionado = {};
  }

  public event = {
    dataInicial: new Date(),
    timeStarts: '07:43',
    dataFinal: new Date()
  }

  public chartData = [
    { data: [0], label: '' },
    { data: [0], label: '' }

  ];


  chartLabels = [''];
  chartOptions = {
    responsive: true, scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            fontSize: 10,
            colors: '#fff',
            min: 0
          }
        }
      ]
    }
  };

  buscarProcessos() {
    this.http.get(this.urlBase + "processos")
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.processos = data;
          this.selecionarProcessos();
        },
        error => {
          console.log(error);
        });
  }

  buscarIndicadores() {
    this.http.get(this.urlBase + "indicadores")
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.indicadores = data;
          this.selecionarIndicadores();
        },
        error => {
          console.log(error);
        });
  }


  formatarData(datas) {
    var dateData = datas.split('-');
    var year = dateData[0];
    var month = dateData[1];
    var day = dateData[2];
    return (day + "/" + month + "/" + year);
  }

  formatarDataMes(datas) {
    var dateData = datas.split('-');
    var year = dateData[0];
    var month = dateData[1];
    return month;
  }

  formatarDataAno(datas) {
    var dateData = datas.split('-');
    var year = dateData[0];
    var month = dateData[1];
    return year;
  }


  consultarDesempenho() {
    let pro = "";
    for (let x = 0; x < this.processosSelecionados.length; x++) {
      console.log("processo: " + this.processosSelecionados[x])
      if (pro.length > 0) {
        pro += ";" + this.processosSelecionados[x].id;
      } else {
        pro += this.processosSelecionados[x].id;
      }
    }
    //pro = pro.trim();
    //pro = pro.replaceAll(" ", ";");
    let indicadores = [];
    let url = this.urlBase + "indicadoresDataProcesso?categoria=Custo&mes=" + this.formatarDataMes(this.event.dataInicial) + "&ano=" + this.formatarDataAno(this.event.dataInicial) + "&processos=" + pro + "&indicador=" + this.indicadorSelecionado.id;
    //let url = this.urlBase + "indicadoresDataProcesso?categoria=Custo&mes=" + "09" + "&ano=" + "2018" + "&processos=" + pro;
    //let url = "http://localhost:8080/avaliacaodesempenho/rest/service/indicadoresDataProcesso?categoria=Custo&dataInicial=01/08/2018&dataFinal=20/08/2018&processos=1;2;3;4;5;6;7;8";
    console.log("URL: " + url);

    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          indicadores = data;
          //console.log(JSON.parse(data.body));
          //this.chartLabels[0] = this.formatarDataMes(this.event.dataInicial) + "/" + this.formatarDataAno(this.event.dataInicial);
          this.chartLabels[0] = "09/2018";
          //this.chartLabels[0] = "sss";

          this.chartData = [
            { data: [indicadores[0].valorFinal], label: indicadores[0].descricao },
            { data: [indicadores[0].meta03], label: 'Meta' }

          ];
          //for (let x = 0; x < indicadores.length; x++) {
          //console.log("Indicador: " + indicadores[x].valorFinal);
          //let indd = { data: [indicadores[x].valorFinal], label: indicadores[x].descricao };
          //this.chartData[0].data = indicadores[0].valorFinal;
          //this.chartData[0].label = indicadores[0].descricao;
          //this.chartData.push(indd);

          //this.chartData[1].data = indicadores[0].meta03;
          //this.chartData[1].label = "Meta"

          //}


        },
        error => {
          console.log(error);
        });
  }

  selecionarProcessos() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecionar Processos');

    for (let x = 0; x < this.processos.length; x++) {
      //console.log("AQui " + x)
      alert.addInput({
        type: 'checkbox',
        label: this.processos[x].descricao,
        value: this.processos[x],
        checked: false
      });
    }
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Selecionar',
      handler: data => {
        if (data != null) {
          this.processosSelecionados = data;
        }

      }
    });
    alert.present();
  }

  selecionarIndicadores() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecionar Indicador');

    for (let x = 0; x < this.indicadores.length; x++) {
      //console.log("AQui " + x)
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
          this.indicadorSelecionado = data;
        }

      }
    });
    alert.present();
  }


}
