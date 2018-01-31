import { Component } from '@angular/core';
import { NavController, Events,MenuController  } from 'ionic-angular';
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
import { SignupsocialPage } from '../signupsocial/signupsocial';
import { ListPage } from '../list/list';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
    public chkid="";
    userTwtid: string;
    userTwitterResp: any;
    userTwt: string;
    public emaildata="";
    public namedata="";
    public iduser="";
    public type='';
    showdata;
 public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  public data='';
  loading = this.Loading;
  constructor(public navCtrl: NavController,
                public navParams: NavParams,public events: Events,
                public http:Http,private fb: Facebook,public nativeStorage: NativeStorage,private googlePlus: GooglePlus,public menu: MenuController,
                public common : CommonProvider, public loadingCtrl:LoadingController,private twitter: TwitterConnect,private toastCtrl: ToastController) {
this.menu.swipeEnable(false);
  }

  signn(){
    this.navCtrl.push(SigninPage);
   }
signup_form(signup)
        {
//            alert('signup');
          this.loading.present().then(() => {
     if(signup.value.password=signup.value.cpassword){
        
        console.log(this.common.options);
        var optionss = this.common.options;
      
        var data1={
          username:signup.value.username,
          email:signup.value.email,
          password:signup.value.password,
          type : signup.value.type
        }
        console.log(data1);
       
        var Serialized = this.serializeObj(data1);
        console.log(Serialized);
       
        console.log(data1);
          this.http.post(this.common.base_url +'users/register',Serialized, optionss).map(res=>res.json()).subscribe(data=>{
          // alert(data);
          // alert(JSON.stringify(data));
          this.Loading.dismiss();
            console.log(data);
          
           
            if(data.error == 0){
                 this.chkid = JSON.stringify(data.data);
//        alert(this.chkid);
                   localStorage.setItem('USERDATA',this.chkid);
         localStorage.setItem('USERID',data.data.id);
        
//         localStorage.setItem('USEREMAIl',data.userinfo.email);
          this.events.publish('user:login');
            this.navCtrl.push(ProcessPage);
                let toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
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
            message:"your password and Confirn password doesnot match",
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
           facebook(){
//      alert('faceboo');
       
    let permissions = new Array<string>();
    let nav = this.navCtrl;

    //the permissions your facebook app needs from the user
    permissions = ['public_profile', 'user_friends', 'email'];

    this.fb.login(permissions)
    .then((response) => {
      // alert("response");
      // alert(response);
      //  alert(JSON.stringify(response));
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      this.fb.api("/me?fields=id,email,name,birthday,locale,age_range,gender,first_name,last_name,picture", params)
      .then((user) => {
        // alert("user");
        // alert(user);
        // alert(JSON.stringify(user));
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        this.nativeStorage.setItem('user',
        {
          email: user.email,
          username: user.name,
          image: user.picture
        })

        .then(() => {
          // alert( user.email);
    
          this.Loading.present();
var fb_data = {
      id:user.id,
      type:"facebook"
}
    
// alert(JSON.stringify(fb_data))
var Serialized = this.serializeObj(fb_data);
console.log(this.common.options);
var optionss = this.common.options;
this.http.post(this.common.base_url + 'allinoneexist', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//   alert('data');
//   alert(JSON.stringify(data));
    console.log(data);
    

 if(data.error == 1){
       this.Loading.dismiss();
       this.emaildata=user.email;
       this.namedata=user.name;
       this.iduser=user.id;
       this.type="facebook";
        localStorage.setItem('FBDATA', JSON.stringify(data.data));
       this.navCtrl.push(SignupsocialPage,{email:this.emaildata,name:this.namedata,id:this.iduser,type:this.type});
       let toast = this.toastCtrl.create({
//     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
   
      
    
    
     }else{
       //alert(data.msg)
//      this.navCtrl.push(ProcessPage);
     localStorage.setItem('FBDATA', JSON.stringify(data.data));
            localStorage.setItem('USERID',data.data.id);
       let toast = this.toastCtrl.create({
//     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
    
    this.chkuser();
     }
  })

     


        },(error) => {
          console.log(error);
        })
      })
    }, (error) => {
      console.log(error);
    });

  }
  googleplus(){
//      alert('google');
      this.googlePlus.login({}).then(res =>{
//    alert(JSON.stringify(res));


    var data_google = {
            type:"google+",
            id : res.userId

          }
          // alert('google data');
//           alert(JSON.stringify(data_google));
            console.log(this.common.options);
            var optionss = this.common.options;
          var serialized_google = this.serializeObj(data_google);
          console.log(serialized_google);
          this.http.post(this.common.base_url + 'allinoneexist', serialized_google, optionss).map(res=>res.json()).subscribe(data=>{
        
          this.Loading.dismiss();
//          alert(JSON.stringify(data))
if(data.error == 1){
//    alert("in");
       this.emaildata=res.email;
       this.namedata=res.givenName;
       this.iduser=res.userId;
       this.type="google+";
         localStorage.setItem('GOGDATA', JSON.stringify(data.data));
//         localStorage.setItem('USERID',data.data._id);
       this.navCtrl.push(SignupsocialPage,{email:this.emaildata,name:this.namedata,id:this.iduser,type:this.type});
       let toast = this.toastCtrl.create({
//     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
   
      
    
    
     }else{
       //alert(data.msg)
                localStorage.setItem('GOGDATA', JSON.stringify(data.data));
                  localStorage.setItem('USERID',data.data.id);
//      this.navCtrl.push(ProcessPage);
       let toast = this.toastCtrl.create({
//     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
    
        this.chkuser();
     }
  })
 })
   
  }
   twitter_login(){
      this.Loading.present();
//     alert("twitter");
     this.twitter.login().then(response => {
//       alert(JSON.stringify(response));
//       alert(JSON.stringify(response.userId));
       this.userTwt = response.userName;
         this.userTwtid = response.userId;
//       alert(this.userTwt);
       //const twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
 
//       firebase.auth().signInWithCredential(twitterCredential).then(userTwitter => {
       
          // this.userTwitterResp = userTwitter;
         
           var data_tw = {
            
             id :  this.userTwtid,
             type:"twitter"
            
           }
        var optionss = this.common.options;
            var serialized_tw = this.common.serializeObj(data_tw);
            console.log(serialized_tw);
            this.http.post(this.common.base_url + 'allinoneexist', serialized_tw, optionss).map(res=>res.json()).subscribe(data=>{
//          alert("allinone"+ JSON.stringify(data));
          this.Loading.dismiss();
if(data.error == '1'){
       this.emaildata="null";
       this.namedata= response.userName;
       this.iduser=this.userTwtid;
       this.type="twitter";
       
        localStorage.setItem('TWTDATA', JSON.stringify(data.data));

       this.navCtrl.push(SignupsocialPage,{email:this.emaildata,name:this.namedata,id:this.iduser,type:this.type});
       let toast = this.toastCtrl.create({
     message: "twitter don't provide email due to security reasons",
     duration: 3000,
     position: 'middle'
   });
    toast.present();
   
      
    
    
     }else{
       //alert(data.msg)
       localStorage.setItem('TWTDATA', JSON.stringify(data.data));
         localStorage.setItem('USERID',data.data.id);
//      this.navCtrl.push(ProcessPage);
       let toast = this.toastCtrl.create({
//     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
    this.chkuser();
     }
  })

     


        })
  }
     chkuser(){
      var userid = localStorage.getItem("USERID");
        var data = {
      id :userid
      
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'users/userdetailbyid', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    this.Loading.dismiss();
      if(data.error == 0){ 

        this.showdata=data.data;
        console.log(this.showdata);
        this.chkuser=data.data.complete_status;
//         alert(this.chkuser);
        if(data.data.complete_status == 0){
     
           localStorage.setItem('USEREMAIL',data.data.email);
         localStorage.setItem('USERNAME',data.data.username);
         localStorage.setItem('USERIMG',data.data.picture);
              this.events.publish('user:login');
             this.navCtrl.push(ProcessPage);
             let toast = this.toastCtrl.create({
     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
    this.events.publish('user:login');
        }else{

        localStorage.setItem('USEREMAIL',data.data.email);
         localStorage.setItem('USERNAME',data.data.username);
         localStorage.setItem('USERIMG',data.data.picture);
              this.events.publish('user:login');
           this.navCtrl.push(ListPage);
             let toast = this.toastCtrl.create({
     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
    this.events.publish('user:login');
        }
      }

    })
  }
  }

