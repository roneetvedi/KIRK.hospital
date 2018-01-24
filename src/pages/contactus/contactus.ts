import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ToastController } from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';

@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html'
})
export class ContactusPage {
public data='';
  constructor(public navCtrl: NavController,public http:Http,
  public common : CommonProvider,
   public loadingCtrl:LoadingController,
   private toastCtrl: ToastController) {

  }


 signup(signup)
        {
//        alert("hi");
        console.log(this.common.options);
        var optionss = this.common.options;
      
        var data1={
          name:signup.value.name,
          email:signup.value.email,
          phone:signup.value.number,
          subject: signup.value.subject
        }
        console.log(data1);
       
        var Serialized = this.serializeObj(data1);
        console.log(Serialized);
       
        console.log(data1);
          this.http.post(this.common.base_url +'contacts_us',Serialized, optionss).map(res=>res.json()).subscribe(data=>{
       if(data.error == 0){
              
console.log(data);
            this.navCtrl.push(ContactusPage);
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
}
