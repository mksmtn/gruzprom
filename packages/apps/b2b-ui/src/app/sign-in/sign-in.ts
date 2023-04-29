import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClarityModule, ClrLoadingState } from '@clr/angular';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'b2b-ui-sign-in',
  templateUrl: './sign-in.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, ClarityModule, ReactiveFormsModule, CommonModule],
})
export class SignInComponent {
  protected readonly submitBtnState$ = new BehaviorSubject(
    ClrLoadingState.DEFAULT
  );

  protected readonly usernameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  protected readonly passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  protected readonly rememberMeControl = new FormControl(false);

  protected readonly formGroup = new FormGroup({
    username: this.usernameControl,
    password: this.passwordControl,
    rememberMe: this.rememberMeControl,
  });

  protected readonly invalidCredentials$ = of(true);

  constructor(private readonly router: Router) {}

  protected onSubmit() {
    this.submitBtnState$.next(ClrLoadingState.LOADING);
    setTimeout(() => {
      this.submitBtnState$.next(ClrLoadingState.SUCCESS);
      this.router.navigate(['/']);
    }, 1500);
  }
}
