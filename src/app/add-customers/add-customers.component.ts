import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomerModel} from '../model/customer.model';
import {CustomerService} from '../services/customer.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-customers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-customers.component.html',
  styleUrl: './add-customers.component.css'
})
export class AddCustomersComponent implements OnInit{

  addCustomerFormGroup! : FormGroup
  constructor(private fb:FormBuilder ,private customerService :CustomerService , private router: Router) {  }
  ngOnInit(): void {
    this.addCustomerFormGroup = this.fb.group({
      name : this.fb.control(null,[Validators.required , Validators.minLength(4)]),
      email : this.fb.control(null,[Validators.required , Validators.email])
    })

  }

  handleSaveCustomer() {
    let  customer:CustomerModel = this.addCustomerFormGroup.value;
    this.customerService.addCustomer(customer).subscribe({
      next : value => {
        alert("Customer has been created successful")
        this.addCustomerFormGroup.reset();
        this.router.navigateByUrl("/admin/customers")
      },
      error : err => {
        alert("Faild  to create customer")

      }
    })

  }
}
