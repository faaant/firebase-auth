import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpDialogComponent } from '@shared/components/pop-up-dialog/pop-up-dialog.component';
import { AuthService } from '@auth/services/auth.service';
import { ValidateService } from '@auth/services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public form : FormGroup = new FormGroup({
    email: new FormControl('',Validators.email),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  })

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router
  ) { }

  sendInfo() {
    const validateResult = this.validateService.validateFormInfo(this.form,true)
    if (validateResult.length){
      this.dialog.open(PopUpDialogComponent,{
        data: validateResult,
        panelClass: "dialog"
      })
      return;
    }
    this.authService.signUp(this.form.getRawValue())
  }

  navigateToSignIn() {
    this.router.navigate(['auth','sign-in'])
  }
}
