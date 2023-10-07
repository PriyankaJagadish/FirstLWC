public class ComplaintController {
    @AuraEnabled
    public static string createComplaint(String complaintType, String comments,String caseId){
        Complaint__c complaint = new Complaint__c();
        complaint.Complaint_Type__c = complaintType;
        complaint.Comments__c = comments;
        complaint.Case__c = caseId;
        insert complaint;
        return complaint.Id;  
    }

    @AuraEnabled(Cacheable = true)
    public static List<Complaint__c> getComplaints(String accId){
         return[Select Name,Complaint_Type__c, Comments__c,Case__r.CaseNumber,Case__r.AccountId,Resolution__c from Complaint__c where Case__r.AccountId =: accId Order By CreatedDate Desc];
    }

    @AuraEnabled(Cacheable = true)
    public static List<Complaint__c> getCommentsOnComplaint(String complaintId){
         return[Select Name,Comments__c from Complaint__c where Id =: complaintId];
    }

    @AuraEnabled
    public static String updateResolution(String caseId,String resolution,String complaintId){
        Complaint__c complaint = new Complaint__c();
        complaint.Case__c = caseId;
        complaint.Id = complaintId;
        complaint.Resolution__c = resolution;
        update complaint;
        return complaint.Resolution__c;
    }
}