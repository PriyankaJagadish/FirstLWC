public with sharing class EmailController {
    
    @AuraEnabled
    public static void sendEmail(String fromAddress, String toAddress, String subject, String body){

        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();

        if(fromAddress == 'Org Wide Email' ){
            OrgWideEmailAddress orgEmail = [Select Id, Address from OrgWideEmailAddress];
            message.setOrgWideEmailAddressId(orgEmail.Id);
        }
        
        message.setToAddresses(new List<String>{toAddress});
        message.setSubject(subject);
        message.setHtmlBody(body); 

        Messaging.sendEmail(new List<Messaging.Email>{message});

    }

    @AuraEnabled(cacheable = true)
    public static OrgWideEmailAddress getOrgEmail(){
        OrgWideEmailAddress orgEmail = [Select Id, Address from OrgWideEmailAddress];
        return orgEmail;
    }
}