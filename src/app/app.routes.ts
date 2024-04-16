import { Routes } from '@angular/router';

import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [

    {path: '', component: CountryListComponent},
    { path: 'home', component: CountryListComponent, canActivate: [AuthGuard] },
    { path: 'country-details/:code', component: CountryDetailsComponent,},
    { path: 'login', component: LoginComponent }
];
