import {Component, Input} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  @Input() referenceId: string | null = null;

  currentYear = new Date().getFullYear();
}
