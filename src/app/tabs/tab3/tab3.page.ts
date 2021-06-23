import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { MoviedbService } from 'src/app/moviedb.service';
import { StorageService } from 'src/app/storage.service';
import { Genre, Movie, MovieDetailResponse } from 'src/app/types.movies';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements ViewDidEnter,ViewWillLeave{

  movies:MovieDetailResponse[]=[]
  genres:Genre[]=[]

  modalDismissSubs: Subscription

  constructor(private storageService:StorageService,private movieDbService:MoviedbService) { }
 

  ngOnInit(){}
  
  
  async ionViewDidEnter(){
    this.movieDbService.getGenresMovies().subscribe((genres)=>{this.genres = genres})
    this.movies = await this.storageService.loadMoviesFavorites()
    this.dismissModal()
  }

  ionViewWillLeave() {
    this.modalDismissSubs.unsubscribe()
  }


  dismissModal(){

    const modalDismiss = fromEvent(document, 'click');

    this.modalDismissSubs = modalDismiss.subscribe(async(res:any)=>{

      if ( res.toElement.outerText == 'Regresar') {
        console.log(res);
        this.movies = await this.storageService.loadMoviesFavorites() 
      }   
    })
    
  }
}
