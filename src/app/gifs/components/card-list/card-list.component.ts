import { Component, Input } from '@angular/core';

import { Gif } from '../../models/gifs.model';

@Component({
  selector: 'gifs-card-list',
  // templateUrl: './card-list.component.html',
  template: `
   <div class="row">
      <gifs-card *ngFor="let gif of gifs" [gif]="gif" class="col-md-3 col-sm-6" />
    </div>
  `,
  styles: ``,
})
export class CardListComponent {
  @Input() //Recibew datos del componenete padre
  public gifs: Gif[] = [];
}
