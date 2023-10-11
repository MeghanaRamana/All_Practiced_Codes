@isTest
private class googleIntegrationTest {
    @isTest static void testReverseGeocode() {
        // Create test data
        set<Id> idset= new set<Id>();
        List<Account> accounts = new List<Account>{
            new Account(Name='Test Account 1', Geoloc__latitude__s=40.714224, Geoloc__longitude__s=-73.961452),
            new Account(Name='Test Account 2', Geoloc__latitude__s=40.714224, Geoloc__longitude__s=-73.961452)
        };
        insert accounts;
        for(account acc: accounts){
        idset.add(acc.Id);
            }
        test.startTest();
        Test.setMock(HttpCalloutMock.class, new GoogleIntegrationMock());
        googleIntegration.reverseGeocode(idset);
        test.stopTest();

        // Assert that the fields are updated with expected values
        accounts = [SELECT Id, Name, BillingCountry, BillingStreet, BillingPostalCode FROM Account WHERE Id IN :accounts];
        for (Account acc : accounts) {
            System.assertEquals('United States', acc.BillingCountry);
            System.assertEquals('Bedford Avenue', acc.BillingStreet);
            System.assertEquals('277', acc.BillingPostalCode);
        }
    }
}