import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../services/service_api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  viewProviders: [Apiservice],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  loading: boolean = false;
  multiplication_1 : boolean = true;
  multiplication_100 :boolean =false;
  multiplication_1000 :boolean =false;


  BogData: any;
  TbcData: any;
  ValutoData: any;
  NbgData: any;
  CrystalData:any

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
    this.LastRefreshBog = ' ';
    this.LastRefreshTbc = ' ';
    this.multiplication_1 = true;
    this.multiplication_100= false;
    this.multiplication_1000= false;

  }



  SearchData() {
    this.loading = true;


    if (this.selectedCurrency === 'USD') {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
      this.UsdNbg_Rate = ' ';
      this.multiplication_1 = true;
      this.multiplication_100= false;
      this.multiplication_1000= false;

      ///ოფიციალური
      this.exhangeRatesService.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'USD');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
          // Additional handling if needed
        }
      });



      /// bog
      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'USD');
        if (this.BogData) {
          this.LastRefreshBog = this.getCurrentDate();
        }
      });

      //tbc
      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'USD');
          if (usdData) {
            this.TbcData = usdData;
            this.LastRefreshTbc = this.getCurrentDate();

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

      //// crystal 
      this.exhangeRatesService.getExchangeRatesCrystal().subscribe(response => {
        if (response && response.success && response.data) {
          const currencyRates = JSON.parse(response.data);
          const usdData = currencyRates.CurrencyRate.find((rate: any) => rate.ISO === 'USD');
          if (usdData) {
            this.CrystalData = usdData;
          }
        }
      });


    }

    else if (this.selectedCurrency === 'EUR') {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
      this.UsdNbg_Rate = ' ';
      this.multiplication_1 = true;
      this.multiplication_100= false;
      this.multiplication_1000= false;

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
            this.TbcData = usdData;
            this.LastRefreshTbc = this.getCurrentDate();

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

    } else if (this.selectedCurrency === 'GBP') {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
      this.UsdNbg_Rate = ' ';
      this.multiplication_1 = true;
      this.multiplication_100= false;
      this.multiplication_1000= false;

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


    } else if (this.selectedCurrency === 'CHF') {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
      this.UsdNbg_Rate = ' ';
      this.multiplication_1 = true;
      this.multiplication_100= false;
      this.multiplication_1000= false;

      ///ოფიციალური
      this.exhangeRatesService.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'CHF');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });

      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'CHF');
        this.LastRefreshBog = this.getCurrentDate();

      });
      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'CHF');
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
        this.ValutoData = currencies['CHFGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    } 
    else if (this.selectedCurrency === 'TRY') {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
      this.UsdNbg_Rate = ' ';
      this.multiplication_1 = true;
      this.multiplication_100= false;
      this.multiplication_1000= false;


      ///ოფიციალური
      this.exhangeRatesService.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'TRY');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });

      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'TRY');
        this.LastRefreshBog = this.getCurrentDate();

      });
      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'TRY');
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
        this.ValutoData = currencies['TRYGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    } 

    else if (this.selectedCurrency === 'AZN') {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
      this.UsdNbg_Rate = ' ';
      this.multiplication_1 = true;
      this.multiplication_100= false;
      this.multiplication_1000= false;


      ///ოფიციალური
      this.exhangeRatesService.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'AZN');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });

      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'AZN');
        this.LastRefreshBog = this.getCurrentDate();

      });
      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'AZN');
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
        this.ValutoData = currencies['AZNGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    } 
    else if (this.selectedCurrency === 'RUR') {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
      this.UsdNbg_Rate = ' ';

      this.multiplication_1 = false;
      this.multiplication_100= true;
      this.multiplication_1000= false;

      ///ოფიციალური
      this.exhangeRatesService.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'RUB');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });



      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'RUR');
        this.LastRefreshBog = this.getCurrentDate();

      });


      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'RUR');
          if (usdData) {
            this.LastRefreshTbc = this.getCurrentDate();
            parseInt(usdData.sell)*100;
            this.TbcData = usdData


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
        this.ValutoData = currencies['RURGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    } 
    else if (this.selectedCurrency === 'AMD') {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
      this.UsdNbg_Rate = ' ';
      this.multiplication_1 = false;
      this.multiplication_100= false;
      this.multiplication_1000= true;

      ///ოფიციალური
      this.exhangeRatesService.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'AMD');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });



      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'AMD');
        this.LastRefreshBog = this.getCurrentDate();

      });


      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'AMD');
          if (usdData) {
            this.LastRefreshTbc = this.getCurrentDate();
            parseInt(usdData.sell)*100;
            this.TbcData = usdData


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
        this.ValutoData = currencies['AMDGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    } 



    
    
    else {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';


      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';

      this.multiplication_1 = true;
      this.multiplication_100= false;
      this.multiplication_1000= false;


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
