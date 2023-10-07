public class CaseController {

    @AuraEnabled
    public static String getCase(String recId){
        Case cas = [Select Origin, Status, AccountId, ContactId, Reason, Type, Subject from Case where Id =: recId];
        //clone(preserveId, isDeepClone, preserveReadonlyTimestamps, preserveAutonumber)
        Case copycas = cas.clone(false,false,false,false);
        insert copycas;
        return copycas.Id;
    }

    //Get Cases for Account
    @AuraEnabled(Cacheable = true)
    public static List<Case> getCaseOnAccount(String recId){
        return [Select Id, CaseNumber from Case Where AccountId =: recId];
    }
}