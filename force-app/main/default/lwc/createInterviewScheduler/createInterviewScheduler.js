import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import INTERVIEW_SCHEDULER_OBJECT from '@salesforce/schema/CEMS_Internal_Scheduler__c';
import INTERVIEW_PANEL_FIELD from '@salesforce/schema/CEMS_Internal_Scheduler__c.CEMS_Interview_Panel__c';
import INTERVIEW_STARTTIME_FIELD from '@salesforce/schema/CEMS_Internal_Scheduler__c.CEMS_Interview_Start_Time__c';
import INTERVIEW_ENDTIME_FIELD from '@salesforce/schema/CEMS_Internal_Scheduler__c.CEMS_Interview_End_Time__c';
import INTERVIEW_NAME_FIELD from '@salesforce/schema/CEMS_Internal_Scheduler__c.Name';
import INTERVIEW_LOCATION_FIELD from '@salesforce/schema/CEMS_Internal_Scheduler__c.CEMS_Interview_Location__c';
import INTERVIEW_ROUND_FIELD from '@salesforce/schema/CEMS_Internal_Scheduler__c.CEMS_Interview_Round__c';
import INTERVIEW_JOBAPPLICATION_FIELD from '@salesforce/schema/CEMS_Internal_Scheduler__c.CEMS_Job_Application_ID__c';
import INTERVIEW_MEETINGLINK_FIELD from '@salesforce/schema/CEMS_Internal_Scheduler__c.CEMS_Meeting_Link__c';
import INTERVIEW_INTERVIEWSTATUS_FIELD from '@salesforce/schema/CEMS_Internal_Scheduler__c.CEMS_Interview_Status__c';


export default class CreateInterviewScheduler extends LightningElement {
    @api recordId;
    @track showForm = false;
    objectApiName = INTERVIEW_SCHEDULER_OBJECT;
    fieldList = [INTERVIEW_NAME_FIELD, INTERVIEW_PANEL_FIELD, INTERVIEW_JOBAPPLICATION_FIELD, INTERVIEW_INTERVIEWSTATUS_FIELD, INTERVIEW_ROUND_FIELD, INTERVIEW_STARTTIME_FIELD, INTERVIEW_ENDTIME_FIELD, INTERVIEW_MEETINGLINK_FIELD, INTERVIEW_LOCATION_FIELD];
    

    successHandler(event) {
        console.log(event.detail.id);
        const toastEvent = new ShowToastEvent({
            title: 'Interview scheduled',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }
   
  
    handleScheduleInterview() {
        // Logic to handle the "Schedule Interview" button click
        // You can perform any necessary actions here
        
        // Dispatch a custom event to notify the parent component
        this.showForm = true;
        const event = new CustomEvent('scheduleinterview');
        this.dispatchEvent(event);
    }

    handleCloseSchedule() {
        this.showForm = false;
        const event = new CustomEvent('openscheduleinterview');
        this.dispatchEvent(event);
    }
}