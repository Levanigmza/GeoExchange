import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {
  private BOG_url = 'https://bankofgeorgia.ge/api/currencies/code/usd';
  private TBC_url = 'https://api.tbcbank.ge/v1/exchange-rates/commercial';
  private Valuto_url = 'https://valuto.ge/wp-json/rest-currency-list/v3/currencies';
  private Nbg_Url = 'https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies';

  private BestRates = 'https://analytics.metric.ge/api/currencies/top/';


  private CrystalUrl = 'https://crystal.ge/api/wi/rate/v1/cryst?key=52ef35743f3c4f5027d82f051c258241';

  constructor(private http: HttpClient) { }

  GetExchangeRatesBog(): Observable<any> {
    const url = `${this.BOG_url}`;
    return this.http.get<any>(url);
  }

  getExchangeRatesTbc(): Observable<any> {
    const headers = new HttpHeaders().set(
      'apikey',
      'J5TDduvxJxqbylk3FJZMc0PTXSATxATv'
    );
    const currencies = 'usd,eur,gbp,chf,try,azn,rur,amd';
    const url = `${this.TBC_url}?currency=${currencies}`;
    return this.http.get<any>(url, { headers });
  }


  GetExchangeRatesValuto(): Observable<any> {
    const url = `${this.Valuto_url}`;
    return this.http.get<any>(url);
  }

  getExchangeRatesNbg(): Observable<any> {
    const url = `${this.Nbg_Url}`;
    return this.http.get<any>(url);
  }


  getExchangeRatesCrystal(): Observable<any> {
    return this.http.get<any>(this.CrystalUrl);
  }

  getCurrencyBestRates(): Observable<any> {
    return this.http.get<any>(this.BestRates);
  }
}