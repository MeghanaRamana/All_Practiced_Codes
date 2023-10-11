import { LightningElement, track, wire } from 'lwc';
import getDataFromContact from '@salesforce/apex/CEMSSchedulerController.getInterviewData';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import Round_Field from '@salesforce/schema/CEMS_Internal_Scheduler__c.CEMS_Interview_Round__c';
const columns = [
    {
        label: 'View',
        type: 'button-icon',
        initialWidth: 75,
        typeAttributes: {
            iconName: 'action:preview',
            title: 'Preview',
            variant: 'border-filled',
            alternativeText: 'View'
        }
    },
    { label: 'Date', fieldName: 'CEMS_Interview_Start_Time__c' },
    { label: 'Applicant', fieldName: 'Name' },
    { label: 'Status', fieldName: 'CEMS_Interview_Status__c' },
    { label: 'Panel', fieldName: 'CEMS_Interview_Panel__r.Name' },
    { label: 'Round', fieldName: 'CEMS_Interview_Round__c' },

];

export default class CemsTest extends LightningElement {
    @track columns = columns;
    @track contactRow;
    @track rowOffset = 0;
    @track recordList;
    @track modalContainer = false;
    @track displayModelRow;
    //@wire(getDataFromContact) wireContact;
    selectedRound = '';
    picklistValues; // Add roundOptions property
    showFormInParent = true;
    selectedDateTime;
    interviewData;
    @track filteredInterviewData;
    
    @wire(getPicklistValues, { recordTypeId: '012DO0000008XetYAE', fieldApiName: Round_Field})
    loadPicklistValues({ data, error }) {
        if (data) {
            this.picklistValues = data.values;
            console.log(this.picklistValues);
        } else if (error) {
            // Handle error if necessary
            console.error('Error loading picklist values:', error);
        }
    }
    @wire(getDataFromContact)
    wiredInterviewData({ error, data }) {
        if (data) {
            this.interviewData = data.map(record => {
                if (record.CEMS_Interview_Panel__r) {
                    return Object.assign(
                        { "CEMS_Interview_Panel__r.Name": record.CEMS_Interview_Panel__r.Name },
                        record
                    );
                }
                return record;
            });
            console.log(JSON.stringify(this.interviewData));
        } else if (error) {
            // Handle error if needed
        }
    }


    handleRowAction(event) {
        const dataRow = event.detail.row;
        console.log('dataRow@@ ' + JSON.stringify(dataRow));
        this.displayModelRow = dataRow;
        console.log('contactRow## ' + JSON.stringify(dataRow));
        this.modalContainer = true;
    }

    closeModalAction() {
        this.modalContainer = false;
        // console.log("hello:" + this.contactRow);
        // setTimeout(() => {
        //     eval("$A.get('e.force:refreshView').fire();");
        // }, 1000);

    }
    handleRoundChange(event) {
        this.selectedRound = event.detail.value;
        this.filterDataByRound();
    }

    filterDataByRound() {
        
    }  

    handleDateTimeChange(event) {
        this.selectedDateTime = event.target.value;
        // Perform any additional logic or actions based on the selected datetime
    }
    filterDataByDate() {
        this.filteredInterviewData = this.interviewData.filter(item => item.datetime.includes(this.selectedDate));
        console.log("interview:",this.filteredInterviewData);
      }
    handleDateChange(event) {
        this.selectedDate = event.target.value;
        console.log('selected',this.selectedDate);
        this.filterDataByDate();
      }
     

     handleScheduleInterview() {
        // Logic to handle the "Schedule Interview" event
        this.showFormInParent = false;

    }

    handleOpenScheduleInterview() {
        // Logic to handle the "Schedule Interview" event
        this.showFormInParent = true;

    }

}