import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'airlineResWeb';
  constructor(private router: Router){
  }
  staffLogin(pageName: string): void{
    this.router.navigate([`${pageName}`]);
  }


}
