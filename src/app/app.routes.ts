import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BestsComponent } from './bests/bests.component';
import { CryptoComponent } from './crypto/crypto.component';

export const routes: Routes = [

    {path:'ExchangeRates', component:MainComponent},
    
    {path:'', component:BestsComponent},
    {path:'crypto', component:CryptoComponent}
];
