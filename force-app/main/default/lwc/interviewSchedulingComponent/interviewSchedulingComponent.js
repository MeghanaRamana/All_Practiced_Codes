import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendBulkEmails from '@salesforce/apex/InterviewEmailController.sendBulkEmails';
import getInterviewRecords from '@salesforce/apex/InterviewEmailController.getInterviewRecords';

export default class InterviewSchedulingComponent extends LightningElement {
    @api title
    @api selectedRecords = [];
    @track records = [];
    @track columns = [
        { label: 'Candidate Name', fieldName: 'EMS_Candidate_Name__c', type: 'text' },
        //{ label: 'Interview Date', fieldName: 'EMS_Interview_Date__c', type: 'date' },
        { label: 'Interview Type', fieldName: 'EMS_Interview_Type__c', type: 'text' },
        //{ label: 'Interview Stage', fieldName: 'EMS_Interview_Stage__c', type: 'picklist' },
        { label: 'Interview Status', fieldName: 'EMS_Interview_Status__c', type: 'picklist' },
        { label: 'Candidate Email', fieldName: 'EMS_Applicant_Email__c', type: 'email' },
        { label: 'Interviewer1 Email', fieldName: 'EMS_Interviewer_Email__c', type: 'email' },
        { label: 'Interviewer2 Email', fieldName: 'EMS_Interviewer_2_Email__c', type: 'email' }
        
    ];

    // Fetches the interview records from the server
    connectedCallback() {
        this.getInterviewRecords();
        this.title = 'Send Bulk Interview Emails';
    }

    // Handles the selection of interview records
    handleRowSelection(event) {
        this.selectedRecords = event.detail.selectedRows;
        
    }
          // Handles the search term change event
          handleSearchTermChange(event) {
            this.searchTerm = event.target.value;
            this.getInterviewRecords();
        }

   // Fetches the interview records from the server
getInterviewRecords() {
    getInterviewRecords()
        .then(result => {
            // Filter the records based on the search term
            if (this.searchTerm) {
                const regex = new RegExp(this.searchTerm, "i");
                this.records = result.filter(record =>
                    regex.test(record.EMS_Candidate_Name__c) ||
                    regex.test(record.EMS_Interview_Type__c) ||
                    regex.test(record.EMS_Interview_Status__c) ||
                    regex.test(record.EMS_Applicant_Email__c) ||
                    regex.test(record.EMS_Interviewer_2_Email__c) ||
                    regex.test(record.EMS_Interviewer_Email__c)
                );
            } else {
                this.records = result;
            }
        })
        .catch(error => {
            console.error(error);
        });
}
    //Sending bulk emails
    sendBulkEmails() {
        console.log('records ' + JSON.stringify(this.selectedRecords));
        const interviewIds = this.selectedRecords.map(record => record.Id);
        console.log(JSON.stringify('Interview Ids List :' + interviewIds));
        if (interviewIds.length > 0) {
            sendBulkEmails({ interviewIds })
            
    .then(result => {
        console.log('result: '+ JSON.stringify(result));
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Emails sent successfully',
                variant: 'success'
            })
        );
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            })
        );
    });

               
    
}
    }
}

/*
import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendBulkEmails from '@salesforce/apex/InterviewEmailController.sendBulkEmails';
import getInterviewRecords from '@salesforce/apex/InterviewEmailController.getInterviewRecords';

export default class InterviewSchedulingComponent extends LightningElement {
    @api title
    @api selectedRecords = [];
    @track records = [];
    @track columns = [
        { label: 'Candidate Name', fieldName: 'EMS_Candidate_Name__c', type: 'text' },
        { label: 'Interview Date', fieldName: 'EMS_Interview_Date__c', type: 'date' },
        { label: 'Interview Type', fieldName: 'EMS_Interview_Type__c', type: 'text' },
        //{ label: 'Interview Stage', fieldName: 'EMS_Interview_Stage__c', type: 'picklist' },
        { label: 'Interview Status', fieldName: 'EMS_Interview_Status__c', type: 'picklist' },
        { label: 'Candidate Email', fieldName: 'EMS_Applicant_Email__c', type: 'email' },
        { label: 'Interviewer Email', fieldName: 'EMS_Interviewer_Email__c', type: 'email' }
        
    ];
    @track sortFieldName = '';
    @track sortDirection = 'asc';
    @track searchTerm = '';

    // Fetches the interview records from the server
    connectedCallback() {
        this.getInterviewRecords();
        this.title = 'Send Bulk Interview Emails';
    }

    // Handles the selection of interview records
    handleRowSelection(event) {
        this.selectedRecords = event.detail.selectedRows;
    }

    // Handles the search term change event
    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
        this.getInterviewRecords();
    }

    // Handles the sort event
    handleSort(event) {
        this.sortFieldName = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        console.log('Sorting by: ' + this.sortFieldName + ' Direction: ' + this.sortDirection);
        this.getInterviewRecords();
    }
 /// Sorts the records based on the specified field name and direction
sortRecords(records, fieldName, direction) {
    const sortDirection = direction === 'asc' ? 1 : -1;
    return records.sort((a, b) => {
        const valueA = a[fieldName] ? a[fieldName].toLowerCase() : '';
        const valueB = b[fieldName] ? b[fieldName].toLowerCase() : '';
        if (fieldName === 'EMS_Candidate_Name__c') {
            // Sort by candidate name
            return valueA.localeCompare(valueB) * sortDirection;
        } else if (fieldName === 'EMS_Interview_Date__c') {
            // Sort by interview date
            const dateA = new Date(a[fieldName]);
            const dateB = new Date(b[fieldName]);
            if (dateA < dateB) {
                return -1 * this.sortDirection;
            } else if (dateA > dateB) {
                return 1 * this.sortDirection;
            } else {
                return 0;
            }
        } else {
            // Sort by other fields
            if (valueA < valueB) {
                return -1 * this.sortDirection;
            } else if (valueA > valueB) {
                return 1 * this.sortDirection;
            } else {
                return 0;
            }
        }
    });
}

    // Fetches the interview records from the server
    getInterviewRecords() {
        getInterviewRecords()
            .then(result=> {
                // Sort the records based on the sort field and direction
                const sortedRecords = this.sortRecords(result, this.sortFieldName, this.sortDirection);
                // Filter the records based on the search term
                if (this.searchTerm) {
                const regex = new RegExp(this.searchTerm, "i");
                this.records = sortedRecords.filter(record =>
                regex.test(record.EMS_Candidate_Name__c) ||
                regex.test(record.EMS_Interview_Type__c) ||
                regex.test(record.EMS_Interview_Status__c) ||
                regex.test(record.EMS_Applicant_Email__c) ||
                regex.test(record.EMS_Interviewer_Email__c)
                );
                } else {
                this.records = sortedRecords;
                }
                })
                .catch(error => {
                console.error(error);
                });
                }
               
                

// Sends bulk emails to the selected interview records
sendBulkEmails() {
    const interviewIds = this.selectedRecords.map(record => record.Id);
    if (interviewIds.length > 0) {
        sendBulkEmails({ interviewIds })
            .then(result => {
                console.log('result: ' + JSON.stringify(result));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Emails sent successfully',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}
}*/