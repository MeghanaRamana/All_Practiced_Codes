import { LightningElement,track } from 'lwc';
export default class PublicSiteSidebar extends LightningElement {
@track currentContent = 'cittacore';
    @track homeValue = false;    
    @track personalDetailsValue = false;
    @track myProjectsValue = false;
    @track myPerformanceValue = false;
    @track leavesValue = false;
    @track jobOpeningsValue = false;
    @track awardValue = false;
   @track interviewSheduleValue = false;
    @track resignationValue = false;
    
   
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
      
 
        if (selected == 'Home'){
            this.homeValue = true;
        }else{
            this.homeValue = false;
        }
 
        if (selected == 'PersonalDetails'){
            this.personalDetailsValue = true;
        }else{
            this.personalDetailsValue = false;
        }
 
        if (selected == 'MyProjects'){
            this.myProjectsValue = true;
        }else{
            this.myProjectsValue = false;
        }
 
        if (selected == 'MyPerformance'){
            this.myPerformanceValue = true;
        }else{
            this.myPerformanceValue = false;
        }
 
        if (selected == 'Leaves'){
            this.leavesValue = true;
        }else{
            this.leavesValue = false;
        }
 
        if (selected == 'jobopenings'){
            this.jobOpeningsValue = true;
        }else{
            this.jobOpeningsValue = false;
        }
        if (selected == 'Awards'){
            this.awardValue = true;
        }else{
            this.awardValue = false;
        }
        if (selected == 'InterviewSchedule'){
            this.interviewSheduleValue = true;
        }else{
            this.interviewSheduleValue = false;
        }
        if (selected == 'Resignation'){
            this.resignationValue = true;
        }else{
            this.resignationValue = false;
        }
 
    }
}