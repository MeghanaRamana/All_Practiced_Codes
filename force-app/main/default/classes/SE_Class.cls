public with sharing class SE_Class {
     @auraEnabled
    public static  resultWrapper listFields(string ObjDetails){
       list<SE_QuoteCreation__mdt> Details=[SELECT ObjectName__c,FieldType__c,	FieldName__r.developerName from SE_QuoteCreation__mdt where ObjectName__c=:ObjDetails ];
        system.debug('DETAILS======>'+Details);
       set<string> objectName= new set<string>();
       list<string> fieldName = new list<string>();
        for(integer i=0; i<Details.size(); i++){
        objectName.add(Details[i].ObjectName__c);
        fieldName.add(Details[i].FieldName__r.developerName);
        }
        system.debug(objectName);
        system.debug(fieldName); 
        
        SObjectType sObjectName= schema.getGlobalDescribe().get(ObjDetails);
        system.debug('sObjectName====>'+sObjectName);
        map<string, schema.SObjectField> fields= sObjectName.getDescribe().fields.getMap();
        system.debug('fields====>'+fields);
        list<schema.SObjectField> fieldList= new list<schema.SObjectField>();
        
        for(integer i=0; i<fieldName.size();i++){
            fieldList.add(fields.get(fieldName.get(i)));
        }
       system.debug('fieldList========>'+fieldList);
        
       list<fieldDataWrapper> WrapperList= new    list<fieldDataWrapper>();
        for(schema.SObjectField sfield:fieldList){
         fieldDataWrapper wrapper = new fieldDataWrapper();
            wrapper.label = sfield.getDescribe().getLabel();
            wrapper.fieldName= sfield.getDescribe().getName();
            wrapper.fieldtype =string.valueOf(sfield.getDescribe().getType());
            WrapperList.add(wrapper);
            system.debug('this is what wrapper contains======>'+wrapper);
        }
        system.debug('WrapperList=======>'+ WrapperList);
        resultWrapper result= new resultWrapper(objectName, fieldName, WrapperList );
        system.debug('result======>'+ result);
        return result;
        
        
    }
         public class resultWrapper{
        @AuraEnabled	public set<string> objectType {get; set;}
        @AuraEnabled	public list<string> fieldNames {get; set;}
        @AuraEnabled	public List<fieldDataWrapper> fieldDetails {get; set;}
        
        public resultWrapper(set<String> obj, list<String> columns, List<fieldDataWrapper> fields){
            objectType = obj;
            fieldNames = columns;
            fieldDetails = fields;
        }
    }
    
    public class fieldDataWrapper{
        @AuraEnabled	public String label { get; set; }
        @AuraEnabled	public String fieldName { get; set; }
        @AuraEnabled	public String fieldtype { get; set; }
    }
   

}