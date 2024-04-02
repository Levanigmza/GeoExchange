import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../services/service_api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  viewProviders: [Apiservice],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  BogData: any;
  TbcData : any;


  selectedCurrency: string = '';

   currentDate :string =' ';
   LastRefreshBog :string =' ';
   LastRefreshTbc :string =' ';
   LastRefreshTerra :string =' ';
   LastRefreshCredo :string =' ';




  constructor(private exhangeRatesService: Apiservice) { }

  ngOnInit() {

  }



  SearchData() {
    if (this.selectedCurrency === 'usd') {
      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'USD');
        if(this.BogData){
          this.LastRefreshBog= this.getCurrentDate();
        }
      });

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

    } else if (this.selectedCurrency === 'eur') {
      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'EUR');
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

    } else if (this.selectedCurrency === 'gbp') {
      this.exhangeRatesService.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'GBP');
      });
      this.exhangeRatesService.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'GBP');
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
    } else {
      this.BogData = '';
      this.TbcData = '';
      this.LastRefreshBog  =' ';
      this.LastRefreshTbc =' ';
    }
  }










   getCurrentDate(): string {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: string = String(today.getMonth() + 1).padStart(2, '0');
    const day: string = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  

}


}
