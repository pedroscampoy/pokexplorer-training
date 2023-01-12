import { PokemonService } from './../../core/services/pokemon.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Observable,
  tap,
  Subscription,
  map,
  combineLatest,
  startWith,
  BehaviorSubject,
} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { POKEMON_COLOUR_TYPES } from 'src/app/core/constants/colors-types';
import { Store } from '@ngrx/store';
import { loadPokemonsSuccess } from 'src/app/core/store/actions/pokemon.actions';
import { pokemonSelector } from 'src/app/core/store/selectors/pokemon.selectors';
import { Pokemon } from 'src/app/core/models/pokemon.domain';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDisplayComponent implements OnInit {
  pokemonList$ : Observable<Pokemon[]> =  this.store.select(pokemonSelector);
  maxPokemon = 1154;
  limit = 12;
  offset = 0;
  rangeNumber$ = new BehaviorSubject<number[]>([]);
  formSubscription!: Subscription;
  over: boolean[] = [];
  pokemonDisplayList$!: Observable<Pokemon[]>;

  form: FormGroup = this.fb.group({
    range: [this.offset + 1, Validators.required],
    quantity: [this.limit, Validators.required],
  });

  constructor(
    private pokemonService: PokemonService,
    private fb: FormBuilder,
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this.over = new Array(this.limit);
    this.over.fill(false);

    this.pokemonDisplayList$ = combineLatest({
        pokemons: this.pokemonList$,
        range: this.form.get('range')!.valueChanges.pipe(startWith(this.offset + 1)),
        quantity: this.form.get('quantity')!.valueChanges.pipe(startWith(this.limit)),
      }).pipe(
        tap((res) => this.rangeNumber$.next(this.rangeFromNumber(1, this.maxPokemon, res.quantity))),
        map((res) => res.pokemons.slice(res.range -1, res.range -1 + res.quantity))
        );

    this.fetchPokemonList();
  }

  fetchPokemonList() {
    this.pokemonService.getAllPokemons().pipe(
      map((pEl: any) => pEl.map((pok: any) => new Pokemon(pok))),
      tap((res) => {
        this.store.dispatch(loadPokemonsSuccess({data: res}));
      })
    ).subscribe()
  }

  onNextClick() {
    this.offset + this.limit === this.maxPokemon
      ? (this.offset = 0)
      : (this.offset += this.limit);
    this.form.patchValue({ range: this.offset + 1 });
  }

  onBackClick() {
    this.offset - this.limit < 0
      ? (this.offset = this.maxPokemon - this.limit)
      : (this.offset -= this.limit);
    this.form.patchValue({ range: this.offset + 1 });
  }

  rangeFromNumber(from: number, to: number, step: number): number[] {
    return [...Array(Math.floor((to - from) / step) + 1)].map(
      (_, i) => from + i * step
    );
  }

  getTypeColor(type: string, alpha: number): string {
    const hexColorType = POKEMON_COLOUR_TYPES[type] || '#808080';
    const [r, g, b] = hexColorType
      .match(/\w\w/g)
      ?.map((x) => parseInt(x, 16)) || ['0', '0', '0'];
    return `rgba(${r},${g},${b},${alpha})`;
  }
}
