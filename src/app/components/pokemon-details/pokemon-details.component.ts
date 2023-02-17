import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { pokemonSelected } from 'src/app/core/store/selectors/pokemon.selectors';
import { map, tap } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon.domain';
import { selectPokemonDetail } from 'src/app/core/store/actions/pokemon.actions';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  selectedPokemonId!: number;
  selectPokemon$ = this.store.select(pokemonSelected).pipe(
    tap((pok: Pokemon) => this.selectedPokemonId = pok.id),
    map((pok: Pokemon) => ({...pok, types: pok.types.map((type: any) => type.type.name).join(', ')})),
  );

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

  onLeftClick() {
    this.store.dispatch(selectPokemonDetail({id: this.selectedPokemonId - 1}));
  }

  onRightClick() {
    this.store.dispatch(selectPokemonDetail({id: this.selectedPokemonId + 1}));
  }

}
