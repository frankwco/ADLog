import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Http } from '@angular/http';

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
  urlBase = "http://192.168.0.13:8080/avaliacaodesempenho/rest/service/"
  processos;
  processosSelecionados;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http) {
    this.processos = [];
    this.processosSelecionados = [];
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

  formatarData(data) {
    var dateData = data.split('-');
    var year = dateData[0];
    var month = dateData[1];
    var day = dateData[2];
    return (day + "/" + month + "/" + year);
  }


  consultarDesempenho() {
    let pro = "";
    for (let x = 0; x < this.processosSelecionados.length; x++) {
      console.log("processo: " + this.processosSelecionados[x])
      if (pro.length > 0) {
        pro += ";" + this.processosSelecionados[x];
      } else {
        pro += this.processosSelecionados[x];
      }
    }
    //pro = pro.trim();
    //pro = pro.replaceAll(" ", ";");
    let indicadores = [];
    let url = this.urlBase + "indicadoresDataProcesso?categoria=Custo&dataInicial=" + this.formatarData(this.event.dataInicial) + "&dataFinal=" + this.formatarData(this.event.dataFinal) + "&processos=" + pro;
    //let url = "http://localhost:8080/avaliacaodesempenho/rest/service/indicadoresDataProcesso?categoria=Custo&dataInicial=01/08/2018&dataFinal=20/08/2018&processos=1;2;3;4;5;6;7;8";
    console.log("URL: " + url);

    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          indicadores = data;
          console.log(data);
          this.chartLabels[0] = this.formatarData(this.event.dataInicial) + " à " + this.formatarData(this.event.dataFinal);
          //this.chartLabels[0] = "sss";

          this.chartData = [];
          for (let x = 0; x < indicadores.length; x++) {
            this.chartData.push({ data: [indicadores[x].valorFinal], label: indicadores[x].descricao });
          }
        },
        error => {
          console.log(error);
        });
  }

  selecionarProcessos() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecionar Processos');

    for (let x = 0; x < this.processos.length; x++) {
      console.log("AQui " + x)
      alert.addInput({
        type: 'checkbox',
        label: this.processos[x].descricao,
        value: this.processos[x].id,
        checked: true
      });
    }
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Selecionar',
      handler: data => {
        this.processosSelecionados = data;
        console.log('Checkbox data:', this.processosSelecionados);

      }
    });
    alert.present();
  }


}
