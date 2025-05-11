import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpDialogComponent } from '@shared/components/pop-up-dialog/pop-up-dialog.component';
import { AuthService } from '@auth/services/auth.service';
import { ValidateService } from '@auth/services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public form : FormGroup = new FormGroup({
    email: new FormControl('',Validators.email),
    password: new FormControl(),
  })

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router
  ) { }

  sendInfo() {
    const validateResult = this.validateService.validateFormInfo(this.form, false)
    if (validateResult.length){
      this.dialog.open(PopUpDialogComponent,{
        data: validateResult,
        panelClass: "dialog"
      })
      return;
    }
    this.authService.signIn(this.form.getRawValue())
  }

  navigateToSignUp() {
    this.router.navigate(['auth','sign-up'])
  }
}
