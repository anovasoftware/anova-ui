import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormService} from '../../../services/form.service';
import {Form} from '../../../models/form';

@Component({
  selector: 'app-form-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-manager.component.html',
  styleUrl: './form-manager.component.scss'
})
export class FormManagerComponent implements OnInit{
  @Input() formId!: string;
  @Input() action!: string;
  @Input() params?: any;

  form?: Form;
  loading = false;
  error: string | null = null;

  constructor(private service: FormService) {}

  ngOnInit() {
    this.loadForm();
  }

  loadForm(): void {
    this.loading = true;
    this.error = null;

    this.service.loadForm(this.formId).subscribe({
      next: (response) => {
        this.form = response.form;
        this.loading = false;
        console.log('Loaded form:', this.form);
      },
      error: (err) => {
        console.error('Error loading form:', err);
        this.error = 'Failed to load form.';
        this.loading = false;
      }
    });
  }
}
