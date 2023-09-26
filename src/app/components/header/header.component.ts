import { Component } from '@angular/core';
import { Router } from '@angular/router';

const reactiveCrudPageUrl = '/reactive-crud';
const homeUrl = '/welcome';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly router: Router) {}

  navigateToReactiveCrudPage(): void {
    this.router.navigateByUrl(reactiveCrudPageUrl);
  }

  redirectHome(): void {
    this.router.navigateByUrl(homeUrl);
  }
}
