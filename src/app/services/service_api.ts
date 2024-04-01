import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {
    private BOG_url = 'https://bankofgeorgia.ge/api/currencies/code/usd';
    private TBC_url = 'https://api.tbcbank.ge/v1/exchange-rates/commercial';


    constructor(private http: HttpClient) {}
  
    GetExchangeRatesBog(): Observable<any> {
      const url = `${this.BOG_url}`;
      return this.http.get<any>(url);
    }

    getExchangeRatesTbc(): Observable<any> {
        const headers = new HttpHeaders().set(
          'apikey',
          'J5TDduvxJxqbylk3FJZMc0PTXSATxATv'
        );
        const currencies = 'usd,eur,gbp';
        const url = `${this.TBC_url}?currency=${currencies}`;
        return this.http.get<any>(url, { headers });
      }

}