import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>();
  pokemons$: any;
  pke: any;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    ).subscribe((data) => this.pokemons$ = data?.data)
  }

  initSearch() {

  }

  search(term: string){
    this.searchTerms.next(term);
  }

  gotoDetail(pokemon: any) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
