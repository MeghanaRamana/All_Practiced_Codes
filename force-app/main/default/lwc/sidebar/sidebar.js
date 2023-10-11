import { LightningElement, track } from 'lwc';
 
export default class Sidebar extends LightningElement {
   
    @track currentContent = 'cittacore';
    @track cittacoreValue = false;    
    @track jobopeningsValue = false;
    @track jobapplicationsValue = false;
    @track interviewscheduleValue = false;
    @track dashboardValue = false;
    @track salesforceLwcValue = false;
   
//    connectedCallback() {
//         if (this.currentContent !== 'cittacore') {
//         const cittacoreTab = this.template.querySelector('[name="cittacore"]');
//         if (cittacoreTab) {
//             cittacoreTab.click();
//         }
//     }
//    }
 
    changeHandleAction(event) {
        const selected = event.detail.name;        

        this.currentContent = selected;
      
 
        if (selected == 'cittacore'){
            this.cittacoreValue = true;
        }else{
            this.cittacoreValue = false;
        }
 
        if (selected == 'jobopenings'){
            this.jobopeningsValue = true;
        }else{
            this.jobopeningsValue = false;
        }
 
        if (selected == 'jobapplications'){
            this.jobapplicationsValue = true;
        }else{
            this.jobapplicationsValue = false;
        }
 
        if (selected == 'interviewschedule'){
            this.interviewscheduleValue = true;
        }else{
            this.interviewscheduleValue = false;
        }
 
        if (selected == 'dashboard'){
            this.dashboardValue = true;
        }else{
            this.dashboardValue = false;
        }
 
        if (selected == 'salesforceLwc'){
            this.salesforceLwcValue = true;
        }else{
            this.salesforceLwcValue = false;
        }
 
    }
}