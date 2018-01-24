import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PrivacypolicyPage } from '../privacypolicy/privacypolicy';
import { TermsandconditionsPage } from '../termsandconditions/termsandconditions';
import { AboutusPage } from '../aboutus/aboutus';

@Component({
  selector: 'page-information',
  templateUrl: 'information.html'
})
export class InformationPage {

  constructor(public navCtrl: NavController) {

  }

  gotoabout(){
    this.navCtrl.push(AboutusPage);
   }

   gotopolicy(){
    this.navCtrl.push(PrivacypolicyPage);
   }

   gototerms(){
    this.navCtrl.push(TermsandconditionsPage);
   }
}
