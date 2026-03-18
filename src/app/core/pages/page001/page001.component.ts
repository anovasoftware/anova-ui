import {Component} from '@angular/core';
import {HeroComponent} from './hero/hero.component';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {FormConstants} from '../../../../constants/form_constants';
import {Router} from '@angular/router';
import {FormDialogService} from '../../../services/form-dialog.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-page001',
  standalone: true,
  imports: [HeroComponent, MatCard, MatCardTitle, MatCardContent, MatButton, MatSnackBarModule],
  templateUrl: './page001.component.html',
  styleUrls: ['./page001.component.scss'],
})
export class Page001Component {
  constructor(
    private router: Router,
    private formDialog: FormDialogService,
    private snackBar: MatSnackBar
  ) {

  }

  onContact(event: MouseEvent) {
    const dialogRef = this.formDialog.openForm(
      FormConstants.CONTACT_US,
      'new',
      'create'
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.success) {
        this.snackBar.open(
          'Your request has been submitted and will be addressed as soon as possible.',
          'OK',
          {
            duration: 9000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      }
    });

  }
}
