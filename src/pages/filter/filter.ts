import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {

  constructor(public navCtrl: NavController) {

  }
 
  backtolist(){
    this.navCtrl.popTo(ListPage);
   }
}
