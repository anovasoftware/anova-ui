import { Component } from '@angular/core';
import {HeroComponent} from './hero/hero.component';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {FormConstants} from '../../../../constants/form_constants';
import {Router} from '@angular/router';
import {FormDialogService} from '../../../services/form-dialog.service';

@Component({
  selector: 'app-page001',
  standalone: true,
  imports: [HeroComponent, MatCard, MatCardTitle, MatCardContent, MatButton],
  templateUrl: './page001.component.html',
  styleUrls: ['./page001.component.scss'],
})
export class Page001Component {
  constructor(
    private router: Router,
    private formDialog: FormDialogService
  ) {

  }

    onContact(event: MouseEvent) {
    // if (event.ctrlKey || event.metaKey || event.button === 1) return;
    // event.preventDefault();
    this.formDialog.openForm(FormConstants.CONTACT_US, 'new', 'create');
    // this.dialog.open(FormManagerComponent, {
    //   width: '500px',
    //   maxWidth: '90vw',
    //   data: { formId: FormConstants.LOGIN, pk: 'new' }
    // });
  }


}
