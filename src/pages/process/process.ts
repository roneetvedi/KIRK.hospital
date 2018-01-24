import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { ListPage } from '../list/list';
import { CalendarPage } from '../calendar/calendar';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import{App} from 'ionic-angular';
@Component({
  selector: 'page-process',
  templateUrl: 'process.html'
})
export class ProcessPage {
   public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
 loading = this.Loading;
public userid='';
public data = {};
public showdata='';
public countries='';
chkuser:any;
public prfimage='';
public image='';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,public http:Http,
    public app:App,private camera: Camera,
    public common : CommonProvider, private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController, 
    public loadingCtrl:LoadingController) {
  
    
    this.userid = localStorage.getItem("USERID");
    console.log(this.userid);
    this.country();
  }
 
country(){
//     alert('show countryrrr');
    var optionss = this.common.options;
this.loading.present().then(() => {

var optionss = this.common.options;

    this.http.get('http://ec2-52-59-3-162.eu-central-1.compute.amazonaws.com/freedrink/api/users/countryall', optionss).map(res=>res.json()).subscribe(data=>{
//    alert(JSON.stringify(data));
    this.Loading.dismiss();
    
//          alert("into all countryrrr")
        
        this.countries=data.country;
        console.log(data.country);
    
    })
       })
 }
 openActionSheet(){
               
               
                let actionsheet = this.actionSheetCtrl.create({
                title:"Choose Album",
                buttons:[{
                text: 'Camera',
                handler: () => {
                console.log("Camera Clicked");
                 this.Loading.present();
                  const options: CameraOptions = {
                  quality: 8,
                  sourceType : 1,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE
                }
                this.camera.getPicture(options).then((imageData) => {
                 
                  this.prfimage = "data:image/jpeg;base64," + imageData;
                  this.image=imageData;
                  localStorage.setItem("IMG",  this.prfimage);
                 localStorage.setItem("IMG",  this.prfimage);
                  // this.profile_image =  imageData; 
                    var data_img = ({
                                 user_id :this.userid,

               profile_picture :this.image
                      })
//                    alert("image" + JSON.stringify(data_img));
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'profilepicupload', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//                      alert(JSON.stringify(data));
   
                    this.Loading.dismiss();
                  //  alert("img ->"+data);
                  //  alert("img ->"+JSON.stringify(data));
                   if(data.status == "true"){
                  let toast = this.toastCtrl.create({
                  message: data.message,
                  duration: 3000,
                  position: 'middle'
                });
                  toast.present();
                  this.image='';
             
                  // this.data= data; 
    }
      });
      
                }, (err) => {
                alert("Server not Working,Please Check your Internet Connection and try again!");
                this.Loading.dismiss();
                });
                }
                },{
                text: 'Gallery',
                
                handler: () => { this.Loading.present();
                                const options: CameraOptions = {
                                quality: 8,
                                sourceType : 0,
                                destinationType: this.camera.DestinationType.DATA_URL,
                                encodingType: this.camera.EncodingType.JPEG,
                                mediaType: this.camera.MediaType.PICTURE
                              }
                              this.camera.getPicture(options).then((imageData) => {
                            this.prfimage = "data:image/jpeg;base64," + imageData;
                             this.image=imageData;
                                localStorage.setItem("IMG",  this.prfimage);
                             
                                          var data_img = ({
                                              
                                 user_id :this.userid,
                                  profile_picture :this.image
                      })
                              
                                var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'profilepicupload', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
                  console.log(data);
   
                    this.Loading.dismiss();
                               if(data.status == "true"){
                  let toast = this.toastCtrl.create({
                  message: data.message,
                  duration: 3000,
                  position: 'middle'
                });
                  toast.present();
                  this.image='';
                  // this.data= data; 
    }
      });
                              }, (err) => {
                              alert("Server not Working,Please Check your Internet Connection and try again!");
                              this.Loading.dismiss();
                              });
                }
                },
                {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                          console.log('Cancel clicked');
                          this.Loading.dismiss();
                          //  actionsheet.dismiss()         
                        }
                      }
                    ]
                  });

                  actionsheet.present();
                }
                
 gotolist(heroForm){
//     alert('show detailrrr');



    var post_data = {
          id:this.userid,
           available_status:heroForm.value.status,
          description:heroForm.value.description,
          available_from:heroForm.value.days,
          available_to:heroForm.value.enddays,
//          shift:form.value.endtime,
          shift:heroForm.value.starttime,
          address_country:heroForm.value.country,
          address_city:heroForm.value.city,
      
    }
//    alert("post_datarrr" + JSON.stringify(post_data));
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(post_data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'editusrdetails', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);

//    alert("loding toh baad");
      if(data.error == '0'){
//          alert("data saved");
           localStorage.setItem('USEREMAIL',data.data.email);
         localStorage.setItem('USERNAME',data.data.username);
        this.navCtrl.push(ListPage);
        this.showdata=data.data;
        console.log(this.showdata);
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
 }
 serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  backtosigin(){
    this.navCtrl.push(SigninPage);
   }

//   gotolist(){
//    this.navCtrl.push(ListPage);
//   }

   calndr(){
    this.navCtrl.push(CalendarPage);
   }

}
