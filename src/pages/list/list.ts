import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams, Events } from 'ionic-angular';
import { FilterPage } from '../filter/filter';
import { HospitaldetailPage } from '../hospitaldetail/hospitaldetail';
import { FavouritePage } from '../favourite/favourite';
import { Geolocation } from '@ionic-native/geolocation';
import {CommonProvider} from '../../providers/common/common';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import{App} from 'ionic-angular';
import { ProcessPage } from '../process/process';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
    public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
     loading = this.Loading;
    latitude:any;
  
    longitude:any;
    public userids="";
    listdata;
    url;
     myInput: any;
  errorValue: string;
  searchList: any;
  showdata;usersts;
  name: any;
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
      public modalCtrl: ModalController,public events:Events,
      private geolocation: Geolocation, public loadingCtrl:LoadingController,
              public common : CommonProvider,
              public app:App,
              private toastCtrl: ToastController,
              public http:Http) {
    
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    this.userids = localStorage.getItem("USERID");
    console.log(this.userids);
     this.events.publish('user:login');
     this.chkuser();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  modelfilter() {
    let modal = this.modalCtrl.create(FilterPage);
    modal.present();
  }

  detail(ids,dst){
    this.navCtrl.push(HospitaldetailPage,{hosp_id:ids,usr_id:dst});
   }

//   fav(){
//    this.navCtrl.push(FavouritePage);
//   }
   loaction(){
//       alert("location");
       this.geolocation.getCurrentPosition().then((resp) => {
  this.latitude=resp.coords.latitude;
  this.longitude=resp.coords.longitude;
  console.log(this.latitude);
  console.log(this.longitude);
  this.hosplist(this.latitude,this.longitude);
}).catch((error) => {
  console.log('Error getting location', error);
});
   }
   hosplist(lat,long){
//       alert("list");
       var data = {
      latitude:lat, 
      longitude:long,
       user_id:this.userids
     }
     console.log(data);
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'findhospitalbycordinates', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    this.Loading.dismiss();
      if(data.error == '0'){
//       alert("data displayed");
       this.listdata=data.data;
       console.log(this.listdata);
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
   setFilteredItems(){
  
  console.log(this.myInput);
  var keyword = this.myInput.replace(/^\s\s*/, '').replace(/\s\s*$/, '');;
  console.log(keyword);
  console.log(keyword.length);
    
  if(keyword.length == 0) {
    //this.ListScheduledPatients();
    console.log('plz write something');
    this.errorValue = '2'; 
    console.log(this.errorValue);
    this.loaction();
  } else {
   this.listdata = this.getItems(keyword);
   console.log('Filtering');
   this.errorValue = '0';
   console.log(this.errorValue);
  } 
 }
 
  getItems(ev) {
      return this.listdata.filter((item: any) => {
        console.log(item);
        return item.title.toLowerCase().indexOf(ev.toLowerCase()) > -1;
      }); 
  }
   serializeObj(obj) {
    var result = []; 
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  chkuser(){
//      alert("user chk");
      var userid = localStorage.getItem("USERID");
        var data = {
      id :userid
      
    }
//        alert(JSON.stringify(data));
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'users/userdetailbyid', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
//    alert(JSON.stringify(data));
    this.Loading.dismiss();
      if(data.error == 0){

        this.showdata=data.data;
         
        this.usersts=data.data.complete_status;
        
        
//         alert(this.chkuser);
        if(data.data.complete_status == '0'){
            this.navCtrl.push(ProcessPage);
             let toast = this.toastCtrl.create({
     message: "Data form needs to completed",
     duration: 3000,
     position: 'middle'
   });
    toast.present();
   
        }else{
//           this.navCtrl.push(ListPage);
           this.loaction();
        }
      }

    })
  }
}
