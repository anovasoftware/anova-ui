import { Component } from '@angular/core';
import {WidgetBaseComponent} from '../widget-base.component';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {CommonModule, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-widget-select1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatTooltip,
  ],

  templateUrl: './widget-select1.component.html',
  styleUrl: './widget-select1.component.scss'
})
export class WidgetSelect1Component extends WidgetBaseComponent{

    changed(): void {
  }


}
