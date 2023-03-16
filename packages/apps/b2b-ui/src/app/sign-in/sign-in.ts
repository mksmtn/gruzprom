import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'b2b-ui-sign-in',
  templateUrl: './sign-in.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterModule],
})
export class SignInComponent {
  constructor(private readonly router: Router) {}

  protected onSubmit() {
    this.router.navigate(['/']);
  }
}
