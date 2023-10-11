import { LightningElement,api,track,wire } from 'lwc';
import Register from '@salesforce/apex/RegistrationForm.Register';
export default class LoginPopup extends LightningElement {

   @track showLoginPage = false;
   @track   isPopupOpen = false;
   @track   showRegistrationPage = false;
   @track   showPersonalDetails = true;
   @track  showEducationDetails = false;
   @track  showExperienceDetails = false;
   @track  showKycDetails = false;
   @track  currentStep = 1;
   @track  firstName = 'shiva2';
   @track  lastName = 'sai';
   @track  email = 'sai@gmail.com';
   @track  phone = '908765454322';
   @track  address = 'adncnn';
   @track  highestDegree ='asdsdv';
   @track  qualification = 'saddsa';
   @track  cgpa = '98';
   @track   role = 'asjnjdna';
   @track   experience ='3';
   @track  previousCompany = 'dckjcz';
   @track   panNumber = 'addbhjdbs';
   @track   panCard = 'dsjbbchj0ds';
   @track   resume = 'jsdjs';
   @track   city = 'Andhra Pradesh';
   @track street = 'street';
   @track  country = 'India';
   @track  postalCode = '517247'
   @track timeout = 3000;
   @track isLoggedIn = false;
   @track sticky = false;

   @api sidebartoggle;
   @api hometoggle;




    handleLogin(){
        this.isPopupOpen = true;
        this.showLoginPage = true;
        //this.resetForm();                                  
        this.hometoggle = false;
        this.sidebartoggle = true;
    }
    handleLogin2(){
        this.isPopupOpen = false;
        this.isLoggedIn = true;
        this.hometoggle = false;
        this.sidebartoggle = true;
        this.template.querySelector("c-custom-toast-messages").showToast("success", "Login successful");
        const loginEvent = new CustomEvent('login');
        this.dispatchEvent(loginEvent);

    }
    handleCancel() {
        this.isPopupOpen = false;
        //this.showLoginPage = false;
        this.showRegistrationPage = false;
        this.removeContainerClass();
        //this.resetForm;
    }

    handleClose() {
        this.isPopupOpen = false;
        this.showLoginPage = false;
        this.showRegistrationPage = false;
        this.removeContainerClass();
        //this.resetForm;
        

    }

    showRegistrationForm(){
        this.showRegistrationPage = true;
        this.showLoginPage = false;
    }

    handleNext() {
        if (this.currentStep < 4 && this.currentStep >= 1) {
            this.currentStep++;
            this.updateFormVisibility();
        }
    }
    handlePrevious() {
        if (this.currentStep > 1 && this.currentStep <= 4) {
            this.currentStep--;
            this.updateFormVisibility();
        }
    }

    updateFormVisibility() {
        this.showPersonalDetails = this.currentStep === 1;
        this.showEducationDetails = this.currentStep === 2;
        this.showExperienceDetails = this.currentStep === 3;
        this.showKycDetails = this.currentStep === 4;
    }
   

    handleRegistration() {
        console.log('enter');
    Register({
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        phone:this.phone,
        highestDegree:this.highestDegree,
        qualification:this.qualification,
        cgpa:this.cgpa,
        panNumber:this.panNumber,
        experience:this.experience,
        previousCompany:this.previousCompany,
        role:this.role,
        postalCode:this.postalCode,
        street:this.street,
        country:this.country,
        city:this.city
        
    })
        .then((result) => {
            this.isPopupOpen = false;
            // Record creation successful
            // Perform any additional actions or show success message
            this.template.querySelector("c-custom-toast-messages").showToast("success", "Regestration successful");
            console.log('registration successful'+result)
        })
        .catch((error) => {
            console.log('Error'+JSON.stringify(error));
            // Handle any errors that occurred during record creation
            this.template.querySelector("c-custom-toast-messages").showToast("error", "An error occured while registering");
        });
    }

    // resetForm() {
    //     this.showLoginPage = true;
    //     this.showRegistrationPage = false;
    //     this.showPersonalDetails = true;
    //     this.showEducationDetails = false;
    //     this.showExperienceDetails = false;
    //     this.showKycDetails = false;
    //     this.currentStep = 1;
    //     this.firstName = 'shiva';
    //     this.lastName = '';
    //     this.email = '';
    //     this.phone = '';
    //     this.address = '';
    //     this.highestDegree = '';
    //     this.qualification = '';
    //     this.cgpa = '';
    //     this.experience = '';
    //     this.previousCompany = '';
    //     this.role = '';
    //     this.panCard = '';
    //     this.panNumber = '';
    //     this.resume = '';
    // }
//popup container open and close
    addContainerClass() {
        const container = this.template.querySelector('.container');
        container.classList.add('is-popup-open');
    }

    removeContainerClass() {
        const container = this.template.querySelector('.container');
        container.classList.remove('is-popup-open');
    }

    
    // Event handlers for form field changes
    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleLoginEmailChange(event) {
        this.email = event.target.value;
    }

    handleRegistrationEmailChange(event) {
        this.email = event.target.value;
    }

    handleRegistrationPhoneChange(event) {
        this.phone = event.target.value;
    }

    handleRegistrationAddressChange(event) {
        this.address = event.target.value;
    }

    handleHighestDegreeChange(event) {
        this.highestDegree = event.target.value;
    }

    handleQualificationChange(event) {
        this.qualification = event.target.value;
    }

    handleCGPAChange(event) {
        this.cgpa = event.target.value;
    }

    handleExperienceChange(event) {
        this.experience = event.target.value;
    }

    handleCompanyChange(event) {
        this.previousCompany = event.target.value;
    }
    handleAdddressChange(event){
        this.address = event.target.value;
    }
    handleRoleChange(event){
        this.role = event.target.value;
    }
    handlePanChange(event){
        this.panNumber = event.target.value;

    }
    handleUploadPanChange(event){
        this.panCard = event.target.value;

    }
    handleUploadResumeChange(event){
        this.resume = event.target.value;

    }
    handleStreetChange(event) {
        this.street = event.target.value;
    }

    handleCityChange(event) {
        this.city = event.target.value;
    }

    handleCountryChange(event) {
        this.country = event.target.value;
    }

    handlePostalCodeChange(event) {
        this.postalCode = event.target.value;
    }
}