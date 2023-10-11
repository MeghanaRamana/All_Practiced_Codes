import { LightningElement ,track} from 'lwc';
import loginPopup from 'c/loginPopup';
export default class PublicSite extends LightningElement {
   
    showLoginPopup = false;
    @track timeout = 3000;
    @track sticky = false;
//     @track showCemsHome = true;

// handleLogin3() {
//     this.showCemsHome = false;
//     }

 toggleMobileMenu(event){
    const evt = event.currentTarget;
    evt.classList.toggle("open");
}
openLoginPopup(){
    this.showLoginPopup = true;
   
}
closeLoginPopup(){
    this.showLoginPopup = false;
}

}