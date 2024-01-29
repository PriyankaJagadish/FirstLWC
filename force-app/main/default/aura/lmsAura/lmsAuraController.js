({
    handleMessage : function(component, message, helper) {
        console.log(message.getParam("lmsData").value);
        component.set("v.rating",message.getParam("lmsData").value);
    },

    handleClick : function( component, event, helper ) {    
        console.log('Im here');
        let action = component.get( "c.getAccountList");
        action.setParams({
            Rating: component.get("v.rating")
        });
        console.log(Rating);
        action.setCallback(this,function(response){
            let state = response.getState();  
            if(state === "SUCCESS"){
                component.set("v.accountList", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
})
