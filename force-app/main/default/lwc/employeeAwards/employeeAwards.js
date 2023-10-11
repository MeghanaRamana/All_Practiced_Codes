import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAllAwards from '@salesforce/apex/AccountViewController.GetEmployeeAwards';

export default class AwardsList extends LightningElement {
    awards;
    error;
    isLoading = true;

    @wire(getAllAwards)
    wiredAwards(result) {
        console.log(result);
        if (result.data) {
            this.awards = JSON.stringify(result.data);
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.awards = undefined;
        }
        this.isLoading = false;
    }

    refreshData() {
        this.isLoading = true;
        return refreshApex(this.wiredAwards);
    }
}