import { Component } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HeroComponent} from '../page001/hero/hero.component';
import {FormManagerComponent} from '../../components/form-manager/form-manager.component';
import {FormConstants} from '../../../../constants/form_constants';


@Component({
  selector: 'app-page004',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HeroComponent,
    FormManagerComponent
  ],
  templateUrl: './page004.component.html',
  styleUrls: ['./page004.component.scss'],
})
export class Page004Component {
  username: string = 'j';
  password: string = '';  // 102129!!
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = localStorage.getItem('last_username') || '';
  }
  onSubmit() {
    localStorage.setItem('last_username', this.username);

    this.authService.login(this.username, this.password)
      .subscribe({
        next: () => {
          console.log('Login successful!');
          // Optionally route to another page here
        },
        error: (err) => {
          console.error('Login error', err);
          this.errorMessage = 'Invalid username or password';
        }
      });
  }


  protected readonly FormConstants = FormConstants;
}
