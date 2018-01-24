import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App} from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ToastController } from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import { ForgetpasswordPage } from '../forgetpassword/forgetpassword';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html'
})
export class ChangepasswordPage {
public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
 public data='';
 Useremail='';
 loading = this.Loading;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public common : CommonProvider,
   public http:Http,
   private toastCtrl: ToastController, public loadingCtrl:LoadingController,public app:App, public menu: MenuController) {
   this.Useremail=localStorage.getItem('USEREMAIL');
   console.log(this.Useremail);
  }
 
  backtoforgt(){
    this.navCtrl.push(ListPage);
   }
changepassword(form){
    this.loading.present().then(() => {
    console.log(form);
 console.log(form.value.password);
	// alert("changing password");
//var User = localStorage.getItem("USERID");
//var Useremail = localStorage.getItem("USEREMAIl");
//console.log(User)

if (form.value.newpassword == form.value.conpassword) {
 var data ={
        email:this.Useremail, // old
        newpassword : form.value.newpassword,  // new
      	password: form.value.password // retype
}
 console.log(data);
var Serialized = this.serializeObj(data);
console.log(Serialized);
 console.log(this.common.options);
var optionss = this.common.options;
 this.http.post(this.common.base_url +'changePassword', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
this.Loading.dismiss();
if(data.error == 0){
  let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
  this.app.getRootNav().setRoot(ListPage);
	
 
}else{
     let toast = this.toastCtrl.create({
     message: data.message,
     duration: 3000,
     position: 'middle'
  });
     toast.present();
  
}
   
   })
}else{
  let toast = this.toastCtrl.create({
    message: "Passwords do not match",
    duration: 3000,
    position: 'middle'
  });
  toast.present();
  //alert("Passwords do not match");
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
