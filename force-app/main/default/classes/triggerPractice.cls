public with sharing class triggerPractice {
    public static void triggerPractice() {
        Account acc = new Account(Name = 'accountWithCase');
        insert acc;
        Account query = [SELECT Name,Id from account where Name = 'accountWithCase' LIMIT 1];
        Case cs = new Case(Status = 'New', Origin = 'Phone',AccountId = query.Id );
        insert cs;
        


    }
}