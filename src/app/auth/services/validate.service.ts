import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
    validateFormInfo(form: FormGroup, isConfirm: boolean): string {
        const formData = form.getRawValue()

        if (!formData.password?.length || !formData.email?.length) {
            return "All fields must have a value.";
        }

        if (isConfirm) {
            if (!formData.confirmPassword?.length) {
                return  "All fields must have a value."
            }

            if (formData.password!==formData.confirmPassword) {
                return "The \'Confirm Password\' and \'Password\' fields must have the same values.";
            }
        }

        if (form.status === "INVALID") {
            return "Enter correct email.";
        }

        return ""
    }
}