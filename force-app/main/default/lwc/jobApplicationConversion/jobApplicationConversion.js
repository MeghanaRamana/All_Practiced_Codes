import { LightningElement, wire, api, track } from "lwc";
import convertJobApplicationToAppointee from '@salesforce/apex/JobApplicationConversion.convertJobApplicationToAppointee';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {CloseActionScreenEvent} from 'lightning/actions';


export default class JobApplicationConversion extends LightningElement {
    @api recordId;
    recId = this.recordId;
    handleConvert(event) {
        
            convertJobApplicationToAppointee({jobApplicationId : this.recordId}).then((result) => {
            this.dispatchEvent(new CloseActionScreenEvent())
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Converted successfully!',
                    variant: 'success'
                })
            );
        }).catch(error => {
            this.dispatchEvent(new CloseActionScreenEvent())
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'Error'
                })
            );
        })        
    }
}