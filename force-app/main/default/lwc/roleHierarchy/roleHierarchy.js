import {
    LightningElement,
    track,
    api,
    wire
} from 'lwc';
import getTreeData from '@salesforce/apex/RoleHierarchy.getTreeData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class roleHierarchy extends LightningElement  {
     @api recordId;
     @track treeItems;
     @wire(getTreeData, { recordId: '$recordId' })
     wireTreeData({ error, data }) {
         if (data) {
            console.log("Data:" + JSON.stringify(data));
             this.treeItems = data;
         } else if (error) {
             this.dispatchEvent(
                 new ShowToastEvent({
                     title: 'Error',
                     message: error.body.message,
                     variant: 'error'
                 })
             );
         }
     }
     
}