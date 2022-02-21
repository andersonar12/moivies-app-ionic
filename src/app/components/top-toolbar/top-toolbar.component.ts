import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
})
export class TopToolbarComponent implements OnInit {

  @Input('title') title: string

  constructor(public menu: MenuController) { }

  ngOnInit() { }

}
