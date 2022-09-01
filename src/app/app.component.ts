import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: MenuItem[] = [
    {
      icon: PrimeIcons.HOME, routerLink: ['']
    },
    {
      label: "Biblioteca", icon: PrimeIcons.BOOK,
      items: 
        [
          { label: "Libros", icon: PrimeIcons.BOOKMARK, routerLink: ['libros'] },
          { label: "Autores", icon: PrimeIcons.USERS, routerLink: ['autores'] }
        ]
    }
  ];
}
