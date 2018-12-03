import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CustoPage } from '../custo/custo';
import { QualidadePage } from '../qualidade/qualidade';
import { ProdutividadePage } from '../produtividade/produtividade';
import { TempoPage } from '../tempo/tempo';
import { OutrosPage } from '../outros/outros';
import { LoginPage } from '../login/login';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Http } from '@angular/http';


import { OcorrenciasPage } from '../ocorrencias/ocorrencias';
import { LancamentosPage } from '../lancamentos/lancamentos';
import { AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  barChartOptions: any = [{
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            fontSize: 10,
            colors: '#fff'
          }
        }
      ]
    }
  }];
  barChartLabels = [];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData: any;
  barChartColors: Array<any> = [
    {
      backgroundColor: '#3F51B5',
      borderColor: '#3F51B5',
      pointBackgroundColor: '#3F51B5',
      pointBorderColor: '#3F51B5',
      pointHoverBackgroundColor: '#3F51B5',
      pointHoverBorderColor: '#3F51B5',
      labels: '#3F51B5'
    }]

  doughnutChartLabels: string[];
  doughnutChartData: number[];
  doughnutChartType: string = 'doughnut';

  quantidadeRegistros = 0;
  urlBase = LoginPage.urlBase;

  constructor(public navCtrl: NavController, private storage: Storage, public http: Http, public alertCtrl: AlertController) {
    this.calcbar();
  }

  ionViewWillEnter() {
    this.quantidadeRegistros = 0;
    this.storage.get('ocorrencias').then((val) => {
      let ocorrencias = [];
      ocorrencias = val;
      if (ocorrencias != null) {
        this.quantidadeRegistros = this.quantidadeRegistros + ocorrencias.length;
      }
    });

    this.storage.get('itens').then((val) => {
      let itens = [];
      itens = val;
      if (itens != null) {
        this.quantidadeRegistros = this.quantidadeRegistros + itens.length;
      }
    });
  }

  desejaTransmitir() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Mensagem');
    alert.setMessage('Deseja Realmente Transmitir??');
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Transmitir',
      handler: data => {
        this.transmitir();
      }
    });
    alert.present();
  }

  sucesso(mensagem) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Mensagem');
    alert.setMessage(mensagem);

    alert.addButton({
      text: 'Fechar',
      handler: data => {
        //console.log('Checkbox data:', this.indicadorSelecionado);
      }
    });
    alert.present();
  }

  transmitir() {

    this.storage.get('ocorrencias').then((val) => {
      let ocorrencias = [];
      ocorrencias = val;
      if (ocorrencias != null) {
        this.http.post(this.urlBase + "inserirOcorrencia", ocorrencias).retry(2).map(res => res.json()).subscribe(
          data => {
            console.log(data);
            this.storage.remove('ocorrencias');
            this.ionViewWillEnter();
            this.sucesso("Ocorrências transmitidas com sucesso!!")


          }, error => {
            //alert(error);
            console.log(error);
            this.sucesso("Erro na transmissão dos dados!!");
          });

      }
    });

    this.storage.get('itens').then((val) => {
      let itens = [];
      itens = val;
      if (itens != null) {
        this.http.post(this.urlBase + "inserirLancamento", itens).retry(2).map(res => res.json()).subscribe(
          data => {
            console.log(data);
            this.storage.remove('itens');
            this.ionViewWillEnter();
            this.sucesso("Lançamentos transmitidos com sucesso!!")
          }, error => {
            //alert(error);
            console.log(error);
            this.sucesso("Erro na transmissão dos dados!!");
          });

      }
    });
  }

  sair() {
    this.storage.remove('salvarSenha');
    this.navCtrl.setRoot(LoginPage);
  }

  chamarCusto() {
    this.navCtrl.push(CustoPage);
  }

  chamarOcorrencias() {
    this.navCtrl.push(OcorrenciasPage);
  }

  chamarLancamentos() {
    this.navCtrl.push(LancamentosPage);
  }
  chamarQualidade() {
    this.navCtrl.push(QualidadePage);
  }
  chamarTempo() {
    this.navCtrl.push(TempoPage);
  }
  chamarOutros() {
    this.navCtrl.push(OutrosPage);
  }

  calc(tipo) {
    if (tipo === 'bar') {
      this.calcbar();
    } else {
      this.calcDoughnut();
    }
  }
  chartData = [
    { data: [3], label: 'Account A' },
    { data: [80], label: 'Account B' },
    { data: [2], label: 'Account C' },
    { data: [1], label: 'Account D' },
    { data: [2], label: 'Account E' },
    { data: [1], label: 'Account F' },
    { data: [4], label: 'Account G' }
  ];


  chartLabels = ['January'];
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

  calcbar() {
    this.barChartLabels = ['10/06/2018 à 20/06/2018'];
    this.barChartData = [
      { data: [4], label: 'Indicador a' },
      { data: [1], label: 'Indicador b', backgroundColor: 'rgba(112, 190, 78, 1)' },
      { data: [7], label: 'Indicador c' },
      { data: [6], label: 'Indicador d' },
      { data: [1], label: 'Indicador e' },
      { data: [6], label: 'Indicador f' },
      { data: [1], label: 'Indicador g' }
    ];
  }
  calcbarKK() {
    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];
  }

  calcDoughnut() {
    this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    this.doughnutChartData = [350, 450, 100];
  };

}
