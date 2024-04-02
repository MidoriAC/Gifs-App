import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  template: `
    <div class="d-flex justify-content-center">
      <img
        [src]="url"
        [alt]="alt"
        class="card-img-top animate__animated animate__fadeIn"
        (load)="onLoad()"
        [ngStyle]="{display: hasLoaded ? '' : 'none'}"
      />

      <img
        *ngIf="!hasLoaded"
        src="assets/loader.svg"
        height="35"
        width="35"
        class="mt-3"
      />
    </div>
  `,
  styles: ``
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt!: string;

  public hasLoaded: boolean = false;

  public ngOnInit(): void {
    if (!this.url) throw new Error('Url property is required');
    if (!this.alt) throw new Error('alt property is required');
  }

  public onLoad() {
    console.log('Image loaded');
    this.hasLoaded = true;
  }

}
