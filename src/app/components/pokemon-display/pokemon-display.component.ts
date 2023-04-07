import {
  pokemonLimit,
  pokemonOffset,
} from 'src/app/core/store/selectors/pokemon.selectors';
import { loadNextPokemons } from 'src/app/core/store/actions/pokemon.actions';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  Subject,
  takeUntil,
  fromEvent,
  withLatestFrom,
} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { POKEMON_COLOUR_TYPES } from 'src/app/core/constants/colors-types';
import { Store } from '@ngrx/store';
import {
  loadPokemons,
  loadPreviousPokemons,
  selectPokemon,
  setPokemonLimit,
  setPokemonOffset,
} from 'src/app/core/store/actions/pokemon.actions';
import {
  isBackButtonEnabled,
  pokemonDisplaySelector,
} from 'src/app/core/store/selectors/pokemon.selectors';
import { Pokemon } from 'src/app/core/models/pokemon.domain';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDisplayComponent implements OnInit, OnDestroy {
  @ViewChild('backButton', { static: true }) backButton!: ElementRef;
  @ViewChild('nextButton', { static: true }) nextButton!: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();
  pokemonDisplayList$: Observable<Pokemon[]> = this.store.select(
    pokemonDisplaySelector
  );
  isBackButtonEnabled$: Observable<boolean> =
    this.store.select(isBackButtonEnabled);
  pokemonOffset$: Observable<number> = this.store.select(pokemonOffset);
  pokemonLimit$: Observable<number> = this.store.select(pokemonLimit);
  backClick$!: Observable<Event>;
  nextClick$!: Observable<Event>;

  maxPokemon = 1154;
  limit = 6;
  offset = 0;
  offsetNumber$ = new BehaviorSubject<number[]>(
    this.offsetFromNumber(1, this.maxPokemon, this.limit)
  );
  over: boolean[] = [];

  form: FormGroup = this.fb.group({
    offset: [this.offset + 1, Validators.required],
    limit: [this.limit, Validators.required],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.backClick$ = fromEvent(this.backButton!.nativeElement, 'click');
    this.nextClick$ = fromEvent(this.nextButton!.nativeElement, 'click');

    this.store.dispatch(loadPokemons());
    this.over = new Array(this.limit);
    this.over.fill(false);

    this.backClick$
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(
          this.pokemonOffset$,
          this.pokemonLimit$,
          ))
      .subscribe(([, offset, limit]) => {
        console.log(offset, limit);
        this.store.dispatch(setPokemonOffset({ offset: offset -= limit - 1 }));
      });

    this.nextClick$
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(
          this.pokemonOffset$,
          this.pokemonLimit$,
          ))
      .subscribe(([, offset, limit]) => {
        console.log(offset, limit);
        this.store.dispatch(setPokemonOffset({ offset: offset += limit + 1 }));
      });

    this.form
      .get('offset')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((offset) => {
        this.store.dispatch(setPokemonOffset({ offset: offset - 1 }));
        this.store.dispatch(loadPokemons());
      });

    this.form
      .get('limit')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((limit) => {
        this.offsetNumber$.next(this.offsetFromNumber(1, this.maxPokemon, limit));
        this.store.dispatch(setPokemonLimit({ limit: limit }));
        this.store.dispatch(loadPokemons());
      });
  }

  onNextClick() {
    // this.offset + this.limit === this.maxPokemon
    //   ? (this.offset = 0)
    //   : (this.offset += this.limit);
    this.store.dispatch(loadNextPokemons({ time: 'next' }));
  }

  onBackClick() {
    this.store.dispatch(loadPreviousPokemons({ time: 'next' }));
  }

  onSelectPokemon(id: number) {
    this.store.dispatch(selectPokemon({ id }));
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
