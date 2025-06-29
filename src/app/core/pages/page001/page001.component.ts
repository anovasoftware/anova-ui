import { Component } from '@angular/core';
import {HeroComponent} from './hero/hero.component';

@Component({
  selector: 'app-page001',
  standalone: true,
  imports: [HeroComponent],
  templateUrl: './page001.component.html',
  styleUrls: ['./page001.component.scss'],
})
export class Page001Component {

}
