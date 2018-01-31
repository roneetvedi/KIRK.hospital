import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastController } from 'ionic-angular';
   
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';
import { SignupPage } from '../pages/signup/signup';
import { SignupsocialPage } from '../pages/signupsocial/signupsocial';
import { SigninPage } from '../pages/signin/signin';
import { ForgetpasswordPage } from '../pages/forgetpassword/forgetpassword';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { ProfilePage } from '../pages/profile/profile';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { FilterPage } from '../pages/filter/filter';
import { HospitaldetailPage } from '../pages/hospitaldetail/hospitaldetail';
import { FavouritePage } from '../pages/favourite/favourite';
import { NotificationPage } from '../pages/notification/notification';
import { ProcessPage } from '../pages/process/process';
import { CalendarPage } from '../pages/calendar/calendar';
import { ReferralcodePage } from '../pages/referralcode/referralcode';
import { GalleryPage } from '../pages/gallery/gallery';
import { RatePage } from '../pages/rate/rate';
import { PrivacypolicyPage } from '../pages/privacypolicy/privacypolicy';
import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { InformationPage } from '../pages/information/information';
import { ContactusPage } from '../pages/contactus/contactus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   public fbdata="";
//    public usrdata="";
   public googledata='';
   public useremail='';
   public usernm='';
   public userimg='';
   public twtdata='';
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
activePage: any;

  pages: [{title: any, component: any, icon: any}];

  constructor(public platform: Platform,public toastCtrl: ToastController,public events: Events, public statusBar: StatusBar,
      private googlePlus: GooglePlus, public splashScreen: SplashScreen,public app: App, public fb:Facebook, public TwitterConnect:TwitterConnect) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages= [
      { title: 'Home', component: ListPage, icon:'assets/imgs/home.png'},
      { title: 'Notification', component: NotificationPage, icon:'assets/imgs/notifctn.png'},
      { title: 'Favourite', component: FavouritePage, icon:'assets/imgs/hrt.png'},
      { title: 'Share this App', component: ReferralcodePage, icon:'assets/imgs/share.png'},
      { title: 'Edit profile', component: EditprofilePage, icon:'assets/imgs/edit1.png'},
      { title: 'Calendar', component: CalendarPage, icon:null},
      { title: 'Change Password', component: ChangepasswordPage, icon:'assets/imgs/password.png'},
      { title: 'Information', component: InformationPage, icon:null},
      { title: 'Contact Us', component: ContactusPage,icon:null},
//    { title: 'Logout', component: HomePage, icon:'assets/imgs/exit.png'},
      { title: 'My Profile', component: ProfilePage, icon: 'assets/imgs/frwrd.png'},
    ];
console.log(localStorage.getItem("FBDATA"));
console.log(localStorage.getItem("G+DATA"));
    
//         this.usrdata = localStorage.getItem("USERDAT");
       console.log(this.fbdata);
       console.log(this.googledata);
//       console.log(this.usrdata);
       this.events.subscribe('user:login', () => { this.viewData(); });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  showToast(text) {
  let toast = this.toastCtrl.create({
   message: text,
   duration: 3000,
   position: 'middle'
  });
  toast.present();
 }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
  public checkActivePage(page): boolean {
    return page === this.activePage;
  }

  // gotoprofile(){
  //   this.nav.push(ProfilePage)
  // }
 logout(){
        this.fbdata = localStorage.getItem("FBDATA");
       this.googledata = localStorage.getItem("GOGDATA");
       this.twtdata = localStorage.getItem("TWTDATA");
//       alert(this.twtdata);
    if(this.fbdata!= null){
        alert("F");
      this.fb.logout().then((sucess) => {
      localStorage.clear();
    this.app.getRootNav().setRoot(SigninPage);
     this.showToast("You have been F Logged Out");
    }).catch((error) => {
      alert(error);
       console.log(error)
    })
    }else if(this.googledata != null){ 
    alert("G");
   this.googlePlus.logout().then(
        (success) => {
             localStorage.clear();
              this.app.getRootNav().setRoot(SigninPage);
            console.log('GOOGLE+: logout DONE', success);
            this.showToast("You have been G Logged Out");
        },
        (failure) => {
            console.log('GOOGLE+: logout FAILED', failure);
        }
    ).catch((error) => {
      alert(error);
       console.log(error)
    })
    } else if (this.twtdata != null){
    alert("T");
        this.TwitterConnect.logout().then(
        (success) => {
             localStorage.clear();
              this.app.getRootNav().setRoot(SigninPage);
            console.log('TwitterConnect: logout DONE', success);
            this.showToast("You have been T Logged Out");
        },
        (failure) => {
            console.log('TwitterConnect: logout FAILED', failure);
        }
        ).catch((error) => {
      alert(error);
       console.log(error)
    })
   }else{
    alert("logoutttt");
    localStorage.clear();
    // this.navCtrl.setRoot(SigninPage);
    this.app.getRootNav().setRoot(SigninPage);
    this.showToast("You have been N Logged Out");
    }

}
viewData(){
    this.useremail = localStorage.getItem("USEREMAIL");
        this.usernm = localStorage.getItem("USERNAME");
        this.userimg = localStorage.getItem("USERIMG");
    console.log(this.useremail);
    console.log(this.usernm);
    console.log(this.userimg);
}
}