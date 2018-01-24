import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { RatePage } from '../rate/rate';
import { GalleryPage } from '../gallery/gallery';
import 'rxjs/add/operator/map';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CommonProvider} from '../../providers/common/common';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';

@Component({
  selector: 'page-hospitaldetail',
  templateUrl: 'hospitaldetail.html'
})
export class HospitaldetailPage {
     public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
     loading = this.Loading;
    hospital_id;
    detailhosp;
    hospgallary;
    
     hosptitle;
    public hospcity ='';
    public hospcountry ='';
    public hospdescription ='';
      
  constructor(public navCtrl: NavController, public menu: MenuController,
      public navParams:NavParams, public app:App,
      public modalCtrl: ModalController,public http:Http,public common:CommonProvider, public loadingCtrl:LoadingController,public toastCtrl:ToastController ) {
    this.menu.swipeEnable(false);
    this.hospital_id= this.navParams.get('hosp_id');
//    alert(this.hospital_id);
    this.hospdetail();
  }

  bktolist(){
    this.navCtrl.push(ListPage);
   }

   modelrate() {
    let modal = this.modalCtrl.create(RatePage);
    modal.present();
  }

  gallery(gal,ids,tit){
    this.navCtrl.push(GalleryPage,{gallary:gal,hospid:ids,title:tit});
   }
   hospdetail(){
//        alert("detailing");
       var data = {
       id:this.hospital_id
     }
     console.log(data);
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'hospitaldetail', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    this.Loading.dismiss();
      if(data.error == '0'){
//       alert("data displayed");
          this.detailhosp = data.data;
          this.hosptitle = data.data.title;
          this.hospcity = data.data.city;
          this.hospcountry = data.data.country;
          this.hospdescription = data.data.description;
          this.hospgallary = data.data.image.split(',');
          console.log(this.hospgallary);
       console.log(this.detailhosp);
      }else{
        //alert(data.message);
  let toast = this.toastCtrl.create({
     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
      }

    })
  
   }
   serializeObj(obj){
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
}