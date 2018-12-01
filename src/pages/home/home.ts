import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CustoPage } from '../custo/custo';
import { QualidadePage } from '../qualidade/qualidade';
import { ProdutividadePage } from '../produtividade/produtividade';
import { TempoPage } from '../tempo/tempo';
import { OutrosPage } from '../outros/outros';
import { LoginPage } from '../login/login';


import { OcorrenciasPage } from '../ocorrencias/ocorrencias';

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

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.calcbar();
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

  chamarProdutividade() {
    this.navCtrl.push(ProdutividadePage);
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
