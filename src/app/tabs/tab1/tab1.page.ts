import { Component, HostListener, OnInit } from '@angular/core';
import { MoviedbService } from '../../services/moviedb.service';
import { Movie } from '../../types.movies';
import { fromEvent, Observable, Subscription } from "rxjs";
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  movies: any[] = []
  popularMovies: Movie[] = []
  isEditable = false;

  loading: any


  /* Para escuchar cuando cambia el width de la pantalla */
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription


  constructor(public moviesService: MoviedbService,
    private menu: MenuController, public loadingController: LoadingController) { }

  async ngOnInit() {

    await this.presentLoading()

    this.onResize()

    this.moviesService.getFeature().subscribe((resp) => {
      console.log('Feature', resp);
      this.movies = resp.results
    }, (error) => { },
      () => {
        this.loading.dismiss();
      })

    this.getPopulars()
  }

  openMenu() {
    this.menu.open('first');
  }

  /* Para escuchar cuando cambia el width de la pantalla */
  onResize() {
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {
      console.log('event:Resize ', evt.target.innerWidth)
    })
  }

  loadMore() {
    this.getPopulars()
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });

    this.loading.present();

  }


  getPopulars() {
    this.moviesService.getPopulars().subscribe((resp) => {
      console.log('Populars', resp);
      this.popularMovies = this.popularMovies.concat(...resp.results)
    }, (error) => { },
      () => {
        this.loading.dismiss();

      })
  }

  onPlayerReady(event) {

    if (screen.width < 700) {

    }
  }




}
