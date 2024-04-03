import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common'; 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  IsCurrencysActive: boolean = false;

  constructor(private router: Router) {}

  Navigation_Currency() {
    this.router.navigate(['/ExchangeRates']);
    this.IsCurrencysActive  = true;
  }
    
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.IsCurrencysActive = event.url === '/ExchangeRates';
      }
    });
  }
}