import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeColor'
})
export class PokemonTypeColorPipe implements PipeTransform {

  transform(type: string): string {
  
    let color: string;
  
    switch (type) {
      case 'Feu':
        color = 'tag has-background-danger';
        break;
      case 'Eau':
        color = 'tag has-background-link';
        break;
      case 'Plante':
        color = 'tag has-background-success-light	';
        break;
      case 'Insecte':
        color = 'tag has-background-primary-light';
        break;
      case 'Normal':
        color = 'tag has-background-info-light';
        break;
      case 'Vol':
        color = 'tag has-background-info';
        break;
      case 'Poison':
        color = 'tag has-background-success';
        break;
      case 'Fée':
        color = 'tag has-background-link-light';
        break;
      case 'Psy':
        color = 'tag has-background-grey-light';
        break;
      case 'Electrik':
        color = 'tag has-background-warning';
        break;
      case 'Combat':
        color = 'tag has-background-warning-dark	';
        break;
      default:
        color = 'grey';
        break;
    }
    return 'chip ' + color;
  }
}
