import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


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
    public menu: MenuController
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  /* Deprecated */
  // toggleMenu() {
  //   const source = fromEvent(document, 'click');

  //   source.subscribe((res: any) => {
  //     if (res.srcElement.classList[0] == 'menu-toggle') {
  //       console.log(res.srcElement.classList[0])
  //       this.menu.open('first');
  //     }
  //   })

  // }




}
