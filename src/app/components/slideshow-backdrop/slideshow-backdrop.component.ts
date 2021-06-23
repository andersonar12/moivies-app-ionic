import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Movie } from 'src/app/types.movies';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() movies: Movie[]=[]

  @ViewChild('slides') slides: IonSlides;

  constructor(private modalCtrl:ModalController) { }

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

  ngOnInit() {}

  async openDetail(id:number){

    const modal = await this.modalCtrl.create({
      component:DetailComponent,
      componentProps:{
        id,
      },
      mode: 'ios'
    })

    modal.present()

  }

}
