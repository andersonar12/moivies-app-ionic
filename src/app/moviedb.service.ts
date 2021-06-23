import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDetailResponse, ResponseMovieDb ,MovieCreditsResponse} from './types.movies';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  public popularesPage  = 0
  public genres:any[] =[]
  public apiKey = environment.apiKey
  public baseUrl= environment.baseUrl
  public baseParams =   new HttpParams().set('api_key', this.apiKey)
                                        .set('language', 'es')
                                        .set('include_image_language','es')

 /*  publicBaseHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }); */

  constructor(private http:HttpClient) { }


  getFeature(){

    const today = new Date()
    const lastDay = new Date( today.getFullYear(), today.getMonth() + 1, 0 ).getDate() 

    const month = today.getMonth() + 1
    let monthString 

    if ( month <10 ) {
      monthString = '0' + month
    } else{
        monthString = month
    }

    const start = `${today.getFullYear()}-${monthString}-01`
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`

    const endpoint = `${this.baseUrl}/discover/movie`;

    const params = this.baseParams.set('primary_release_date.gte', `${start}`)
                      .set('primary_release_date.lte', `${end}`)
          
    
    return this.http.get<ResponseMovieDb>(endpoint, { params })
  }

  getPopulars() {

    this.popularesPage++;

    const endpoint = `${this.baseUrl}/discover/movie`;

    const params = this.baseParams.set('sort_by', 'popularity.desc').set('page',`${this.popularesPage}` )
          
    return this.http.get<ResponseMovieDb>(endpoint, { params })
  }

  getMovieDetail(id:number) {

    const endpoint = `${this.baseUrl}/movie/${id.toString()}`;

    const params = this.baseParams
          
    return this.http.get<MovieDetailResponse>(endpoint, { params })
  }

  getMovieCredits(id:number) {

    const endpoint = `${this.baseUrl}/movie/${id.toString()}/credits`;

    const params = this.baseParams
          
    return this.http.get<MovieCreditsResponse>(endpoint, { params })
  }

  searchMovies(query:string){
    const endpoint = `${this.baseUrl}/search/movie`;
    const params = this.baseParams.set('query', query)
          
    return this.http.get<any>(endpoint, { params })
  }

  getGenresMovies(){
    const endpoint = `${this.baseUrl}/genre/movie/list`;
    const params = this.baseParams
          
    return this.http.get<any>(endpoint, { params }).pipe(map(({genres})=>{
      this.genres = genres
      return this.genres
    }))
   
  }


}

