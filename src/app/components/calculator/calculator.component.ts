import { Component, OnInit, Output } from '@angular/core';
import { Calculator } from 'src/app/Calculator';
import { LoanService } from 'src/app/services/loan.service';
import { Router } from '@angular/router'
import { Result } from 'src/app/Result';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],

})
export class CalculatorComponent implements OnInit {
  public result: Result = {}
  public errorResult: any = null
  constructor(private loanService: LoanService, private route: Router) { }

  ngOnInit(): void {
  }


  calculateLoan(loan: Calculator) {
    // console.log(loan)
    this.loanService.calculateLoan(loan).subscribe((result: Result) => {
      this.result = result
      this.errorResult = null
    }
      , error => {
        this.errorResult = error.error.fields[0].message
        this.result = {}
      })
  }

}
