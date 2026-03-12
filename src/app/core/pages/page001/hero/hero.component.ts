import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule, NgIf,],
  templateUrl: './hero.component.html',
})
export class HeroComponent {

}
