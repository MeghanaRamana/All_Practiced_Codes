import { api, LightningElement } from 'lwc';

export default class ForLeaveObject extends LightningElement {
    @api recordId;

    handleSubmit(event) {
      event.preventDefault();
      const fields = event.detail.fields;
      this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    showErrorToast() {
        const evt = new ShowToastEvent({
            title: 'Toast Error',
            message: 'Some unexpected error',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    showSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'Toast Success',
            message: 'Opearion sucessful',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}