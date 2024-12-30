import { Component, effect } from '@angular/core';
import { UserService } from '../../service/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss',
})
export class LoginUserComponent {
  loginForm!: FormGroup;
  message = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
    effect(() => {
      this.message = userService.ErrorMessage();
    });
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const { email, password } = this.loginForm.value;
      this.userService.loginUser(email, password).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/products']);
      });
    }
  }
}
