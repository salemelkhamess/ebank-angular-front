import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {CustomerService} from '../services/customer.service';
import {catchError, map, Observable, throwError} from 'rxjs';
import {CustomerModel} from '../model/customer.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements  OnInit{

  customers! :Observable<Array<CustomerModel>>
  errorMessage! : string
  searchFormGroup : FormGroup | undefined

  constructor(private customerService:CustomerService , private  fb : FormBuilder ,private router: Router) {
  }
  ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });


    this.handleSearchCustomer()
  }

  handleSearchCustomer() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    )

  }

  handeleDeleteCustomer(c:CustomerModel) {
    let conf = confirm("Are yo sur you want to delete this customer")
    if (!conf) return;
    this.customerService.deletCustomer(c.id).subscribe({
      next : value => {
        this.customers= this.customers.pipe(
          map(data=>{
            let index = data.indexOf(c)
            data.slice(index,1)
            return data
          })
        )
      },
      error : err => {
        alert(err)
      }
    })
  }

  handeleCustomerAccount(c: CustomerModel) {
    this.router.navigateByUrl("customer-accounts/"+c.id,{state : c})
  }
}
