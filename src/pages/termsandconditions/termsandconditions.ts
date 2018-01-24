import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ToastController } from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';

import { InformationPage } from '../information/information';

@Component({
  selector: 'page-termsandconditions',
  templateUrl: 'termsandconditions.html'
})
export class TermsandconditionsPage {
  public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  loading=this.Loading;
  public data='';
  public datadisp:any;
 
  constructor(public navCtrl: NavController,public http:Http,
  public common : CommonProvider,
   public loadingCtrl:LoadingController,
   private toastCtrl: ToastController) {
this.TNC()
  }

TNC(){
    
 
//alert("hi")
 var data ={
  type: 'Terms And Conditions'
}
 var Serialized = this.serializeObj(data);

var optionss = this.common.options;
 this.http.post(this.common.base_url +'pagedetail', Serialized, optionss).map(res=>res.json()).subscribe(data=>{	
//   this.Loading.dismiss();
if(data.error == '0'){
 this.datadisp = data.data[0];

   console.log(this.datadisp);
   let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
   //alert(data.msg);
   
   
}else{
  let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
 // alert(data.msg);
}
 })
     
 }
  backtoinformtn(){
    this.navCtrl.push(InformationPage);
   }
 
serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
 
}
