import { Routes } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {AddCustomersComponent} from './add-customers/add-customers.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';
import {LoginComponent} from './login/login.component';
import {AdminTemplateComponent} from './admin-template/admin-template.component';
import {authentificationGuard} from './guards/authentification.guard';
import {authorizationGuard} from './guards/authorization.guard';
import {NotAthoriezdComponent} from './not-athoriezd/not-athoriezd.component';

export const routes: Routes = [

  {path : "admin" , component:AdminTemplateComponent  , canActivate : [authentificationGuard] ,  children : [
      {path : "customers" , component:CustomersComponent},
      {path : "accounts" , component:AccountsComponent},
      {path : "add-customer" , component:AddCustomersComponent , canActivate : [authorizationGuard] , data : {roles : "ADMIN"}},
      {path : "customer-accounts/:id" , component:CustomerAccountsComponent},
      {path : "not-authorized" , component:NotAthoriezdComponent},

    ]},

  {path : "login" , component:LoginComponent},
  {path : "" , redirectTo : "/login" , pathMatch : "full"},





];
