import { Pokemon } from 'src/app/core/models/pokemon.domain';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokeapiUrl = "https://pokeapi.co/api/v2/"
  pokemonMockUrl = "http://localhost:8064/pokemon"

  constructor(private http: HttpClient) { }

  getPokemons(limit: number = 20, offset: number = 0) {
    let params = new HttpParams().set('limit', limit).set('offset', offset);

    return this.http.get(this.pokeapiUrl + 'pokemon',
     {params,
     responseType: 'json'})
     .pipe(map((res: any) => res.results))
  }

  getPokemonByUrl(url: string) {
    return this.http.get(url,
     {responseType: 'json'})
  }

  getAllPokemons(limit: number, offset: number): Observable<Object> {
    return this.http.get(this.pokemonMockUrl, {responseType: 'json', params: { '_start': offset, '_end': offset + limit }});
  }

 allPokemons$ = this.http.get(this.pokemonMockUrl, {responseType: 'json'}).pipe(share({connector: () => new ReplaySubject(1)}));

}
