import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public menu: MenuController) { }

  closeMenu = () => this.menu.close('first')
}
