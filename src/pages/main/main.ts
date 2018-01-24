import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  constructor(public navCtrl: NavController) {

  }
  signup(){
    this.navCtrl.push(SignupPage);
   }

   lgin(){
    this.navCtrl.push(SigninPage);
   }

}
