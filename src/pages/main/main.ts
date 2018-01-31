import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  constructor(public navCtrl: NavController,public menu: MenuController,) {
        this.menu.swipeEnable(false);

  }
  signup(){
    this.navCtrl.push(SignupPage);
   }

   lgin(){
    this.navCtrl.push(SigninPage);
   }

}
