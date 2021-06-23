import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParesPipe } from './pares.pipe';
import { GenresFilterPipe } from './genres-filter.pipe';



@NgModule({
  declarations: [ParesPipe, GenresFilterPipe],
  imports: [
    CommonModule
  ],
  exports:[ParesPipe,GenresFilterPipe]
})
export class PipesModule { }
