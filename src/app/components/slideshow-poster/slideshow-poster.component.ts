import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { MovieDetailResponse } from 'src/app/types.movies';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit{
  @Input() movies: MovieDetailResponse[]=[]


  @ViewChild('slides') slides: IonSlides;

  constructor(private modalCtrl:ModalController) { }
  
  ngOnInit() {
    
  }

  /* ngOnChanges(changes: SimpleChanges) {
    if (changes['movies'].currentValue.length > 0 && changes['movies'].previousValue.length == 0) {
      this.movies = this.movies.map( (element)=> {  element.genres.includes(this.genre)})
    }
} */


  /* IonSlides Events */
  next() {
    this.slides.slideNext();
    this.autoplay()
  }

  prev() {
    this.slides.slidePrev();
    this.autoplay()
  }

  autoplay(){
    setTimeout(() => {
      this.slides.startAutoplay()
    }, 2000);
  }
   /* IonSlides Events */

  async openDetail(id:number){

    const modal = await this.modalCtrl.create({
      component:DetailComponent,
      componentProps:{
        id
      },
      mode: 'ios'
    })

    modal.present()

  }

}
