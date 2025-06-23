import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerModel} from '../model/customer.model';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private  http:HttpClient) {

  }

  public  getCustomers () : Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(environment.apiUrl+"/customers/list");
  }

  public  searchCustomers (keyword:string) : Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(environment.apiUrl+"/customers/search?keyword="+keyword);
  }

  public addCustomer(customer :CustomerModel) : Observable<CustomerModel>{
    return this.http.post<CustomerModel>(environment.apiUrl+"/customers/save" ,customer)
  }

  public deletCustomer(id :number) {
     return this.http.delete(environment.apiUrl+"/customers/delet/"+id)
  }

}
