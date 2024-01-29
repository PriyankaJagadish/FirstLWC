public class EventAttendeesController {
    @AuraEnabled(Cacheable = true)
    public static List<Contact> getEventAttendees(String eventId){
        List<Contact> availableAttendees = new List<Contact>();
        if(eventId != null){
            availableAttendees = [Select Id, Name from Contact where Id NOT in 
                                    (Select Attendee__c from Event_Participant__c where Event__c = :eventId)];
           
        }
        return availableAttendees;
    }

    @AuraEnabled
    public static void createEventAttendees(String eventId,List<String> selectedAttendeesId ){
        List<Event_Participant__c> eventPartList = new List<Event_Participant__c>();

        for(String conId : selectedAttendeesId ){
            Event_Participant__c eventPart = new Event_Participant__c();
            eventPart.Event__c = eventId;
            eventPart.Attendee__c = conId;
            eventPartList.add(eventPart);
        }
        
        if(!eventPartList.isEmpty()){
            insert eventPartList;
        }
    }
}