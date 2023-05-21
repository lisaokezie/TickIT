import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: any = {
    name: null,
    surname: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(): void {
    const { name, surname, username, email, password } = this.form;
    this.authService
      .register(name, surname, username, email, password)
      .subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          if (this.isSuccessful) {
            this.router.navigate(['']);
            alert('Registrierung erfolgreich, Bitte einloggen');
          }
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }
}
