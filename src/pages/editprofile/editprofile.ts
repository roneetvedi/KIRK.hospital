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
import { FormBuilder, FormGroup, FormArray,FormControl  } from '@angular/forms';
import { ImageViewerController } from 'ionic-img-viewer';
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {
    public data = {};
    userid='';
    userdta='';
    days;deletedoc;
 myForm: FormGroup;
    public editname='';
    public edittype='';
    public editcity='';
    public editcountry='';
    public countries='';
    public editstatus='';
    public docloop='';
    public editdescription='';
    public editdrom='';
    public  editto='';
    public  edittime='';
    public editexp='';
public editedu='';
public editcharges='';
public editawrd='';
public editdocs='';
public shwdocs='';
public image='';
public photos : any;
  public base64Image : string;
     prfimage: string;
  profileimage: void;
 public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
 loading = this.Loading;
 _imageViewerCtrl: ImageViewerController;
  constructor(public navCtrl: NavController,public events:Events,
    public navParams: NavParams,public http:Http,
    public common : CommonProvider, private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController, private builder: FormBuilder,public imageViewerCtrl: ImageViewerController,
    public loadingCtrl:LoadingController,public app: App,private camera: Camera, 
    public menu: MenuController) {
    this._imageViewerCtrl = imageViewerCtrl;
     this.myForm = builder.group({
      worksites: builder.array([])
    })
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
             this.days = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
console.log(this.days);
    this.Loading.dismiss();
    
//          alert("into all countryrrr")
        
        this.countries=data.country;
        console.log(data.country);
     
    })
       })
 }
 
show_details(){
 var Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });

    var data = {
      id :this.userid,
     }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
 Loading.present().then(() => {
    this.http.post(this.common.base_url +'users/userdetailbyid', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
        console.log(data);
        Loading.dismiss();
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
//        alert(JSON.stringify(this.editdescription));
        this.editdrom = data.data.available_from;
//         alert(JSON.stringify(this.editdrom));
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
        
        this.editdocs=data.data.docs;
        console.log(this.editdocs);
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
update(heroForm){
 var Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  var datadays = localStorage.getItem("serviceItems");
  var save_data = {
     id:this.userid,
          username:this.editname,
          available_status:heroForm.value.status,
          description:heroForm.value.description,
          available_from:datadays,
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
    Loading.present().then(() => {
    this.http.post(this.common.base_url +'editfulldetail', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    Loading.dismiss();
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
      })
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
               var Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
               
                let actionsheet = this.actionSheetCtrl.create({
                title:"Choose Album",
                buttons:[{
                text: 'Camera',
                handler: () => {
                console.log("Camera Clicked");
                
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
                    Loading.present().then(() => {
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'profilepicupload', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//                      alert(JSON.stringify(data));
   
                    Loading.dismiss();
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
                    })
                }, (err) => {
                alert("Server not Working,Please Check your Internet Connection and try again!");

                });
                }
                },{
                text: 'Gallery',
                
                handler: () => { 
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
                               Loading.present().then(() => {
                                var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'profilepicupload', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
                  console.log(data);
   
                    Loading.dismiss();
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
      })
                              }, (err) => {
                              alert("Server not Working,Please Check your Internet Connection and try again!");

                              });
                }
                },
                {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                          console.log('Cancel clicked');

                          //  actionsheet.dismiss()         
                        }
                      }
                    ]
                  });

                  actionsheet.present();
                }
                takePhoto() {
//    alert("in");
     var Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
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
                       Loading.present().then(() => {
//                    alert("image" + JSON.stringify(data_img));
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'docupload', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//                      alert(JSON.stringify(data));
   
                    Loading.dismiss();
                  //  alert("img ->"+data);
                  //  alert("img ->"+JSON.stringify(data));
                   if(data.error =='0'){
                          this.editdocs=data.data;
//                          alert(JSON.stringify(this.editdocs));
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
                       })
                }, (err) => {
                alert("Server not Working,Please Check your Internet Connection and try again!");
    
                });
                }
                },{
                text: 'Gallery',
                
                handler: () => { 
                                const options: CameraOptions = {
                                quality: 8,
                                sourceType : 0,
                                destinationType: this.camera.DestinationType.DATA_URL,
                                encodingType: this.camera.EncodingType.JPEG,
                                mediaType: this.camera.MediaType.PICTURE
                              }
                              this.camera.getPicture(options).then((imageData) => {
                            this.base64Image = "data:image/jpeg;base64," + imageData;
//                             this.photos.push(this.base64Image);
//                             this.photos.reverse();
                             this.image=imageData;
                                localStorage.setItem("IMG",  this.prfimage);
                              var data_img = ({
                                 user_id :this.userid,
                                 docs :this.image
                      })
                       Loading.present().then(() => {
//                    alert("image" + JSON.stringify(data_img));
//                    var serialized_img = this.serializeObj(data_img); 
//                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'docupload', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//                      alert(JSON.stringify(data));
   
                    Loading.dismiss();
                  //  alert("img ->"+data);
                  //  alert("img ->"+JSON.stringify(data));
                   if(data.error == "0"){
                          this.editdocs=data.data;
//                          alert(JSON.stringify(this.editdocs));
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
      })
                              }, (err) => {
                              alert("Server not Working,Please Check your Internet Connection and try again!");
                       
                              });
                }
                },
                {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                          console.log('Cancel clicked');
                    
                          //  actionsheet.dismiss()         
                        }
                      }
                    ]
                  });

                  actionsheet.present();
  }
  delete(id){
      var Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
//      alert("delete");
      var data = {
          doc_id:id,
          user_id:this.userid
      }
       
//      alert(JSON.stringify(data));
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data);
                  console.log(Serialized);
              Loading.present().then(() => {
                  this.http.post(this.common.base_url +'removedoc', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//                      alert(JSON.stringify(data));
   
                      Loading.dismiss();
                   if(data.error == '0'){
                       this.editdocs=data.data;
                       this.navCtrl.push(EditprofilePage);
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
              })
  }
  presentImage(myImage) {
//      alert("ncj");
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
 
    setTimeout(() => imageViewer.dismiss(),3000);
    imageViewer.onDidDismiss(() => console.log('Viewer dismissed'));
  }
}
