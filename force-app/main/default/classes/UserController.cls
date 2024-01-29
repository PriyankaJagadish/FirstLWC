public with sharing class UserController {
    @AuraEnabled(Cacheable=true)
    public static List<User> getUsers(){
        return [Select Id,Name,FirstName from User where isActive = true];
    }
}