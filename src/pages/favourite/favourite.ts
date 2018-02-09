import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController,NavParams,App } from 'ionic-angular';
import { FilterPage } from '../filter/filter';
import 'rxjs/add/operator/map';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CommonProvider} from '../../providers/common/common';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HospitaldetailPage } from '../hospitaldetail/hospitaldetail';

@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html'
})
export class FavouritePage {
userids;
public listfavdata='';
public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
     loading = this.Loading;
     url;
  constructor(public navCtrl: NavController,
      public navParams:NavParams, public app:App,
      public modalCtrl: ModalController,public http:Http,public common:CommonProvider, public loadingCtrl:LoadingController,public toastCtrl:ToastController) {
this.userids = localStorage.getItem("USERID");
    console.log(this.userids);
    this.hosplistfav();
  }
detail(ids){
//    alert("jh");
    this.navCtrl.push(HospitaldetailPage,{hosp_id:ids});
}
  gotomodelfilter() {
    let modal = this.modalCtrl.create(FilterPage);
    modal.present();
  }
 hosplistfav(){
//       alert("list");
       var data = {
       user_id:this.userids
     }
//       alert(JSON.stringify(data));
    console.log(data);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'favorite/list', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
      if(data.error == '0'){
//       alert("data displayed");
          this.listfavdata=data.data;
          console.log(this.listfavdata);
       this.url = this.common.banner_url;
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
  
   serializeObj(obj) {
    var result = []; 
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
}