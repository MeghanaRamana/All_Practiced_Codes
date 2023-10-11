import { LightningElement, api } from 'lwc';
import chartJs from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
export default class childbarchart extends LightningElement {
    @api chartConfig; 
    ischartJsInitialized = false;
    renderedCallback() {
        if (this.ischartJsInitialized) {
            return;
        }
        // load chartjs from the static resource
        Promise.all([loadScript(this, chartJs)])
        .then(() => {
            this.isChartJsInitialized = true;
            const ctx = this.template.querySelector('canvas.barChart').getContext('2d');
            this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig)));
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading Chart',
                    message: error.message,
                    variant: 'error',
                })
            );
        });
    }
}