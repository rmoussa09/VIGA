import { Component, OnInit} from '@angular/core';
import { NonNullableFormBuilder, AbstractControl, ValidatorFn, ValidationErrors, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

//this checks to see if the password has a uppercase, lowercase, number, and special character
export function createPasswordStrengthValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const password = control.get('password')?.value;

      if (!password) {
          return null;
      }

      const hasUpperCase = /[A-Z]+/.test(password);

      const hasLowerCase = /[a-z]+/.test(password);

      const hasNumeric = /[0-9]+/.test(password);
      
      const hasSpecialChar = /[^A-Za-z0-9]+/.test(password);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !passwordValid ? {passwordStrength:true}: null;
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide = true;

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: [passwordsMatchValidator(), createPasswordStrengthValidator()]})

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
      
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }
//this submits the information to make sure it is correct
  submit(){
    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }

    const nameParts = name.split(' ');
    const displayName = nameParts[0];
//this officially signs up the user in the firebase database
    this.authService.signUp(email, password).pipe(
      switchMap(({user: {uid}}) => this.usersService.addUser({uid, email, name, displayName})),
      this.toast.observe({
        success: 'Congrats! You are all signed up',
        loading: 'Signing up...',
        error: 'There was an error. Please try again'
      })
    )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

}