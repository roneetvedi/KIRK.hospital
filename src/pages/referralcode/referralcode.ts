import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
@Component({
  selector: 'page-referralcode',
  templateUrl: 'referralcode.html'
})
export class ReferralcodePage {

  constructor(public navCtrl: NavController) {

  }
  nextlist(){
    this.navCtrl.push(ListPage);
   }
}
