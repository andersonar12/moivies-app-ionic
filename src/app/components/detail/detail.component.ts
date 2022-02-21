import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { zip } from 'rxjs';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { StorageService } from 'src/app/services/storage.service';
import { Tab3Page } from 'src/app/tabs/tab3/tab3.page';
import { Cast, MovieDetailResponse } from 'src/app/types.movies';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id

  movie: MovieDetailResponse

  actors: Cast[] = []

  oculto = 150

  movieFavorite = false

  constructor(private movieDBService: MoviedbService, private modalCtrl: ModalController, private storageService: StorageService) { }

  async ngOnInit() {
    console.log('id', this.id);

    this.movieFavorite = await this.storageService.movieExists(this.id)

    console.log('Detalle exsite pelicula', this.movieFavorite)

    zip(this.movieDBService.getMovieDetail(this.id), this.movieDBService.getMovieCredits(this.id))
      .subscribe(([detail, credits]) => {

        console.log('Movie Detail ', detail)
        this.movie = detail

        console.log('Credits', credits)
        this.actors = credits.cast

      })

    /* this.storageService.get("movies_favorites").then(resp=>console.log(resp)) */

  }

  addFavorite() {
    this.movieFavorite = !this.movieFavorite
    this.storageService.saveMovie(this.movie)
  }

  back() {
    this.modalCtrl.dismiss()
  }



}
