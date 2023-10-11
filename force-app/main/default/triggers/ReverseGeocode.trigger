trigger ReverseGeocode on Account (after insert, after update) {
    Set<Id> accId = new Set<Id>();
    if (Trigger.isInsert && Trigger.isAfter) {
        for (Account acc : Trigger.new) {
            accId.add(acc.Id);
         System.debug('Account: ' + acc.Name + ', ' + acc.BillingCountry + ', ' + acc.BillingStreet + ', ' + acc.BillingPostalCode);
        }
    } else {
        for (Account acc : Trigger.new) {
            accId.add(acc.Id);
         System.debug('Account: ' + acc.Name + ', ' + acc.BillingCountry + ', ' + acc.BillingStreet + ', ' + acc.BillingPostalCode);
        }
    }
    system.debug(accId);
    if (System.IsBatch() == false && System.isFuture() == false) { 
        googleIntegration.reverseGeocode(accId);
    }
}