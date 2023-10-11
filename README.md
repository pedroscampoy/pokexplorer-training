# PokexplorerTraining
This project includes the classic pokedex app (because everybody loves pokémons) and implements step by step ngrx in the code, from basic implementation to advance use of the library.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.3.

## Build

Run `npm run mock` to build the project with mock back-end implemented with json-server.

## Branches content

  - 01-initial-setup
    - [x] Use of ngrx schematics
    - [x] Create store module
    - [x] Initial store elements - Reducer & initial state
   
  - 02-actions-effects
    - [x] Create initial actions and effects
    - [x] Create selectors 
   
  - 03-select-effects-pro
    - [x] Create actions end efects for error handling
    - [x] Combine data in seletors
   
  - 04-effects-pagination
    - [x] Effect advance uses:
      - [x] Preload pagination in store in the backgroung
      - [ ] Effect triggered by change in selector
      - [ ] Several actions in the same effect
      - [ ] Asynchronous actions to trigger one effect

  - 05-ngrx-preformance //TODO
    - [ ] Use StoreModule.forFeature to load store in corresponding module
    - [ ] Use EffectsModule.forFeature to load store in corresponding module
    - [ ] Configure Store Devtools

  - 06-ngrx-testing //TODO
    - [ ] Use provideMockStore in component Unit Test
    - [ ] Use mockStore.overrideSelector to asess different scenarios
    - [ ] Cover actions and selectors
    - [ ] Dispatch actions in effect unit test and evaluate results
      - Action as BehaviorSubject
      - jasmine-marbles
