import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController

  ) {
    this.initializeApp();
    this.toggleMenu()
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  toggleMenu() {
    const source = fromEvent(document, 'click');

    source.subscribe((res:any)=>{
      
      if(res.srcElement.classList[0] == 'menu-toggle'){
        console.log(res.srcElement.classList[0])
        this.menu.open('first');
      }
    
    })
    
  }
}
