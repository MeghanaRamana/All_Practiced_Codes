public class AccountViewController {
    // Create a lightning-datatable and display modal on rowaction
    @AuraEnabled(cacheable=true)
    public static List<Contact> getDataFromContact(){
      List<Contact> conList = [Select Id, FirstName, LastName, Email, Phone From Contact limit 10];
      try{
         return conList;
      }
      catch(Exception e){
         throw new AuraHandledException(e.getMessage());
      }
    }
   @AuraEnabled(cacheable=true)
    public static List<CEMS_Job_Opening__c> getJobOpenings(){
        return [SELECT Id, Name, RecordTypeId,CEMS_Experience__c,CEMS_Job_Location__c, CEMS_Roles_and_Responsibilities__c, CEMS_Minimum_Pay__c, CEMS_Maximum_Pay__c, CEMS_Available_Vacancies__c, CEMS_Due_Date__c, CEMS_Skills__c, CEMS_Technology__c,CEMS_Approval_Status__c FROM CEMS_Job_Opening__c WHERE RecordType.Name = 'External Job Opening' AND CEMS_Approval_Status__c='Approved'];
    }

     @AuraEnabled(cacheable=true)
    public static List<CEMS_Job_Opening__c> getInternalJobOpenings(){
        return [SELECT Id, Name, RecordTypeId,CEMS_Experience__c, CEMS_Roles_and_Responsibilities__c, CEMS_Minimum_Pay__c, CEMS_Maximum_Pay__c, CEMS_Available_Vacancies__c, CEMS_Due_Date__c, CEMS_Skills__c, CEMS_Technology__c,CEMS_Approval_Status__c FROM CEMS_Job_Opening__c];
    }
    
    @AuraEnabled(cacheable = true)
    public static List<CEMS_Job_Opening__c> searchJobOpenings(string searchKey){
        searchKey = '%' + searchKey + '%';
        List<CEMS_Job_Opening__c> searched_Job = [SELECT Id, Name, CEMS_Technology__c,CEMS_Approval_Status__c FROM CEMS_Job_Opening__c  WHERE Name  LIKE :searchKey AND CEMS_Approval_Status__c= 'Approved'];
        if(searched_Job.isEmpty())  
        {
            throw new AuraHandledException('No Record Found..');
        }                
        return searched_Job;
    }
    @AuraEnabled(cacheable = true)
    public static List<string> getTechnologyOptions(){
    List<Schema.PicklistEntry> picklistValues = CEMS_Job_Opening__c.CEMS_Technology__c.getDescribe().getPicklistValues();
        List<string> technologyOptions = new List<string>();
                for (Schema.PicklistEntry picklistValue : picklistValues) {
            technologyOptions.add(picklistValue.getValue());
        }
        
        return technologyOptions;
    }
    
     @AuraEnabled(cacheable = true)
    public static List<String> getExperienceOptions(){
        List<Schema.PicklistEntry> pickListVal = CEMS_Job_Opening__c.CEMS_Experience__c.getDescribe().getPickListValues();

        List<String> experienceOptions = new List<String>();
        for(Schema.PickListEntry pickListValue : pickListVal){
            experienceOptions.add(pickListValue.getValue());
        }
        return experienceOptions;
    }
     @AuraEnabled(cacheable = true)
    public static List<String> getLocationOptions(){
        List<Schema.PicklistEntry> pickListVal = CEMS_Job_Opening__c.CEMS_Job_Location__c.getDescribe().getPickListValues();

        List<String> experienceOptions = new List<String>();
        for(Schema.PickListEntry pickListValue : pickListVal){
            experienceOptions.add(pickListValue.getValue());
        }
        return experienceOptions;
    }

   @AuraEnabled(cacheable = true)
    public static List<CEMS_Employee_Award__c> GetEmployeeAwards(string searchKey){
        List<CEMS_Employee_Award__c> EmployeeAwards = [SELECT Id, Name,CEMS_Award__r.Name ,CEMS_Award_Date__c,CEMS_Employee__r.Name FROM CEMS_Employee_Award__c];
        if(EmployeeAwards.isEmpty())  
        {
            throw new AuraHandledException('No Record Found..');
        }                
        return EmployeeAwards;
    }   
    @AuraEnabled(cacheable = true)
    public static List<CEMS_Performance__c> PerformanceReview(string searchKey){
        List<CEMS_Performance__c> EmployeePerformance = [SELECT Id,Name ,CEMS_Employee__r.Name,CEMS_Feedback__c FROM CEMS_Performance__c];
        if(EmployeePerformance.isEmpty())  
        {
            throw new AuraHandledException('No Record Found..');
        }                
        return EmployeePerformance;
    }   
}