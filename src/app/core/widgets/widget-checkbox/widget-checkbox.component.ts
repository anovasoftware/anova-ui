import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WidgetBaseComponent } from '../widget-base.component';

@Component({
  selector: 'app-widget-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './widget-checkbox.component.html',
  styleUrl: './widget-checkbox.component.scss'
})
export class WidgetCheckboxComponent extends WidgetBaseComponent {
}
