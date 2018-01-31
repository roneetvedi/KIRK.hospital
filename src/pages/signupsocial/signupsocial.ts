import { Component } from '@angular/core';
import { NavController, Events,MenuController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { ProcessPage } from '../process/process';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CommonProvider} from '../../providers/common/common';
import { NativeStorage } from '@ionic-native/native-storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import {LoadingController, NavParams} from 'ionic-angular';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { ListPage } from '../list/list';
@Component({
  selector: 'page-signupsocial',
  templateUrl: 'signupsocial.html'
})
export class SignupsocialPage {
    userTwtid: string;
    userTwitterResp: any;
    userTwt: string;
 public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  public data='';
  public useremail="";
  public name='';
  public iduser="";
  public type="";
  public picuser='';
  showdata:"";
  loading = this.Loading;
  constructor(public navCtrl: NavController,
                public navParams: NavParams,public events:Events,public menu:MenuController,
                public http:Http,private fb: Facebook,public nativeStorage: NativeStorage,private googlePlus: GooglePlus,
                public common : CommonProvider, public loadingCtrl:LoadingController,private twitter: TwitterConnect,private toastCtrl: ToastController) {
                this.useremail=this.navParams.get('email');
                 this.name=this.navParams.get('name');
                 this.iduser=this.navParams.get('id');
                 this.type=this.navParams.get('type');
                 this.picuser = this.navParams.get('pic');
                 this.menu.swipeEnable(false);
//                 alert(this.useremail);
//                 alert(this.name);
//                 alert(this.iduser);
//                 alert(this.type);
  }

  signn(){
    this.navCtrl.push(SigninPage);
   }
signup_form(signup)
        {
    
          this.loading.present().then(() => {
        
        console.log(this.common.options);
        var optionss = this.common.options;
      if(this.type=="facebook"){
//          alert("type mila hai facebook");
        var fb_data = {
      username:signup.value.username,
      facebook_id:this.iduser,
      email:signup.value.email,
      type:signup.value.type,
      password:'rakesh@123',
      image: this.picuser
}
       
       
        var Serialized = this.serializeObj(fb_data);
        console.log(Serialized);
       
       
          this.http.post(this.common.base_url +'fbregister',Serialized, optionss).map(res=>res.json()).subscribe(data=>{
          // alert(data);
          // alert(JSON.stringify(data));
          this.Loading.dismiss();
            console.log(data);
          
           
            if(data.error == 0){
//            localStorage.setItem('FBDATA', JSON.stringify(data.data));
              localStorage.setItem('USERID',data.data.id);
             let toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.chkuser();
            }else{
              let toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
             
            }
          })
      }else if(this.type=="google+"){
//           alert("type mila hai google+");
        var g_data = {
      username:signup.value.username,
      google_id:this.iduser,
      email:signup.value.email,
      type:signup.value.type,
      password:'rakesh@123',
      image: this.picuser
}
       
       
        var Serialized = this.serializeObj(g_data);
        console.log(Serialized);
       
       
          this.http.post(this.common.base_url +'googlelogin',Serialized, optionss).map(res=>res.json()).subscribe(data=>{
          // alert(data);
          // alert(JSON.stringify(data));
          this.Loading.dismiss();
            console.log(data);
          
           
            if(data.error == 0){
            localStorage.setItem('GOGDATA', JSON.stringify(data.data));
              localStorage.setItem('USERID',data.data.id);
             let toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.chkuser();
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
//          alert("type mila hai twitter");
        var tw_data = {
      username:signup.value.username,
      twitter_id:this.iduser,
      email:signup.value.email,
      type:signup.value.type,
      password:'rakesh@123',
      image: this.picuser
}
       
       
        var Serialized = this.serializeObj(tw_data);
        console.log(Serialized);
       
       
          this.http.post(this.common.base_url +'twitterlogin',Serialized, optionss).map(res=>res.json()).subscribe(data=>{
          // alert(data);
//           alert(JSON.stringify(data));
          this.Loading.dismiss();
            console.log(data);
          
           
            if(data.error == 0){
//            localStorage.setItem('TWTDATA', JSON.stringify(data.data));
              localStorage.setItem('USERID',data.data.id);
            let toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.chkuser();
            }else{
              let toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
             
            }
          })
      }
          })
        
          
        }
         serializeObj(obj) {
            var result = [];
            for (var property in obj)
              result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

            return result.join("&");
          }
           chkuser(){
//               alert('chkng user');
      var userid = localStorage.getItem("USERID");
//      alert(JSON.stringify(userid));
        var data = {
      id :userid
      
    }
//    alert(JSON.stringify(data));
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'users/userdetailbyid', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//    alert(JSON.stringify(data));
    this.Loading.dismiss();
      if(data.error == '0'){

        this.showdata=data.data;
//        alert(JSON.stringify(this.showdata));
        
        this.chkuser=data.data.complete_status;
//         alert(this.chkuser);
        if(data.data.complete_status == '0'){
//           alert("bhai ko nhi jane daina");
                 
         localStorage.setItem('USEREMAIL',data.data.email);
         localStorage.setItem('USERNAME',data.data.name);
         localStorage.setItem('USERIMG',data.data.picture);
           this.events.publish('user:login');
             this.navCtrl.push(ProcessPage);
        }else{
          
         localStorage.setItem('USEREMAIL',data.data.email);
         localStorage.setItem('USERNAME',data.data.name);
         localStorage.setItem('USERIMG',data.data.picture);
           this.events.publish('user:login');
//        alert("bhai ko janedo");
           this.navCtrl.push(ListPage);
            
        }
       
  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      
     

      }else{
        //alert(data.message);
  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      }

    })
  }
  }

