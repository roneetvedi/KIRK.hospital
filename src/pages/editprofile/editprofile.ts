import { Component } from '@angular/core';
import { IonicPage, NavController,Events, NavParams,App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ListPage } from '../list/list';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {
    public data = {};
    userid='';
    userdta='';
    public editname='';
    public edittype='';
    public editcity='';
    public editcountry='';
    public countries='';
    public editstatus='';
    public editdescription='';
       public editdrom='';
       public  editto='';
      public  edittime='';
      public editexp='';
public editedu='';
public editcharges='';
public editawrd='';
     prfimage: string;
  image: any;
  profileimage: void;
 public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
 loading = this.Loading;
  constructor(public navCtrl: NavController,public events:Events,
    public navParams: NavParams,public http:Http,
    public common : CommonProvider, private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl:LoadingController,public app: App,private camera: Camera, 
    public menu: MenuController) {
    this.userid = localStorage.getItem("USERID");
    console.log(this.userid);
//    this.userdta = JSON.stringify(localStorage.getItem("usernm"));
//    console.log(this.userdta);
    this.show_details();
    this.country();
  }
  backtoprofile(){
    this.navCtrl.push(ProfilePage);
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
 
show_details(){


    var data = {
      id :this.userid,
     }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    this.loading.present().then(() => {
    this.http.post(this.common.base_url +'users/userdetailbyid', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
        console.log(data);
    this.Loading.dismiss();
      if(data.error == '0'){
        this.prfimage = data.data.image;
         localStorage.setItem('USERIMG',data.data.image);
        this.events.publish('user:login');
        this.editname=data.data.username; 
        this.edittype=data.data.type;
        this.editcity=data.data.address_city;
        this.editcountry=data.data.address_country;
        this.editstatus=data.data.available_status;
        this.editdescription=data.data.description;
        this.editdrom=data.data.available_from;
        this.editto=data.data.available_to;
        this.edittime=data.data.shift;
        if(data.data.experiance==undefined){
            this.editexp="";
        }else{
            this.editexp=data.data.experiance;
        }
        if(data.data.education==undefined){
            this.editedu="";
        }else{
            this.editedu=data.data.education;
        }
        if(data.data.charges==undefined){
            this.editcharges="";
        }else{
             this.editcharges=data.data.charges;
        }
       if(data.data.awards==undefined){
           this.editawrd="";
       }else{
           this.editawrd=data.data.awards;
       }
        
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
   
update(heroForm){
  this.Loading.present();

  

    var save_data = {
     id:this.userid,
          username:this.editname,
          available_status:heroForm.value.status,
          description:heroForm.value.description,
          available_from:heroForm.value.days,
          available_to:heroForm.value.enddays,
          shift:heroForm.value.starttime,
          address_country:heroForm.value.country,
          address_city:heroForm.value.city,
          education:heroForm.value.education1,
          experiance:heroForm.value.experience1,
          awards:heroForm.value.awards1,
          charges:heroForm.value.charges1,
//          avail:heroForm.value.avail1,
    }
//    alert("post_datarrr" + JSON.stringify(save_data));
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(save_data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'editfulldetail', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    this.Loading.dismiss();
    if(data.error == '0'){
//       alert("data saved");
         this.app.getRootNav().setRoot(ListPage);
       //this.navCtrl.push(ListPage);
        let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
   toast.present();
//    this.show_details();
    
    }
      });
 //alert('error');
//    let toast = this.toastCtrl.create({
//    message: data.message,
//    duration: 3000,
//    position: 'middle'
//  });
//   toast.present();    
    } 
serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
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
                   if(data.status == true){
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
//                                localStorage.setItem("IMG",  this.prfimage);
                             
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
}
