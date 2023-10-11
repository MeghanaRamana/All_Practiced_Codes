// Import Lightning Web Component modules and Apex method
import { LightningElement, wire, track, api} from 'lwc';
import getEmployees from '@salesforce/apex/AccountViewController.getEmployees';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

// Define the LWC class
export default class AccountView extends LightningElement {
    // Define the @api property to receive the recordId of the account being viewed
    @api recordId;
    // Define the @track property to track changes to the accounts data
    @track accounts;
    
    // Define the columns that will be displayed in the table
    @track columns = [
        {
            label: 'Account Name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Work Location',
            fieldName: 'EMS_Work_Location__c',
            type: 'text',
            sortable: true
        }
    ];

    // Use the @wire decorator to call the Apex method and retrieve account data
    @wire(getEmployees)
    wiredAccounts({data, error}) {
        if(data) {
            console.log(data); // Output the retrieved data to the console
            this.accounts = data; // Set the retrieved data to the accounts property
        }
        else if(error) {
            // Display an error toast if the Apex method call fails
            const errEvent = new ShowToastEvent({
                title: 'Accounts Not Found.',
                message: error.body.message,
                variant: 'error',
            });
            this.dispatchEvent(errEvent);
        }
    }

    // Navigate to the standard View Account page
    handleNavigateToRecord() {
        let navUrl = '/lightning/r/Account/' + '001' + '/view';
        window.open(navUrl, '_self'); // Open the URL in the same window
    }
   
    // Navigate to a Visualforce page
    navigateToVFPage(event) {
        event.preventDefault(); // Prevent the default click behavior
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/AccountViewPage?'+this.recordId // Pass the recordId as a query parameter
            }
        }).then(generatedUrl => {
            window.open(generatedUrl); // Open the URL in a new window
            console.log("url: "+generatedUrl); // Output the generated URL to the console
        });
    }
}