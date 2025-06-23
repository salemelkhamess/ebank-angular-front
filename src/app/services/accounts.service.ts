import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetail} from '../model/account.model';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient ) { }


  public getAccount(accountID : string,page:number , size : number) :Observable<AccountDetail>{
    return this.http.get<AccountDetail>(environment.apiUrl+"/account/history/"+accountID+"/pages?page="+page+"&size="+size)
  }


  public debit(accountId :string , amount:string , description :string){
    let data = {accountID : accountId , amount:amount , description:description}
    return this.http.post(environment.apiUrl+"/account/debiter" , data);
  }

  public credit(accountId :string , amount:string , description :string){
    let data = {accountID : accountId , amount:amount , description:description}
    return this.http.post(environment.apiUrl+"/account/crediter" , data);
  }


  public transfer(accountSource :string , amount:string , accountDest :string){
    let data = {accountSource  , amount , accountDest}
    return this.http.post(environment.apiUrl+"/account/virement" , data);
  }

}
