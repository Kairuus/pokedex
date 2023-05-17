import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100'

  constructor(
    private http: HttpClient
  ) { }

  get apiListAllPokemons():Observable<any>{
    return this.http.get<any>(this.url).pipe( // http.get utilizando o HttpClient passando como parâmetro a url, A url retorna um objeto e é preciso pegar outros objetos dentro dele
      tap(res => res),  // o tap retorna um valor e...
      tap( res => { // dentro desse valor demos outro tap
        res.results.map( (resPokemons: any) => { // pega a parte de results do res e mapeia e typa ele
          this.apiGetPokemons(resPokemons.url).subscribe( // sempre que passar pelo nó do array faz uma chamada passando como parâmetro a url contida no results
            res=> resPokemons.status = res
          )
        })
      })
    )

  }

  public apiGetPokemons(url: string): Observable<any>{
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
    )
  }
}
