import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {WidgetBaseComponent} from '../widget-base.component';

@Component({
  selector: 'app-widget-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './widget-textarea.component.html',
  styleUrl: './widget-textarea.component.css'
})

export class WidgetTextareaComponent extends WidgetBaseComponent implements OnInit {
}
