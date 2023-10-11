import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import Performancereview from '@salesforce/apex/AccountViewController.PerformanceReview';

export default class PerformanceList extends LightningElement {
    performance;
    error;
    isLoading = true;

    @wire(Performancereview)
    wiredPerformance(result) {
        if (result.data) {
            this.performance = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.performance = undefined;
        }
        this.isLoading = false;
    }

    refreshData() {
        this.isLoading = true;
        return refreshApex(this.wiredPerformance);
    }
}