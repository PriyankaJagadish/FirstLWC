public class ReceiptController {
    @AuraEnabled(Cacheable=true)
    public static List<Receipt__c> getReceipts(String conId){
        return [Select Name,Contact__c,Amount__c from Receipt__c where Contact__c =:conId];
    }
}