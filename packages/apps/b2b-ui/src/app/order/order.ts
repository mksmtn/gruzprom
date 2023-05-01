import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { Observable, combineLatest, map } from 'rxjs';
import { TodayService } from '../shared/providers/today.service';
import { createFormlyFields } from './formly-fields';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'b2b-ui-order',
  templateUrl: './order.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule, ReactiveFormsModule, ClarityModule],
})
export class OrderComponent {
  protected readonly formGroup = new FormGroup({});
  protected readonly model = {};
  protected readonly fields$: Observable<FormlyFieldConfig[]> = combineLatest([
    this.todayService.dayChanges(),
  ]).pipe(map(([today]) => createFormlyFields({ today })));

  constructor(private readonly todayService: TodayService) {}

  protected onSubmit(): void {
    console.log(this.model);
  }
}
