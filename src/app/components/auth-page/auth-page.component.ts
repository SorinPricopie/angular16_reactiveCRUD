import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AuthService,
  UserCredentials,
} from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  standalone: true,
  styleUrls: ['./auth-page.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private readonly as: AuthService
  ) {}

  loginForm!: FormGroup;
  get usernameValue() {
    return this.loginForm.controls['usernameInput'].value;
  }
  get pwdValue() {
    return this.loginForm.controls['pwdInput'].value;
  }
  isAuthenticated$ = this.as.isAuthenticated$;
  submited = false;

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      usernameInput: new FormControl('1234', Validators.required),
      pwdInput: new FormControl('1234', Validators.required),
    });
  }

  onCancel(): void {}

  onSubmit(): void {
    const data: UserCredentials = {
      username: this.usernameValue,
      pwd: this.pwdValue,
    };
    this.as.logIn(data);
    this.submited = true;
  }
}
