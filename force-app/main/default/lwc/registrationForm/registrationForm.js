import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import registerUser from '@salesforce/apex/RegistrationClass.registerUser';
import validateLogin from '@salesforce/apex/RegistrationClass.validateLogin';

export default class RegistrationPage extends LightningElement {
    @track showCertificate = false;
    @track subscribeCertificate = false;
    @track navigationComponent = true;
    @track subscribeCalender = false;
    @track firstName;
    @track lastName;
    @track email;
    @track username;
    @track password;
    @track confirmPassword;
    @track securityQuestion1;
    @track securityQuestion2;
    @track phone;
    @api loginemail;
    @track loginpassword;
    @track errorMessage;
    @track showLoginPage = true;
    @track showRegistrationPage = false;
    @track showLogoutButton = false;
    @api headerTitle;
    @api menuItems = [];
    @track showLogoutButton = false;
    @track showNavbar = false;
    @track showCalender = false;
    @track rememberMe = false;

 toggleMobileMenu(event){
        const evt = event.currentTarget;
        evt.classList.toggle("open");
    }
    connectedCallback() {
        // Check if the user is already logged in
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');


        if (isLoggedIn) {
            // User is logged in, perform necessary actions
            this.handleSuccessfulLogin();
                     this.uploadDocs=true;

        }
        else {
            // User is not logged in, redirect to the login page
            this.showLoginPage = true;
            this.showLogoutButton = false;
                     this.uploadDocs=false;

        }

        if(rememberedEmail && rememberedPassword){
            this.loginemail = rememberedEmail;
            this.loginpassword = rememberedPassword;
            this.rememberMe = true;
        }
    }

    handleMenuToggle() {
        const menu = this.template.querySelector('.menu');
        const menuToggle = this.template.querySelector('.menu-toggle');
        const isActive = menu.classList.contains('active');
        menu.classList.toggle('active', !isActive);
        menuToggle.classList.toggle('active', !isActive);
    }
    handleClickToGo() {
        this.showCertificate = true;


    }

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleUsernameChange(event) {
        this.username = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleConfirmPasswordChange(event) {
        this.confirmPassword = event.target.value;
    }

    HandlePhoneChange(event) {
        this.phone = event.target.value;
    }
    handleSecurityQuestion1Change(event) {
        this.securityQuestion1 = event.target.value;
    }
    handleSecurityQuestion2Change(event) {
        this.securityQuestion2 = event.target.value;
    }

    showRegistrationForm(event) {
        event.preventDefault();
        this.showRegistrationPage = true;
        this.showLoginPage = false;
        this.showLogoutButton = false;
        this.subscribeCalender = false;
        this.showCalender = false;


    }
    handleRegistration() {
        if (!this.firstName || !this.lastName || !this.username || !this.password || !this.email) {
            this.showErrorMessage('Please enter all the required fields');
            return;
        }

        if (this.password !== this.confirmPassword) {
            // Passwords don't match, show an error message or toast notification
            this.showErrorMessage('Passwords do not match');
            return;

        }
        registerUser({ firstName: this.firstName, lastName: this.lastName, email: this.email, username: this.username, password: this.password, phone: this.phone, securityQuestion1: this.securityQuestion1, securityQuestion2: this.securityQuestion2 })
            .then(() => {
                console.log('Regestration successful');
                //alert('Regestration successful')
                // Registration successful, handle the response as needed
                // For example, show a success message or navigate to the login page
                this.showSuccessMessage('Registration successful');
                this.showRegistrationPage = false;
                this.showLoginPage = true;
                this.showLogoutButton = false;
                //this.showLogoutButton = false;


            })
            .catch(error => {
                console.log(error);
                alert('error');
                // Error occurred during registration, handle the error
                // For example, show an error message or log the error
                this.showErrorMessage(error.body.message);

            });


    }

    handleCancel(event) {
        event.preventDefault();
        this.showLoginPage = true;
        this.showRegistrationPage = false;
    }

    /* handleNewRegistration(){
         this.showRegistrationPage = true;
         this.showLoginPage = false;
     }*/

    handleLoginEmailChange(event) {
        this.loginemail = event.target.value;
    }

    handleLoginPasswordChange(event) {
        this.loginpassword = event.target.value;
    }

    handleRememberMeChange(event){
        this.rememberMe = event.target.checked;
    }


    handleLogin2() {
        console.log('EMAIL' + this.loginemail + ',PASSWORD===>' + this.loginpassword);

        // Ensure that both username and password fields are not blank
        if (!this.loginemail || !this.loginpassword) {
            this.showErrorMessage('Please enter both username and password');
            return;
        }

        // Perform the login logic here
        // You can make an Apex method call to validate the username and password against the registration data
        // If the login is successful, you can redirect the user to a different page or show a success message
        // If the login fails, you can show an error message
        validateLogin({ loginemail: this.loginemail, loginpassword: this.loginpassword })
            .then(result => {
                if (result) {

                    console.log('RESULT==>' + result);
                    sessionStorage.setItem('isLoggedIn', 'true');
                    //this.handleSuccessfulLogin();
                    // Login successful, navigate to the next component or perform necessary actions
                    this.showLoginPage = false;
                    this.showLogoutButton = true;
                    this.navigateToNextComponent();
                    this.showSuccessMessage('Login successful');
                }
            })
            .catch(error => {
                console.log('ERROR==>' + error.body.message);
                this.showErrorMessage = 'An error occured during login';
                this.showErrorMessage(error.body.message);
            });
            if(this.rememberMe){
                localStorage.setItem('rememberedEmail', this.loginemail);
                localStorage.setItem('rememberedPassword', this.loginpassword);
            }
    }

    handleSuccessfulLogin() {
        // Perform actions when the user is successfully logged in
        this.showLoginPage = false;
        this.showLogoutButton = true;
        this.navigateToNextComponent();

    }

    handleNewLogout() {
        this.loginemail = '';
        this.loginpassword = '';
        this.subscribeCertificate = false;
        this.navigationComponent = !this.navigationComponent;
        this.showSuccessMessage('Logout successful');
        this.showLoginPage = true;
        this.showLogoutButton = false;
        this.errorMessage = '';
        this.showCalender = false;
        this.showNavbar = false;
        this.showCertificate = false;
        sessionStorage.removeItem('isLoggedIn'); // Clear the isLoggedIn flag
       
       

    }

    navigateToNextComponent() {
        //Implement the logic to navigate to the next component
        this.subscribeCertificate = !this.subscribeCertificate;
        this.navigationComponent = !this.navigationComponent;
        this.subscribeCalender = true;
        this.showLoginPage = false;
        this.showNavbar = true;
        this.showCertificate = true;
         this.uploadDocs=true;

    }
    showErrorMessage(message) {
        // Implement your custom error message handling logic
        alert('Error: ' + message);
    }
    showSuccessMessage(message) {
        // Implement your custom success message handling logic
        alert('Success: ' + message);
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }

    navigateToLWCComponent() {
        // Navigate to the specified LWC component
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home'
            }
        });
    }

}