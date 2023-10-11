import { LightningElement, wire } from 'lwc';
import getCalendarEvents from '@salesforce/apex/holidayCalender.getEvents';
const columns = [
    { label: 'Holiday', fieldName: 'Subject' ,wrapText: true, hideDefaultActions: true},
    { label: 'Date', fieldName: 'StartDateTime', type: 'date',wrapText: true, hideDefaultActions: true },
];
export default class HolidayCalender extends LightningElement {
    events = [];
    startDate;
    endDate;

    connectedCallback() {
        // Get current year start date and end date
        const currentYear = new Date().getFullYear();
        this.startDate = currentYear + '-01-01';
        this.endDate = currentYear + '-12-31';
    }

    @wire(getCalendarEvents, { startDate: '$startDate', endDate: '$endDate' })
    wiredEvents({ error, data }) {
        if (data) {
            console.log("Data:" + JSON.stringify(data));
            this.events = data.map(event => {
                return {
                    id: event.Id,
                    Subject: event.Subject,
                    StartDateTime: event.StartDateTime,
                };
            });
        } else if (error) {
            console.error(error);
        }
    }

    get columns() {
        return columns;
    }
}