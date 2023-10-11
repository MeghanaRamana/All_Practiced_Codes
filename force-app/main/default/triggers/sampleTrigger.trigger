trigger sampleTrigger on Account (before insert,before update,before delete,
                                   after insert, after update,after delete) {
if(trigger.isBefore){
    if(trigger.isDelete){
        for(account a:trigger.old){
            if(a.Name=='OkToDelete'){
                a.addError('this record cannot be deleted');
            }
        }
    }else {
    for(account a: trigger.new){
        if(a.name=='bad'){
            a.addError('bad name');
        }
    }}
    if(trigger.isInsert){
        for(account a: trigger.new){
            system.assertEquals('xxx', a.AccountNumber);

            system.assertEquals('Insurance', a.Industry);
            system.assertEquals(100, a.NumberOfEmployees);
            system.assertEquals(100.00, a.AnnualRevenue);
            a.AccountNumber='yyy';
        }}

        else {
            IF(trigger.isUpdate){
                list<contact> clist= new list<contact>();
                for(account a: trigger.new){
                    if(a.name!='deploy'){
                        clist.add(new contact(LastName=a.name+'contact',
                        AccountId=a.id));
                    }
                } 
                insert clist;
            }
        }
    }
    }