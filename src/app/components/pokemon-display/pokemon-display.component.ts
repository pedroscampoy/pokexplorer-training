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
  withLatestFrom,
} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { POKEMON_COLOUR_TYPES } from 'src/app/core/constants/colors-types';
import { Store } from '@ngrx/store';
import { loadPokemons, loadPokemonsSuccess, selectPokemon } from 'src/app/core/store/actions/pokemon.actions';
import { pokemonSelector } from 'src/app/core/store/selectors/pokemon.selectors';
import { Pokemon } from 'src/app/core/models/pokemon.domain';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDisplayComponent implements OnInit {
  pokemonList$ : Observable<Pokemon[]> =  this.store.select(pokemonSelector);
  maxPokemon = 1154;
  limit = 12;
  offset = 0;
  offsetNumber$ = new BehaviorSubject<number[]>([]);
  formSubscription!: Subscription;
  over: boolean[] = [];
  pokemonDisplayList$!: Observable<Pokemon[]>;

  form: FormGroup = this.fb.group({
    offset: [this.offset + 1, Validators.required],
    limit: [this.limit, Validators.required],
  });

  constructor(
    private pokemonService: PokemonService,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.store.dispatch(loadPokemons({offset: this.offset, limit: this.limit}))
  }

  ngOnInit(): void {
    this.over = new Array(this.limit);
    this.over.fill(false);

    this.pokemonDisplayList$ = combineLatest({
        //pokemons: this.pokemonList$,
        offset: this.form.get('offset')!.valueChanges.pipe(startWith(this.offset)),
        limit: this.form.get('limit')!.valueChanges.pipe(startWith(this.limit)),
      }).pipe(
        withLatestFrom(this.pokemonList$),
        map(([form, pokemons]) => ({...form, pokemons })),
        tap((res) => {
          console.log('tap', res);
          this.offsetNumber$.next(this.offsetFromNumber(1, this.maxPokemon, res.limit));
          this.offset = res.offset - 1;
          this.limit = res.limit;
          }),
        map((res) => {
          this.store.dispatch(loadPokemons({offset: this.offset, limit: this.limit}))
          return res.pokemons}),
        //.slice(res.offset -1, res.offset -1 + res.limit))
        );
    //this.fetchPokemonList();
  }

  // fetchPokemonList() {
  //   this.pokemonService.getAllPokemons().pipe(
  //     map((pEl: any) => pEl.map((pok: any) => new Pokemon(pok))),
  //     tap((res) => {
  //       this.store.dispatch(loadPokemonsSuccess({data: res}));
  //     })
  //   ).subscribe()
  // }

  onNextClick() {
    this.offset + this.limit === this.maxPokemon
      ? (this.offset = 0)
      : (this.offset += this.limit);
    this.form.patchValue({ offset: this.offset + 1});
    this.store.dispatch(loadPokemons({offset: this.offset, limit: this.limit}))
  }

  onBackClick() {
    this.offset - this.limit < 0
      ? (this.offset = this.maxPokemon - this.limit)
      : (this.offset -= this.limit);
    this.form.patchValue({ offset: this.offset + 1});
    this.store.dispatch(loadPokemons({offset: this.offset, limit: this.limit}))
  }

  onSelectPokemon(id: number) {
    this.store.dispatch(selectPokemon({id}));
  }

  offsetFromNumber(from: number, to: number, step: number): number[] {
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
