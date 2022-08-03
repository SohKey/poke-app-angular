import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {}
  
  getPokemonList(): Observable<any> {
    return this.http.get<any>(`${this.authService.apiLink}/api/pokemons`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    )
  }

  getPokemonById(PokemonId: number): Observable<any> {
    return this.http.get<any>(`${this.authService.apiLink}/api/pokemons/${PokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    )
  }

  updatePokemon(pokemon: any): Observable<Pokemon|null>|undefined {
    if ("currentUser" in localStorage) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const token = currentUser.token
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
      };
      const pokeId = pokemon.data.id
      return this.http.put(`${this.authService.apiLink}/api/pokemons/${pokeId}`, pokemon.data, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError(error => this.handleError(error, undefined))
      )
    } return undefined
  }

  deletePokemonById(pokemonId: number): Observable<null>|undefined {
    if ("currentUser" in localStorage) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const token = currentUser.token
      const httpOptions = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      };
      console.log('delete');
      
      return this.http.delete(`${this.authService.apiLink}/api/pokemons/${pokemonId}`, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
    )}
      return undefined
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>|undefined {
    if ("currentUser" in localStorage) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const token = currentUser.token
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        })
      };
      return this.http.post<Pokemon>(`${this.authService.apiLink}/api/pokemons`, pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )}
    return undefined
  }

  searchPokemonList(term: string): Observable<any> {
    if(term.length <= 1) {
      return of([]);
    }
    return this.http.get<any>(`${this.authService.apiLink}/api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    )
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue)
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy',
    ];
  }
}
