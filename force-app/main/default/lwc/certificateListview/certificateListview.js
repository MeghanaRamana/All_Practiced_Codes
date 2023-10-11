import { LightningElement, wire } from 'lwc';

import getCertificates from "@salesforce/apex/CertificateController.getCertificates";
import searchCertificate from "@salesforce/apex/CertificateController.searchCertificate";
import deleteCertificates from "@salesforce/apex/CertificateController.deleteCertificates";

import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';

const ACTIONS = [{ label: 'Delete', name: 'delete' }];

const COLS = [
    { label: 'Certificate Name', fieldName: 'link', type: 'url', typeAttributes: { label: { fieldName: 'Name' } } },
    { label: 'Category', fieldName: 'EMS_Category__c' },
    { label: 'Designated Days', fieldName: 'EMS_Designated_Days__c' },
    { fieldName: 'actions', type: 'action', typeAttributes: { rowActions: ACTIONS } }
];



export default class certificateListview extends NavigationMixin(LightningElement) {
    cols = COLS;
    certificates;
    wiredCertificates;
    selectedCertificates;
    baseData;

    get selectedCertificatesLen() {
        if (this.selectedCertificates === undefined) return 0;
        return this.selectedCertificates.length;
    }

    @wire(getCertificates)
    certificatesWire(result) {
        this.wiredCertificates = result;
        if (result.data) {
            this.certificates = result.data.map((row) => {
                return this.mapCertificates(row);
            });
            this.baseData = this.certificates;
        }
        if (result.error) {
            console.error(result.error);
        }
    }

    mapCertificates(row) {
        return {
            ...row,
            link: `/${row.Id}`,
        };
    }

    handleRowSelection(event) {
        this.selectedCertificates = event.detail.selectedRows;
    }

    async handleSearch(event) {
        if (event.target.value === "") {
            this.certificates = this.baseData;
        } else if (event.target.value.length > 1) {
            const searchCertificates = await searchCertificate({ searchString: event.target.value });

            this.certificates = searchCertificates.map((row) => {
                return this.mapCertificates(row);
            })
        }
    }

    navigationTonewrecordPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'EMS_Certificate__c',
                actionName: 'new'
            }
        });
    }

    handleRowAction(event) {
        deleteCertificates({ certificateIds: [event.detail.row.Id] }).then(() => {
            refreshApex(this.wiredCertificates);
        });
    }

    deleteSelectedCertificate() {
        const idList = this.selectedCertificates.map((row) => {
            return row.Id })
        deleteCertificates({ certificateIds: idList }).then(() => {
            refreshApex(this.wiredCertificates);
        })
        this.template.querySelector('lightning-datatable').selectedRows = [];
        this.selectedCertificates = undefined;
    }
}