import { Component,NgModule  } from '@angular/core';
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
    user_id;
    detailhosp;
    hospgallary;
      hospid;
     hosptitle;url;
     public review='';
     public reviewdata='';
     public favdata='';
    public hospcity ='';
    public hospcountry ='';
    public hospdescription ='';
      public hospbanner='';
      public hospitalid='';
  constructor(public navCtrl: NavController, public menu: MenuController,
      public navParams:NavParams, public app:App,
      public modalCtrl: ModalController,public http:Http,public common:CommonProvider, public loadingCtrl:LoadingController,public toastCtrl:ToastController ) {
    this.menu.swipeEnable(false);
    this.hospital_id= this.navParams.get('hosp_id');
    this.user_id = localStorage.getItem("USERID");
//    alert(this.hospital_id);
    this.hospdetail();
  }

  bktolist(){
    this.navCtrl.push(ListPage);
   }

   modelrate(ids) {
    let modal = this.modalCtrl.create(RatePage,{review:ids});
    modal.present();
  }

  gallery(gal,ids,tit){
    this.navCtrl.push(GalleryPage,{gallary:gal,hospid:ids,title:tit});
   }
   hospdetail(){
//        alert("detailing");
       var data = {
           user_id:this.user_id,
       id:this.hospital_id
     }
      this.loading.present().then(() => {
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
          this.review=data.avr_rating;
          localStorage.setItem('AVG',data.avr_rating);
          this.detailhosp = data.data[0];
          console.log(this.detailhosp);
          this.hospitalid = data.data[0]._id;
          localStorage.setItem('HOSPID',this.hospitalid);
          this.hosptitle = data.data[0].title;
          console.log(this.hosptitle);
          this.hospcity = data.data[0].city;
          this.hospbanner=data.data[0].bannerimage;
          console.log(this.hospbanner);
          this.hospcountry = data.data[0].country;
          this.hospdescription =data.data[0].description;
          this.favdata=data.likestatus;
          console.log(this.favdata);
          this.hospgallary = data.data[0].image.split(',');
           this.url = this.common.banner_url;
           this.reviewdata=data.data[0].reviews_info;
           console.log(this.reviewdata);

//          console.log(this.hospgallary);
//       console.log(this.detailhosp);
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
      })
   }
   serializeObj(obj){
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  favourite(){
  var Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
      var data = {
          hospital_id:this.hospital_id,
          user_id:this.user_id
      }
       Loading.present().then(() => {
//      alert(JSON.stringify(data));
      var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'favorite/add', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    Loading.dismiss();
      if(data.error == '0'){
//       alert("data displayed");
       this.favdata=data.status;
       console.log(this.favdata);
       let toast = this.toastCtrl.create({
     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
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
    })
  }

}