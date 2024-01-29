public class ContactController {

    //Insert Contact without lookup
    /*@AuraEnabled
    public static string insertContact(String lastName, String mobile){
        Contact con = new Contact();
        con.LastName = lastName;
        con.MobilePhone = mobile;
        insert con;
        return con.Id;  
    }*/

       //Insert Contact with lookup
       @AuraEnabled
       public static string insertContact(String lastName, String mobile,String recordId){
           Contact con = new Contact();
           con.LastName = lastName;
           con.MobilePhone = mobile;
           con.AccountId = recordId;
           insert con;
           return con.Id;  
       }
       @AuraEnabled
       public static string createContact(String fName,String lName, Date bDate,String email,String dept,String recordId){
           Contact con = new Contact();
           con.FirstName = fName;
           con.LastName = lName;
           con.Birthdate = bDate;
           con.Email = email;
           con.Department = dept;
           con.AccountId = recordId;
           insert con;
           return con.Id;  
       }

       //Get All Contacts
       @AuraEnabled(Cacheable = true)
       public static List<Contact> getAllContacts(String searchKey){
        String search = '%'+searchKey+'%';
        if(String.isNotBlank(search)){
            return [SELECT Id,FirstName,LastName,Email,Phone,Title,AccountId,Account.Name FROM Contact WHERE AccountId != null AND FirstName LIKE :search];
        }
        else{
            return [SELECT Id,FirstName,LastName,Email,Phone,Title,AccountId,Account.Name FROM Contact WHERE AccountId != null];
        }
       }
       //Bulk Delete
       @AuraEnabled
       public static void bulkDeleteContacts(List<Id> conIds){ 
            List<Contact> deleteCons = [SELECT Id from Contact where Id IN :conIds];
            delete deleteCons;
       }

       
       
       //Get Contacts for Account
       @AuraEnabled(Cacheable = true)
       public static List<Contact> getContacts(String accId){
            List<Contact> conList = new List<Contact>();
            if(accId != null){
                conList = [Select FirstName, LastName,Phone,Email from Contact where AccountId =: accId];
            }
            return conList;
       }
       //Get Contacts for User
       @AuraEnabled(Cacheable = true)
       public static List<Contact> getContactsOnUser(String userId){
            return[Select FirstName, LastName,Phone,Email from Contact where OwnerId =: userId];
       }
}