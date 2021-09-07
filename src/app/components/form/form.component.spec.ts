import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailValidator, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormComponent } from './form.component';

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    // de = fixture.debugElement;
    fixture.detectChanges();
  });

  it(`Should create`, () => {
    expect(component).toBeTruthy();
  });

  it("Input field for monthly income", () => {
    expect("input #monthlyIncome").toBeTruthy()
  })

  it("Input field for monthly income", () => {
    let monthlyIncomeInput = component.myForm.controls['monthlyIncome']

    expect(monthlyIncomeInput.valid).toBeFalsy()
    expect(monthlyIncomeInput.pristine).toBeTruthy()
    expect(monthlyIncomeInput.errors['required']).toBeTruthy()

    monthlyIncomeInput.setValue(50)

    expect(monthlyIncomeInput.errors['toSmall']).toBeTruthy()
  });

  it("check that the monthly income input is valid", () => {
    let monthlyIncomeInput = component.myForm.controls['monthlyIncome']

    monthlyIncomeInput.setValue(500)

    expect(monthlyIncomeInput.errors).toBeNull()
  })

  it("Input field for requested amount", () => {
    let requestedAmountInput = component.myForm.controls['requestedAmount']

    expect(requestedAmountInput.valid).toBeFalsy()
    expect(requestedAmountInput.pristine).toBeTruthy()
    expect(requestedAmountInput.errors['required']).toBeTruthy()

    requestedAmountInput.setValue(5000)

    expect(requestedAmountInput.errors['amountToSmall']).toBeTruthy()
  });


  it("check that the requested amount input is valid", () => {
    let requestedAmountInput = component.myForm.controls['requestedAmount']
    requestedAmountInput.setValue(20000)
    expect(requestedAmountInput.errors).toBeNull()
  })

  it("Input field for loan term", () => {
    let loanTermInput = component.myForm.controls['loanTerm']

    expect(loanTermInput.valid).toBeFalsy()
    expect(loanTermInput.pristine).toBeTruthy()
    expect(loanTermInput.errors['required']).toBeTruthy()

    loanTermInput.setValue(2)

    expect(loanTermInput.errors['wrongTerm']).toBeTruthy()
  });

  it("check that the loan term input is valid", () => {
    let loanTermInput = component.myForm.controls['loanTerm']

    loanTermInput.setValue(20)

    expect(loanTermInput.errors).toBeNull()
  })

  it("Select field for children", () => {
    let childrenInput = component.myForm.controls['children']

    expect(childrenInput.valid).toBeFalsy()
    expect(childrenInput.pristine).toBeTruthy()
    expect(childrenInput.errors['required']).toBeTruthy()
  });

  it("check that the children select input is valid", () => {
    let childrenInput = component.myForm.controls['children']

    childrenInput.setValue('NONE')

    expect(childrenInput.errors).toBeNull()
  })

  it("Select field for coapplicants", () => {
    let coapplicantsInput = component.myForm.controls['coapplicant']

    expect(coapplicantsInput.valid).toBeFalsy()
    expect(coapplicantsInput.pristine).toBeTruthy()
    expect(coapplicantsInput.errors['required']).toBeTruthy()
  });

  it("check that the coapplicants select input is valid", () => {
    let coapplicantsInput = component.myForm.controls['coapplicant']

    coapplicantsInput.setValue('SINGLE')

    expect(coapplicantsInput.errors).toBeNull()
  })
});
