import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountViewController.getAccounts';
import { createMessageContext, releaseMessageContext,publish} from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";
export default class PublishCertificate extends LightningElement {
context = createMessageContext();
    @track accountList;
    connectedCallback(){
        getAccounts()
            .then(result =>{
                console.log("result=====>"+JSON.stringify(result));
                this.accountList = result;
            })
            .catch(error=>{
                console.log("error=====>"+error);
                this.accountList = error;
            });
    }
    handleClick(event) {
        event.preventDefault();                
        const message = {
            recordId: event.target.dataset.value,
            recordData: { value: "message from Lightning Web Component" }
           
        };
        console.log('publishing message:', JSON.stringify(message));
        publish(this.context, SAMPLEMC, message);
    }
}