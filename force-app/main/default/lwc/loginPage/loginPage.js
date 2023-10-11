import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import validateLogin from '@salesforce/apex/RegistrationCl.validateLogin';

export default class LoginPage extends LightningElement {
    @track username;
    @track password;

    handleUsernameChange(event) {
        this.username = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleLogin() {
        // Perform the login logic here
        // You can make an Apex method call to validate the username and password against the registration data
        // If the login is successful, you can redirect the user to a different page or show a success message
        // If the login fails, you can show an error message
        validateLogin({ username: this.username, password: this.pasword})
        .then(result =>{
            if(result){
                const event = new ShowToastEvent({
                    title: 'Success',
                    message: 'Login Successful',
                    variant: 'success'
                });
                const loginEvent = new CustomEvent('login');
                this.dispatchEvent(loginEvent);
            }else {
                const event = new ShowToastEvent({
                    title: 'Error',
                    Message: 'Invalid username or password',
                    variant: 'error'
                });
                this.dispatchEvent(event);
            }
        }) 
        .catch(error =>{
            console.log('error'+error);
            const event = new ShowToastEvent({
                title: ' Error',
                message: 'An error occurred during login',
                variant: 'error'
            });
            this.dispatchEvent(event);
        }) ;
    }

}