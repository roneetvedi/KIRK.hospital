import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ListPage } from '../list/list';
// import { ModalController } from 'ionic-angular';
// import { ConfirmationPage } from '../confirmation/confirmation';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {

  constructor(public navCtrl: NavController, public menu: MenuController,  public alertCtrl: AlertController) {
    this.menu.swipeEnable(false);
  }

  //  modelcnfrmatn() {
  //   let modal = this.modalCtrl.create(ConfirmationPage);
  //   modal.present();
  // }

  cnfrmatn() {
    let confirm = this.alertCtrl.create({
      title: ' <div class="ttl">Confirmation</div> ',
      message: '<p class="msg">Do you really want to  accept?</p>',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          
          }
        },
     
        {
          text: 'OK',
          handler: () => {
            console.log('Agree clicked');
            
              this.navCtrl.push(ListPage);
             

          }
        }
        
      ],
      cssClass: 'alertCustomCss'
    });
    // confirm.setCssClass('custom-confirm');
    confirm.present();
  }
  
}