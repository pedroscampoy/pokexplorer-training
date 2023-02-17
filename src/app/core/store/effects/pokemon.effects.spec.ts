import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PokemonEffects } from './pokemon.effects';

describe('PokemonEffects', () => {
  let actions$: Observable<any>;
  let effects: PokemonEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PokemonEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
