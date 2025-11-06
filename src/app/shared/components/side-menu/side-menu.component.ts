import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import authRoutes from '../../../auth/auth.routes';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveRoute = reactiveRoutes[0].children ?? [];
@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveRoute
    .filter((item) => item.path !== '**')
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Register',
      route: './auth',
    },
  ];
  countryMenu: MenuItem[] = [
    {
      title: 'países',
      route: './country',
    },
  ];
}
