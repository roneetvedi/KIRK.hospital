import { Component } from '@angular/core';
import { NavController,NavParams,MenuController,Events} from 'ionic-angular';
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
import { FormBuilder, FormGroup, FormArray,FormControl  } from '@angular/forms';
import{App} from 'ionic-angular';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
@Component({
  selector: 'page-process',
  templateUrl: 'process.html'
})
export class ProcessPage {
   public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
 loading = this.Loading;
  public fbdata="";
   public googledata='';
    public twtdata='';
public userid='';
public data = {};
public showdata='';
public countries='';
chkuser:any;
public docloop='';
public prfimage='';
public shwdocs='';
public image='';
public photos : any;
days;deletedoc;
 myForm: FormGroup;
  public base64Image : string;
  constructor(public navCtrl: NavController,public events:Events,
    public navParams: NavParams,public http:Http,
    public app:App,private camera: Camera,public menu: MenuController,private googlePlus: GooglePlus,
    public common : CommonProvider, private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController, private builder: FormBuilder,
    public loadingCtrl:LoadingController,public fb:Facebook, public TwitterConnect:TwitterConnect) {
   this.myForm = builder.group({
      worksites: builder.array([])
    })
    this.menu.swipeEnable(false);
    this.userid = localStorage.getItem("USERID");
    console.log(this.userid);
    this.country();
  }

country(){
//     alert('show countryrrr');
//     alert("array");
     this.days = ["sunday","monday","tuesday","wednesday","thrusday","friday","saturday"];
console.log(this.days);
//    var optionss = this.common.options;
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
                      alert(JSON.stringify(data));
   
                    this.Loading.dismiss();
                  //  alert("img ->"+data);
                  //  alert("img ->"+JSON.stringify(data));
                   if(data.status == true){
                       localStorage.setItem("USERIMG",data.data); 
                       this.events.publish('user:login');
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
                               if(data.status == true){
                                      localStorage.setItem("USERIMG",data.data); 
                       this.events.publish('user:login');
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
      updateCheckedOptions(location:any, isChecked: boolean) {
          console.log(location);
          const worksites = <FormArray>this.myForm.controls.worksites;

  if(isChecked) {
    worksites.push(new FormControl(location));
    console.log(worksites.value);
    localStorage.removeItem('serviceItems');
    localStorage.setItem('serviceItems',JSON.stringify(worksites.value));
  } else {

      let index = worksites.controls.findIndex(x => x.value == location);
      console.log(index);
      worksites.removeAt(index);
      console.log(worksites.value);
      localStorage.removeItem('serviceItems');
      localStorage.setItem('serviceItems',JSON.stringify(worksites.value));
  }
}          
 gotolist(heroForm){
//     alert('show detailrrr');

var datadays = localStorage.getItem("serviceItems");
    var post_data = {
          id:this.userid,
           available_status:heroForm.value.status,
          description:heroForm.value.description,
          available_from:datadays,
          charges:heroForm.value.charges,
          phone:heroForm.value.phone,
          shift:heroForm.value.starttime,
          address_country:heroForm.value.country,
          address_city:heroForm.value.city,
      
    }
    alert("post_datarrr" + JSON.stringify(post_data));
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(post_data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'editusrdetails', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
        alert(JSON.stringify(data));
    console.log(data);

//    alert("loding toh baad");
      if(data.error == '0'){
//          alert("data saved");
          this.fbdata = localStorage.getItem("FBDATA");
       this.googledata = localStorage.getItem("GOGDATA");
       this.twtdata = localStorage.getItem("TWTDATA");
//       alert(this.twtdata);
    if(this.fbdata!= null){
//        alert("F");
      this.fb.logout().then((sucess) => {
      localStorage.clear();
    this.app.getRootNav().setRoot(SigninPage);
//     this.showToast("You have been F Logged Out");
    }).catch((error) => {
      alert(error);
       console.log(error)
    })
    }else if(this.googledata != null){ 
//    alert("G");
   this.googlePlus.logout().then(
        (success) => {
             localStorage.clear();
              this.app.getRootNav().setRoot(SigninPage);
            console.log('GOOGLE+: logout DONE', success);
//            this.showToast("You have been G Logged Out");
        },
        (failure) => {
            console.log('GOOGLE+: logout FAILED', failure);
        }
    ).catch((error) => {
      alert(error);
       console.log(error)
    })
    } else if (this.twtdata != null){
//    alert("T");
        this.TwitterConnect.logout().then(
        (success) => {
             localStorage.clear();
              this.app.getRootNav().setRoot(SigninPage);
            console.log('TwitterConnect: logout DONE', success);
//            this.showToast("You have been T Logged Out");
        },
        (failure) => {
            console.log('TwitterConnect: logout FAILED', failure);
        }
        ).catch((error) => {
      alert(error);
       console.log(error)
    })
   }else{
//    alert("logoutttt");
    localStorage.clear();
    // this.navCtrl.setRoot(SigninPage);
    this.app.getRootNav().setRoot(SigninPage);
//    this.showToast("You have been N Logged Out");
    }
   
     
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
takePhoto() {
//    alert("in");
    
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
                  this.base64Image = "data:image/jpeg;base64," + imageData;
                 
                  this.image=imageData;
                  localStorage.setItem("IMG",  this.prfimage);
                 localStorage.setItem("IMG",  this.prfimage);
//                   this.profile_image =  imageData; 
                    var data_img = ({
                                 user_id :this.userid,
                                 docs :this.image
                      })
                    alert("image" + JSON.stringify(data_img));
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'docupload', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
                      alert(JSON.stringify(data));
   
                    this.Loading.dismiss();
                  //  alert("img ->"+data);
                  //  alert("img ->"+JSON.stringify(data));
                   if(data.error =='0'){
                          this.docloop=data.data;
                          alert(JSON.stringify(this.docloop));
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
                            this.base64Image = "data:image/jpeg;base64," + imageData;
                             this.photos.push(this.base64Image);
                             this.photos.reverse();
                             this.image=imageData;
                                localStorage.setItem("IMG",  this.prfimage);
                              var data_img = ({
                                 user_id :this.userid,
                                 docs :this.image
                      })
//                    alert("image" + JSON.stringify(data_img));
//                    var serialized_img = this.serializeObj(data_img); 
//                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'docupload', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//                      alert(JSON.stringify(data));
   
                    this.Loading.dismiss();
                  //  alert("img ->"+data);
                  //  alert("img ->"+JSON.stringify(data));
                   if(data.error == "0"){
                          this.docloop=data.data;
                          alert(JSON.stringify(this.docloop));
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
  delete(id){
      alert("delete");
      var data = {
          doc_id:id,
          user_id:this.userid
      }
      alert(JSON.stringify(data));
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'removedoc', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
                      alert(JSON.stringify(data));
   
                    this.Loading.dismiss();
           
                   if(data.error == '0'){
                       this.deletedoc=data.data;
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
  }
}
