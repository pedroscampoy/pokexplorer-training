import { PokemonService } from './../../core/services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { PokemonListElement } from 'src/app/core/models/pokemon.domain';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.scss']
})
export class PokemonDisplayComponent implements OnInit {
  pokemonList$! : Observable<PokemonListElement[]>;
  pokemonObjects$! : Array<Observable<any>>;

  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().pipe(
      map(el => el.map((pk: PokemonListElement) => {
        return this.pokemonService.getPokemonByUrl(pk.url)
      }))).subscribe(r => {r})

    // this.pokemonList$.pipe(
    //   map((pokemonList : PokemonListElement) => pokemonEl => {
    //     pokemonEl['test'] = 'test'}
    //     ))).subscribe(d => console.log({d}))

    // this.pokemonObjects$ = this.pokemonList$.pipe(map((pokemonList: PokemonListElement) =>
    //  this.pokemonService.getPokemonByUrl(pokemonList.url)))
  }

}
