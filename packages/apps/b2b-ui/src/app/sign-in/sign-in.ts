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
import { BehaviorSubject } from 'rxjs';

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

  protected readonly loginControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  protected readonly passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  protected readonly formGroup = new FormGroup({
    login: this.loginControl,
    password: this.passwordControl,
  });

  constructor(private readonly router: Router) {}

  protected onSubmit() {
    this.submitBtnState$.next(ClrLoadingState.LOADING);
    setTimeout(() => {
      this.submitBtnState$.next(ClrLoadingState.SUCCESS);
      this.router.navigate(['/']);
    }, 1500);
  }
}
