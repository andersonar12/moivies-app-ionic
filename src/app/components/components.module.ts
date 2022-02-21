import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParComponent } from './slideshow-par/slideshow-par.component';
import { PipesModule } from '../pipes/pipes.module';
import { DetailComponent } from './detail/detail.component';
import { StorageService } from '../services/storage.service';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';



@NgModule({
  declarations: [SlideshowBackdropComponent, SlideshowPosterComponent, SlideshowParComponent, DetailComponent, TopToolbarComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParComponent,
    DetailComponent,
    TopToolbarComponent
  ],
  entryComponents: [DetailComponent]
})
export class ComponentsModule { }
