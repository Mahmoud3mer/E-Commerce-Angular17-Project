import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const rePassword = control.get('rePassword');

        if (password && rePassword && password.value !== rePassword.value) {
            return { passwordsMismatch: true };
        }

        return null;
    };
}