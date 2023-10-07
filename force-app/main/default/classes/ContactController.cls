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

       //Get Contacts for Account
       @AuraEnabled(Cacheable = true)
       public static List<Contact> getContacts(String accId){
            return[Select FirstName, LastName,Phone,Email from Contact where AccountId =: accId];
       }
}