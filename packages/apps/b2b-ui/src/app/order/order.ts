import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrLoadingState } from '@clr/angular';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { CreateOrderByCustomerRequest } from '@gruzprom/api';
import { TodayService } from '@gruzprom/angular-extra';
import { createFormlyFields } from './formly-fields';

@Component({
  standalone: true,
  selector: 'b2b-ui-order',
  templateUrl: './order.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormlyModule,
    ReactiveFormsModule,
    ClarityModule,
    HttpClientModule,
  ],
})
export class OrderComponent {
  protected readonly formGroup = new FormGroup({});
  protected readonly model = {} as Omit<CreateOrderByCustomerRequest, 'id'>;
  protected readonly options: FormlyFormOptions = {};
  protected readonly fields$: Observable<FormlyFieldConfig[]> = combineLatest([
    this.todayService.dayChanges(),
  ]).pipe(map(([today]) => createFormlyFields({ today })));
  protected readonly loading$ = new BehaviorSubject(ClrLoadingState.DEFAULT);
  protected readonly LoadingState = ClrLoadingState;
  protected readonly errorMessages$ = new BehaviorSubject<string[]>([]);
  private isNextChangeDueToReset = false;

  constructor(
    private readonly todayService: TodayService,
    private readonly httpClient: HttpClient
  ) {}

  protected onErrorModalChange(open: boolean): void {
    if (!open) {
      this.loading$.next(ClrLoadingState.DEFAULT);
      this.errorMessages$.next([]);
    }
  }

  protected onModelChange(): void {
    if (
      !this.isNextChangeDueToReset &&
      this.loading$.value !== ClrLoadingState.DEFAULT
    ) {
      this.loading$.next(ClrLoadingState.DEFAULT);
    }
    if (this.isNextChangeDueToReset) {
      this.isNextChangeDueToReset = false;
    }
  }

  protected onSubmit(): void {
    this.loading$.next(ClrLoadingState.LOADING);
    const data: CreateOrderByCustomerRequest = {
      ...this.model,
      id: crypto.randomUUID(),
    };
    this.httpClient.post('/api/orders', { data }).subscribe({
      next: () => {
        this.isNextChangeDueToReset = true;
        this.options.resetModel?.();
        this.loading$.next(ClrLoadingState.SUCCESS);
      },
      error: (err) => {
        console.error(err);
        this.loading$.next(ClrLoadingState.ERROR);
        if (
          err instanceof HttpErrorResponse &&
          typeof err.error === 'object' &&
          'message' in err.error
        ) {
          const message = err.error.message as unknown;
          if (typeof message === 'string') {
            this.errorMessages$.next([message]);
          } else if (Array.isArray(message)) {
            this.errorMessages$.next(
              message.filter((m) => typeof m === 'string')
            );
          }
        }
      },
    });
  }
}
