import { Pipe, PipeTransform } from '@angular/core';
import { MovieDetailResponse } from '../types.movies';

@Pipe({
  name: 'genresFilter'
})
export class GenresFilterPipe implements PipeTransform {


  /* Con este pipe modificamos la data de tal manera que filtramos por genero de pelicula */
  transform(arrayMovies:MovieDetailResponse[],genre:any) {

    const newData = arrayMovies.filter(element=>{
      const genreFinded = element.genres.find((subElem)=> subElem.name == genre.name)
      return (genreFinded) ? true : false
    })
   
    return newData;
  }

}
