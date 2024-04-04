import { Component, Renderer2 } from '@angular/core';
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

  constructor(private router: Router, private renderer: Renderer2) {}

  Navigation_Currency() {
    this.router.navigate(['/ExchangeRates']);
    this.IsCurrencysActive = true;
    const btn = document.querySelector('.btn');
    if (this.IsCurrencysActive) {
      this.renderer.addClass(btn, 'active');
    } else {
      this.renderer.removeClass(btn, 'active');
    }
  }
  
    
  ngOnInit() {
    this.IsCurrencysActive  = false;

  }

  MainPAge(){
    this.router.navigate(['']);
    this.IsCurrencysActive  = false;
    const btn = document.querySelector('.btn');

    this.renderer.removeClass(btn, 'active');

  }
}
