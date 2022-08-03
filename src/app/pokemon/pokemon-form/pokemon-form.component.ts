import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: any;
  types: string[];
  isAddForm: boolean;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
  }

  hasType(type: string): boolean {
    if(this.isAddForm) {
      return this.pokemon.types.includes(type)
    } 
    return this.pokemon.data.types.includes(type);
  }

  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;

    if(isChecked) {
      if(this.isAddForm) {
        this.pokemon.types.push(type);
      } else {
        this.pokemon.data.types.push(type);
      }
    } else {
      if(this.isAddForm) {
        const index = this.pokemon.types.indexOf(type);
        this.pokemon.types.splice(index, 1);
      } else {
        const index = this.pokemon.data.types.indexOf(type);
        this.pokemon.data.types.splice(index, 1);
      }
    }
  }

  isTypesValid(type: string): boolean {
    if (this.isAddForm) {
      if (this.pokemon.types.length == 1 && this.hasType(type)) return false;
      if (this.pokemon.types.length > 2 && !this.hasType(type)) return false;
    } else {
      if (this.pokemon.data.types.length == 1 && this.hasType(type)) return false;
      if (this.pokemon.data.types.length > 2 && !this.hasType(type)) return false;
    }

    return true
  }

  onSubmit() {
    if(this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)?.subscribe(() => this.router.navigate(['/pokemons']));
    } else {
      this.pokemonService.updatePokemon(this.pokemon)
        ?.subscribe(() => this.router.navigate(['pokemon', this.pokemon.data.id]));
    }
  }
}
