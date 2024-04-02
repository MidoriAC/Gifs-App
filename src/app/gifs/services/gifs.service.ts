import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../models/gifs.model';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'LvpmBgU0KqOlhexPRSd1fzgwe1f51I1f';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage(); //!Para que se ejecute para ver los datos del local storage
    console.log('Gifs are ready');  
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=an7P8PxjMz7KYMmyq5Rj6OpKEB2Bc2LQ&q=warcraft&limit=10')

    // const data = await resp.json();
    // console.log(data)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', 10);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params }) //TODO: <SearchResponse> de tipo JSON va a la par del  get
      .subscribe((resp) => { 
        console.log(resp);
        this.gifList = resp.data;
        console.log(this.gifList);
      });
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory.slice(0, 10);
    this.saveLocalSotrage(); // !!AQUÍ SE LLAMA EL METODO QUE EJECUTA EL LOCAL STORAGE
  }


  //!! METODO DEL LOCAL STORAGE
  private saveLocalSotrage(){
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  //!! MEOTODO PARA LLAMAR ELEMENTOS DEL LOCAL STORAGE
  private loadLocalStorage(): void{
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if( this._tagsHistory,length ===0) return;
    this.searchTag(this._tagsHistory[0]);
  }
  
}
