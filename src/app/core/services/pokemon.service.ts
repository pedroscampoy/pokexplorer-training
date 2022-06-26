import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokeapiUrl = "https://pokeapi.co/api/v2/"

  constructor(private http: HttpClient) { }

  getPokemons(limit: number = 150) {
    let params = new HttpParams().set('limit', limit).set('offset', 0);

    return this.http.get(this.pokeapiUrl + 'pokemon',
     {params,
     responseType: 'json'})
     .pipe(map((res: any) => res.results))
  }

  getPokemonByUrl(url: string) {

    return this.http.get(url,
     {responseType: 'json'})
     //.pipe(map((res: any) => res.results))
  }
}
