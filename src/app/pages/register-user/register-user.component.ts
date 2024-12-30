import { Component, effect, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StrongPasswordRegx } from '../../validator/validator';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  message = '';

  constructor(private userService: UserService, private fb: FormBuilder) {
    effect(() => {
      this.message = userService.ErrorMessage();
      console.log(this.message);
    });
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern(StrongPasswordRegx)],
      ],
      role: ['', [Validators.required]],
    });
  }

  registerUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      const { email, password, role } = this.registerForm.value;
      this.userService
        .registerUser(email, password, role)
        .subscribe((response) => {
          console.log(response);
        });
      this.registerForm.reset();
    }
  }
}
