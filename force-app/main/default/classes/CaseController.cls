public class CaseController {

    @AuraEnabled
    public static String getCase(String recId){
        Case cas = [Select Origin, Status, AccountId, ContactId, Reason, Type, Subject from Case where Id =: recId with SECURITY_ENFORCED];
        //clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber)
        Case copycas = cas.clone(false,false,false,false);
        insert copycas;
        return copycas.Id;
    }

    //Get Cases for Account
    @AuraEnabled(Cacheable = true)
    public static List<Case> getCaseOnAccount(String recId){
        return [Select Id, CaseNumber from Case Where AccountId =: recId with SECURITY_ENFORCED];
    }

    //Get all open Cases
    @AuraEnabled(Cacheable = true)
    public static List<Case> getOpenCases(){
        return [Select Id,Subject,Case.Owner.Name,CreatedDate from Case where status != 'Closed' with SECURITY_ENFORCED];
    }

    //Test

    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseList() {
        return [SELECT Id,Subject, Case_Age__c, Case.Owner.Name FROM Case Order by CreatedDate desc limit 10 ];
    }
}