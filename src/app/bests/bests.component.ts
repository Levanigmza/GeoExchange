import { Component } from '@angular/core';
import { Apiservice } from '../services/service_api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-bests',
  standalone: true,
  imports: [HttpClientModule,FormsModule, CommonModule],
  viewProviders: [Apiservice],

  templateUrl: './bests.component.html',
  styleUrl: './bests.component.css'
})
export class BestsComponent {
  currencyData: any[] | undefined;

  constructor(private exhangeRatesService: Apiservice) {}

  ngOnInit(): void {
    this.exhangeRatesService.getCurrencyBestRates().subscribe(
      data => {
        this.currencyData = data.tableCurrency;
      },
      error => {
        console.error('Error fetching currency data:', error);
      }
    );
  }
}
