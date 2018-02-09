import { Component,NgModule  } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import { HospitaldetailPage } from '../hospitaldetail/hospitaldetail';
import { Ionic2RatingModule } from 'ionic2-rating';
import 'rxjs/add/operator/map';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CommonProvider} from '../../providers/common/common';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html'
})
export class RatePage {
    public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
     loading = this.Loading;
public hospitalid='';
user_id;rate;review;
public data:any={};
  constructor(public navCtrl: NavController,
      public navParams:NavParams, public app:App,public http:Http,public common:CommonProvider, public toastCtrl:ToastController,
      public loadingCtrl:LoadingController ) {
      this.hospitalid = localStorage.getItem('HOSPID');
      this.user_id = localStorage.getItem("USERID");
        console.log(this.hospitalid);
        this.review = localStorage.getItem('AVG');
        console.log(this.review);
  }
 onModelChange($event){
//      alert("");
      console.log($event);
      this.rate=$event
  }

  hosptldtl(reviewForm){
//      alert("form");
     var data = {
     user_id:this.user_id,
     hospital_id:this.hospitalid,
     text:reviewForm.value.notes,
     rating:this.rate,
     avgrate: this.review
     }
 this.loading.present().then(() => {
     console.log(data);
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'reviews/add', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    this.Loading.dismiss();
      if(data.error == '0'){
          
             this.navCtrl.push(HospitaldetailPage,{hosp_id:this.hospitalid});
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
   serializeObj(obj){
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }


   backtohosptldtl(){
    this.navCtrl.popTo(HospitaldetailPage);
   }
 
}
