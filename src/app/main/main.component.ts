import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../services/service_api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HttpClientModule, FormsModule,CommonModule],
  viewProviders: [Apiservice],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  loading: boolean = false; 

  BogData: any;
  TbcData: any;
  ValutoData: any;
  NbgData: any;

  selectedCurrency: string = '';

  currentDate: string = ' ';
  LastRefreshBog: string = ' ';
  LastRefreshTbc: string = ' ';
  LastRefreshTerra: string = ' ';
  LastRefreshCredo: string = ' ';
  LastRefreshValuto: string = ' ';

  UsdNbg_Rate: string = ' ';




  constructor(private exhangeRatesService: Apiservice) { }

  ngOnInit() {
    this.BogData = '';
    this.TbcData = '';
    this.NbgData = '';
    this.ValutoData='';


    this.LastRefreshBog = ' ';
    this.LastRefreshTbc = ' ';
    this.LastRefreshValuto = ' ';


    this.UsdNbg_Rate = ' ';


  }



  SearchData() {
    this.loading = true; 


    if (this.selectedCurrency === 'usd') {
      ///ოფიციალური
      this.exhangeRatesService.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'USD');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
          // Additional handling if needed
        }
      });



      /// tbc
      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'USD');
        if (this.BogData) {
          this.LastRefreshBog = this.getCurrentDate();
        }
      });

      /// bog
      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'USD');
          if (usdData) {
            this.LastRefreshTbc = this.getCurrentDate();
            this.TbcData = usdData;
          } else {
            console.error('USD data not found in response');
          }
        } else {
          console.error('Invalid response from TBC API');
        }
      });

      /// valuto
      this.exhangeRatesService.GetExchangeRatesValuto().subscribe(response => {
        const currencies = response.data.currencies;
        this.ValutoData = currencies['USDGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    } else if (this.selectedCurrency === 'eur') {

      ///ოფიციალური
      this.exhangeRatesService.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'EUR');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
          // Additional handling if needed
        }
      });

      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'EUR');
        this.LastRefreshBog = this.getCurrentDate();

      });
      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'EUR');
          if (usdData) {
            this.LastRefreshTbc = this.getCurrentDate();
            this.TbcData = usdData;
          } else {
            console.error('USD data not found in response');
          }
        } else {
          console.error('Invalid response from TBC API');
        }
      });

      /// valuto
      this.exhangeRatesService.GetExchangeRatesValuto().subscribe(response => {
        const currencies = response.data.currencies;
        this.ValutoData = currencies['EURGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });

    } else if (this.selectedCurrency === 'gbp') {

      ///ოფიციალური
      this.exhangeRatesService.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'GBP');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });

      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'GBP');
        this.LastRefreshBog = this.getCurrentDate();

      });
      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'GBP');
          if (usdData) {
            this.LastRefreshTbc = this.getCurrentDate();
            this.TbcData = usdData;

          } else {
            console.error('USD data not found in response');
          }
        } else {
          console.error('Invalid response from TBC API');
        }
      });

      /// valuto
      this.exhangeRatesService.GetExchangeRatesValuto().subscribe(response => {
        const currencies = response.data.currencies;
        this.ValutoData = currencies['GBPGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    } else {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData='';
  
  
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
  
  
      this.UsdNbg_Rate = ' ';
  
  
    }


    setTimeout(() => {
      this.loading = false; 
    }, 2000);
  }









  getCurrentDate(): string {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: string = String(today.getMonth() + 1).padStart(2, '0');
    const day: string = String(today.getDate()).padStart(2, '0');
    const hour: string = String(today.getHours()).padStart(2, '0');
    const minute: string = String(today.getMinutes()).padStart(2, '0');
    const second: string = String(today.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}


}
