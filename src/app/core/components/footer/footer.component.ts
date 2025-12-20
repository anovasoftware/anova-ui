import {Component, Input} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {MatDivider} from '@angular/material/divider';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem} from '@angular/material/menu';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    RouterModule,
    MatDivider,
    MatIconButton,
    MatMenu,
    MatMenuItem,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  @Input() referenceId: string | null = null;

  currentYear = new Date().getFullYear();
}
