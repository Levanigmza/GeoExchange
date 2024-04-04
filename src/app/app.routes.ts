import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BestsComponent } from './bests/bests.component';


export const routes: Routes = [

    {path:'ExchangeRates', component:MainComponent},
    
    {path:'', component:BestsComponent}
];
