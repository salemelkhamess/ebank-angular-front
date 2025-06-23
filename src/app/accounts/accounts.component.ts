import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountsService} from '../services/accounts.service';
import {AccountDetail} from '../model/account.model';
import {catchError, Observable, throwError} from 'rxjs';
import {AsyncPipe, DatePipe, DecimalPipe, NgClass, NgFor, NgIf} from '@angular/common';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    NgFor,
    DatePipe,
    NgClass
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent  implements OnInit{

  accountFormGroup! : FormGroup

  accountDetail!: Observable<AccountDetail>
  currentPage : number = 0;
  pageSize : number = 5;
  operationsFormGroup! : FormGroup
  errorMessage! : string
  constructor(private fb:FormBuilder , private accoutService : AccountsService , protected loginService : LoginService) {
  }
  ngOnInit(): void {

    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control('')
    })
    this.operationsFormGroup = this.fb.group({
      operationType :this.fb.control(null),
      operationAmount : this.fb.control(0),
      description : this.fb.control(null),
      accountDest : this.fb.control(null)
    })
  }

  hadleSearchAccount() {
    let accountId:string = this.accountFormGroup.value?.accountId;

    this.accountDetail = this.accoutService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
      catchError( err => {
        this.errorMessage = err.message
        return throwError(err);
      })
    )
  }

  geoToPage(page: number) {
    this.currentPage=page;
    this.hadleSearchAccount()

  }

  handleSaveOperation() {
    let  accountID = this.accountFormGroup.value.accountId;
    let  operationType = this.operationsFormGroup.value.operationType;
    let amount = this.operationsFormGroup.value.operationAmount;
    let desc = this.operationsFormGroup.value.description;
    let acoountDest = this.operationsFormGroup.value.accountDest;


    if (operationType =="DEBIT"){
      this.accoutService.debit(accountID,amount,desc).subscribe({
        next : value => {
          alert('le compte ' + accountID + "debiter avec le montant"+amount)
          this.operationsFormGroup.reset()

          this.hadleSearchAccount()
        },
        error: err => {
          alert(err)
        }
      })

    }else  if (operationType =="CREDIT"){

      this.accoutService.credit(accountID ,amount,desc).subscribe({
        next : value => {
          alert("Le compte"+accountID +" est crediter de " +amount)
          this.operationsFormGroup.reset()

          this.hadleSearchAccount()

        },
        error:err => {
          alert(err)
        }
      })

    }else if (operationType=="TRANSFER"){
      this.accoutService.transfer(accountID,amount,acoountDest).subscribe({
        next:value => {
          alert('le transfer de '+amount+ "du "+accountID+ "vers "+acoountDest+ "a ete effectuer avec succée")
          this.operationsFormGroup.reset()

          this.hadleSearchAccount()

        },
        error:err => {
          alert(err)
        }
      })
    }

  }

}
