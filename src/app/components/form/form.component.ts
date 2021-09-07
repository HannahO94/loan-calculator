import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomvalidationService } from '../../services/customvalidation.service';
import { Calculator } from '../../Calculator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() onCalculateLoan: EventEmitter<Calculator> = new EventEmitter();
  monthlyIncome: number | null;
  requestedAmount: number | null;
  loanTerm: number | null;
  children: string;
  coapplicant: string;
  childrenOptions: any = ['NONE', 'SINGLE', 'MULTIPLE']
  coapplicantOptions: any = ['NONE', 'SINGLE_BORROWER', 'MULTIPLE_BORROWERS']
  myForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private customValidator: CustomvalidationService) {
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.myForm = this.fb.group({
      monthlyIncome: [null, Validators.compose([Validators.required, this.customValidator.patternValidator(), this.customValidator.incomeValidator()])],
      requestedAmount: [null, Validators.compose([Validators.required, this.customValidator.patternValidator(), this.customValidator.amountValidator()])],
      loanTerm: [null, Validators.compose([Validators.required, this.customValidator.patternValidator(), this.customValidator.termValidator()])],
      children: ['', [Validators.required]],
      coapplicant: ['', [Validators.required]],
    })
  }
  get getControl() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.valid) {
      const newLoan = this.myForm.value
      this.monthlyIncome = parseInt(this.myForm.value.monthlyIncome) * 1000
      this.requestedAmount = parseInt(this.myForm.value.requestedAmount) * 1000
      this.loanTerm = parseInt(this.myForm.value.loanTerm) * 12

      console.log(this.monthlyIncome)

      const payload = {
        monthlyIncome: this.monthlyIncome,
        requestedAmount: this.requestedAmount,
        loanTerm: this.loanTerm,
        children: this.myForm.value.children,
        coapplicant: this.myForm.value.coapplicant
      }

      this.onCalculateLoan.emit(payload);

    }
  }

}
