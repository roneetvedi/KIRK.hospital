import { Component } from '@angular/core';
import {CommonProvider} from '../../providers/common/common';
import { NavController, NavParams } from 'ionic-angular';
import { HospitaldetailPage } from '../hospitaldetail/hospitaldetail';


@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {
    hospital_gallary;
    hospital_id;
    galurl;
    hospital_title;
  constructor(public navCtrl: NavController,public navParams:NavParams,public common:CommonProvider) {
        this.hospital_gallary= this.navParams.get('gallary');
        this.hospital_id= this.navParams.get('hospid');
        this.hospital_title= this.navParams.get('title');
        this.galurl=this.common.gallary_url;
        console.log(this.hospital_gallary);
        console.log(this.hospital_id);
        console.log(this.hospital_title);
        console.log(this.galurl);
  }

  bktodtl(ids){
    this.navCtrl.push(HospitaldetailPage,{hosp_id:ids});
   }

}