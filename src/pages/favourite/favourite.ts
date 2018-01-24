import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { FilterPage } from '../filter/filter';


@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html'
})
export class FavouritePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  gotomodelfilter() {
    let modal = this.modalCtrl.create(FilterPage);
    modal.present();
  }

}