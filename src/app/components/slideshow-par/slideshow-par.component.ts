import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Movie } from 'src/app/types.movies';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-par',
  templateUrl: './slideshow-par.component.html',
  styleUrls: ['./slideshow-par.component.scss'],
})
export class SlideshowParComponent implements OnInit {

  @Input() movies: Movie[]=[]
  @Output() loadMore = new EventEmitter()
  @ViewChild('slides') slides: IonSlides;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  onClick(){
    this.loadMore.emit()
  }

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
