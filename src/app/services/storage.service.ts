import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { MovieDetailResponse } from '../types.movies';
@Injectable({
  providedIn: 'root'
})

export class StorageService {

  public movies: MovieDetailResponse[] = []


  private _storage: Storage | null = null;

  constructor(private storage: Storage, public toastController: ToastController) {
    this.loadMoviesFavorites()
    /* this.init() */;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  async init() {

    try {
      this.storage.length().then((lenght) => {
        console.log(lenght);
      })

    } catch (error) {
      console.log(error)
      const storage = await this.storage.create();
      this._storage = storage;
    }

  }

  async saveMovie(movie) {

    let message = ''

    const result = this.movies.find(element => element.id == movie.id)

    if (result) {
      this.movies = this.movies.filter(element => element.id !== movie.id)
      message = 'Removido de Favoritos'

    } else {
      this.movies.push(movie)
      message = 'Agregada a Favoritos'
    }

    console.log('Peliculas almacenadas', this.movies);
    this.presentToast(message)

    /* localStorage.setItem('movies_favorites',JSON.stringify(this.movies) ) */

    /* return await this._storage?.set('movies_favorites', this.movies); */

    return localStorage.setItem('movies_favorites', JSON.stringify(this.movies))
  }

  async loadMoviesFavorites() {

    /* await this._storage?.get('movies_favorites').then(res=>{
      this.movies = res || []
    }) */

    this.movies = await JSON.parse(localStorage.getItem('movies_favorites')) || []


    return this.movies
  }

  async movieExists(id: number) {

    await this.loadMoviesFavorites()
    const finded = this.movies.find(element => element.id === id)

    return (finded) ? true : false
  }

  /* --------------------- */

  /* public set(key: string, value: any) {
    this._storage?.set(key, value);
  } */


  /* To get the item back, use get(name): */

  /* public async get(key: string) {
    return await this._storage?.get(key);
  } */

  /* To remove an item: */

  /* public remove(key: string) {
    return this._storage?.remove(key);
  } */

  /* To clear all items: */

  /* public clear() {
    return this._storage?.clear();
  } */

  /* To get all keys stored: */
  /* public getKeys() {
    return this._storage?.keys();
  } */


}
