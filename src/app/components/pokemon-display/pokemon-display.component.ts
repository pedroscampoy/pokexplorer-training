import { PokemonService } from './../../core/services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import {
  Observable,
  tap,
  switchMap,
  forkJoin,
  Subscription,
  delay,
} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.scss'],
})
export class PokemonDisplayComponent implements OnInit {
  pokemonList$!: Observable<any>;
  maxPokemon = 1154;
  limit = 12;
  offset = 0;
  rangeNumber: number[] = [];
  formSubscription!: Subscription;
  over: boolean[] = [];

  form: FormGroup = this.fb.group({
    range: [this.offset + 1, Validators.required],
    quantity: [this.limit, Validators.required],
  });

  constructor(
    private pokemonService: PokemonService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchPokemonList(this.limit, this.offset);
    this.rangeNumber = this.rangeFromNumber(1, this.maxPokemon, this.limit);
    this.over = new Array(this.limit);
    this.over.fill(false);
    this.formSubscription = this.form.valueChanges
      .pipe(delay(1000))
      .subscribe((res) => {
        this.limit = res.quantity;
        this.offset = res.range - 1;
        this.fetchPokemonList(this.limit, this.offset);
        this.rangeNumber = this.rangeFromNumber(1, this.maxPokemon, this.limit);
      });
  }

  fetchPokemonList(limit: number, offset: number) {
    this.pokemonList$ = this.pokemonService.getPokemons(limit, offset).pipe(
      tap((res) => {
        console.log({ res });
      }),
      switchMap((pokEl) =>
        forkJoin(
          pokEl.map((pok: any) => this.pokemonService.getPokemonByUrl(pok.url))
        )
      ),
      tap((res) => {
        console.log({ res });
      })
    );
  }

  onNextClick() {
    this.offset + this.limit === this.maxPokemon
      ? (this.offset = 0)
      : (this.offset += this.limit);
    this.fetchPokemonList(this.limit, this.offset);
    this.form.patchValue({ range: this.offset + 1 });
  }

  onBackClick() {
    this.offset - this.limit < 0
      ? (this.offset = this.maxPokemon - this.limit)
      : (this.offset -= this.limit);
    this.fetchPokemonList(this.limit, this.offset);
    this.form.patchValue({ range: this.offset + 1 });
  }
  rangeFromNumber(from: number, to: number, step: number): number[] {
    return [...Array(Math.floor((to - from) / step) + 1)].map(
      (_, i) => from + i * step
    );
  }
}
