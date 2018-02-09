import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {
    public rating="";
  constructor(public navCtrl: NavController) {

  }
 
  backtolist(){
    this.navCtrl.popTo(ListPage);
   }
   backtomain(){
       this.navCtrl.push(ListPage);
   }
   backbyrating(){
//       alert("fd");
       this.rating="rating";
       this.navCtrl.push(ListPage, {rating: this.rating});
   }
}
