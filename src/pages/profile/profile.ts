import { Component } from '@angular/core';
import { NavController,NavParams,Events } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';
import { NotificationPage } from '../notification/notification';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
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
    public editdocs='';
    _imageViewerCtrl: ImageViewerController;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,public http:Http,public events:Events,
    public common : CommonProvider, private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,public imageViewerCtrl: ImageViewerController,
    public loadingCtrl:LoadingController, public menu: MenuController) {
  
        this._imageViewerCtrl = imageViewerCtrl;
        this.menu.swipeEnable(false);
    this.userid = localStorage.getItem("USERID");
    console.log(this.userid);
    this.show_details();
  }
  
 show_details(){
var Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
Loading.present().then(() => {

    var data = {
      id :this.userid,
      
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'users/userdetailbyid', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//        alert(JSON.stringify(data));
    console.log(data);
    Loading.dismiss();
      if(data.error == 0){

        this.showdata=data.data;
         this.prfimage = data.data.image;
         localStorage.setItem('USERIMG',data.data.image);
      
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
        this.editdocs=data.data.docs;
        console.log(this.editdocs);
          this.events.publish('user:login');
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
 presentImage(youImage) {
//      alert("ncj");
    const imageViewer = this._imageViewerCtrl.create(youImage);
    imageViewer.present();
 
    setTimeout(() => imageViewer.dismiss(),3000);
    imageViewer.onDidDismiss(() => console.log('Viewer dismissed'));
  } 

 
}
