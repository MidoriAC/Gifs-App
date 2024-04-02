import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  // templateUrl: './search-box.component.html',
  template: `
  <h5>Buscar</h5>
  <input 
    type="text" 
    class="form-control" 
    placeholder="Buscar Gifs" 
    (keyup.enter)="searchTag()" 
    #txtTagInput/>
  `,
  styles: ``
})
export class SearchBoxComponent {
@ViewChild('txtTagInput')
private tagInput!: ElementRef<HTMLInputElement>

  // searchTag(newTag: string) {
  //   console.log({ newTag });
  //   console.log( newTag );
  // }


  constructor(private gifsService: GifsService){}

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    // console.log(newTag);
    this.tagInput.nativeElement.value= "";
  }

  
}
