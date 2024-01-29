public class AccountController{

    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccountList(String Rating){
        return [Select Id,Name,Rating from Account where Rating =:Rating];
    }
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccountsOnUser(String userId){
        return [Select Id,Name,Rating from Account where OwnerId =: userId];
    }
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccountList1(){
        return [Select Id,Name,Rating from Account];
    }
    @AuraEnabled(Cacheable=true)
    public static List<Account> searchAccount(String accName){
        accName = '%' + accName + '%';
        return [Select Id, Name, AccountNumber,BillingState from Account where Name like :accName];
    }

    @AuraEnabled
    public static void updateAnnualRevenue(String recId){
        Account acc = new Account();
        acc.Id = recId;
        acc.AnnualRevenue = 25000;
        update acc;
    }

    @AuraEnabled
    public static void deleteAccount(String recId){
        Account acc = new Account();
        acc.Id = recId;
        delete acc;
    }


    /*@AuraEnabled(Cacheable=true)
    public static List<Account> getAllAccounts(String billingCity)
    {
        List<Account> accList = [Select Id,Name from Account where billingState =: billingCity WITH SECURITY_ENFORCED];
        System.debug(accList);
        return accList;
    }*/

    
}