public without sharing class RegistrationForm {
    // public class RegistrationWrapper {
    //     @AuraEnabled
    //     public String firstName ;
    //     @AuraEnabled
    //     public String lastName;
    //     @AuraEnabled
    //     public String email ;
    //     @AuraEnabled
    //     public string phone;
    //     /*@AuraEnabled
    //     public String city ;
    //     @AuraEnabled
    //     public String street ;
    //     @AuraEnabled
    //     public String country;
    //     @AuraEnabled
    //     public String postalCode ;*/
    //     @AuraEnabled
    //     public String highestDegree ;
    //     @AuraEnabled
    //     public String qualification ;
    //     @AuraEnabled
    //     public integer cgpa ;
    //     @AuraEnabled
    //     public String panNumber ;
    //     @AuraEnabled
    //     public String experience;
    //     @AuraEnabled
    //     public String previousCompany ;
    //    /* @AuraEnabled
    //     public String resume { get; set; }*/
    //     @AuraEnabled
    //     public String role ;
    // }
    @AuraEnabled
    public static void Register(String firstName, String lastName, String email, String city, String street,String country, String postalCode, String phone, String highestDegree, String qualification, Integer cgpa, String panNumber, String experience, String previousCompany, String role ) {
       
        // Create records in CEMS_Personnel__c and CEMS_Job_Application__c objects
    //     List<CEMS_Personnel__c> existingUsers = [SELECT Id FROM CEMS_Personnel__c WHERE CEMS_Email__c = :registration.email AND CEMS_PAN_Card_Number__c = :registration.panNumber AND RecordTypeId = '012DO0000008XfIYAU'  LIMIT 1];
    // if (!existingUsers.isEmpty()) {
    //     throw new AuraHandledException('A user with the same email and pancard already exists. Registration cannot proceed.');
    // }
        CEMS_Personnel__c personnel = new CEMS_Personnel__c();
        personnel.RecordTypeId = '012DO0000008XfIYAU';
        
        personnel.Name = firstName;
        personnel.CEMS_Email__c = email;
        personnel.CEMS_Contact_Number__c = phone;
        personnel.CEMS_Address__Street__s = street;
        personnel.CEMS_Address__PostalCode__s = postalCode;
        personnel.CEMS_Address__City__s = city;
        //personnel.CEMS_Address__CountryCode__s = country;
        personnel.CEMS_Highest_Degree__c = highestDegree;
        personnel.CEMS_Board_Of_Qualification__c = qualification;
        personnel.CEMS_CGPA_Percentage__c = cgpa;
        personnel.CEMS_PAN_Card_Number__c = panNumber;
        personnel.CEMS_Experience__c = experience;
        personnel.CEMS_Company_Name__c = previousCompany;
        //jobApplication.Resume__c = registration.resume;
        personnel.CEMS_Roles__c = role;
        // Insert the records
        try{
            insert personnel;
           
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
            

        }     
    }
    
    public static void verifyLogin(string email){
        
        List<CEMS_Personnel__c> LoginCheck = [SELECT Id, Name, RecordTypeId, CEMS_Work_Email__c, CEMS_Personal_Email__c, CEMS_Email__c, CEMS_PAN_Card_Number__c FROM CEMS_Personnel__c WHERE RecordType.Name='Employee'AND CEMS_Personal_Email__c = :email];
        
        if(LoginCheck.isEmpty()){
            system.debug('empty');           
        }
        
    }
    
}