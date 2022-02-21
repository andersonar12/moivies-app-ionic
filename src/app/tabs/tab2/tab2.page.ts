import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from 'src/app/components/detail/detail.component';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { Movie } from 'src/app/types.movies';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textSearch = ''
  moviesSearched: Movie[] = []
  loading = false
  ideas: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'La vida es bella']

  constructor(private moviedbService: MoviedbService, private modalCtrl: ModalController) { }

  onSearchChange(event) {
    const query = event.detail.value

    if (query == '') {
      this.moviesSearched = []
      return
    }
    console.log(query);
    this.loading = true
    this.moviedbService.searchMovies(query)
      .subscribe(({ results }) => {

        console.log(results)
        this.loading = false
        this.moviesSearched = results

      }, (error) => {
        this.moviesSearched = []
        this.loading = false
      })
  }

  async openDetail(id: number) {

    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      },
      mode: 'ios'
    })

    modal.present()
  }
}
