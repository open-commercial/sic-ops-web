import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuOpened = false;
  rol = Rol;
  constructor(private router: Router,
              private authService: AuthService) { 
  }

  ngOnInit() {
    this.redirectBasedOnRole();
  }

    toggleMenu() {
    this.menuOpened = !this.menuOpened;
    const elems = document.getElementsByClassName('ops-web-app');
    const appElement = elems.item(0);
    if (this.menuOpened && appElement) {
      appElement.classList.add('menu-opened');
    } else {
      appElement.classList.remove('menu-opened');
    }
  }
  
  redirectBasedOnRole() {
    if (this.authService.userHasAnyOfTheseRoles ([Rol.ADMINISTRADOR]))  {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/pedidos']);
    }
  }
}
