import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../models/gifs.model';

@Component({
  selector: 'gifs-card',
  template: `
   <div class="card mb-2 text-center bg-dark">
      <shared-lazy-image
        [url]="gif.images.downsized_medium.url"
        [alt]="gif.title || 'No title'"
      />
      
      <!-- <img
        [src]="gif.images.downsized_medium.url"
        [alt]="gif.title"
        class="card-img-top"
      /> -->

      <div class="card-body text-white">
        <p class="card-text">{{ gif.title || 'No title' }}</p>
      </div>
    </div>
  `,
  styles: ``
})
export class CardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is Required');
  }

}
