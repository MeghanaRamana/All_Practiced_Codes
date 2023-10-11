import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/BarChartController.getOpportunities'; 
export default class ParentBarchart extends LightningElement {
    chartConfiguration;
    @wire(getOpportunities)
    getOpportunities({ error, data }) {
        if (error) {
            this.error = error;
            this.chartConfiguration = undefined;
        } else if (data) {
            let chartFldData = [];
            let chartCRData = [];
            let chartLabel = [];
            data.forEach(opp => {
                chartFldData.push(opp.Id);
                chartCRData.push(opp.Dtp);
                chartLabel.push(opp.Field);
            });
            this.chartConfiguration = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'Id',
                        backgroundColor: "green",
                        data: chartFldData,
                    },{
                        label: 'Data Type',
                        backgroundColor: "orange",
                        data: chartCRData,
                    },],
                    labels: chartLabel,
                },
                options: {},
            };
            console.log('data => ', data);
            this.error = undefined;
        }
    }
}