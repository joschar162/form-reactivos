import { Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesPagesComponent } from './pages/switches-pages/switches-pages.component';

export const countryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Básicos - Formularios Reactivos',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'Dinámicos - Formularios Reactivos',
        component: DynamicPageComponent,
      },
      {
        path: 'switches',
        title: 'Switches - Formularios Reactivos',
        component: SwitchesPagesComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'basic',
  },
];
