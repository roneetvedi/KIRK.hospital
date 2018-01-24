import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';
import { NotificationPage } from '../notification/notification';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
     public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
     loading = this.Loading;
public userid='';
public showdata='';
public prfimage ='';
public editname=''; 
public edittype='';
public editcity='';
public editcountry='';
public editstatus='';
public editdescription='';
public editdrom='';
public editto='';
public edittime='';
public editexp='';
public editedu='';
public editcharges='';
public editawrd='';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,public http:Http,
    public common : CommonProvider, private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController, 
    public loadingCtrl:LoadingController, public menu: MenuController) {
  
    
        this.menu.swipeEnable(false);
    this.userid = localStorage.getItem("USERID");
    console.log(this.userid);
    this.show_details();
  }
  
 show_details(){
//     alert("showing details");
this.loading.present().then(() => {

    var data = {
      id :this.userid,
      
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
         this.prfimage = data.data.image;
        this.editname=data.data.username; 
        this.edittype=data.data.type;
        this.editcity=data.data.address_city;
        this.editcountry=data.data.address_country;
        this.editstatus=data.data.available_status;
        this.editdescription=data.data.description;
        this.editdrom=data.data.available_from;
        this.editto=data.data.available_to;
        this.edittime=data.data.shift;
        this.editexp=data.data.experiance;
        this.editedu=data.data.education;
        this.editcharges=data.data.charges;
        this.editawrd=data.data.awards;
        console.log(this.showdata);
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
       })
 }
 serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  edit(){
    this.navCtrl.push(EditprofilePage);
   }
  
   gtnotifctn(){
    this.navCtrl.push(NotificationPage);
   }
   

 
}
