exports.handler = async (event) => {
    const axios = require('axios').default;
    let result = ""
    if(event.currentIntent.name == "data") {
        switch(event.currentIntent.slots.task) {
           case "process": result = "goto navbar and navigate to data processing page, upload files "; break;
           case "analysis": result = "goto navbar and navigate to data processing page, upload files and see the analysis"; break;
        }
    }
    // online users
    if(event.currentIntent.name == "Chat") {
        let temp= await axios.post("https://ph3t9297m6.execute-api.us-east-1.amazonaws.com/default/serverless-onlineUsers", {
            "organization": event.currentIntent.slots.organisation
        })
        result = "following users are online: " + JSON.stringify(temp.data.map(item => item.email))
    }
    
    // standard for reponse
    const response = {
        sessionAttributes: {},  
        dialogAction: {   
            type: "Close",   
            fulfillmentState: "Fulfilled",
            message: {  
                contentType: "PlainText",     
                content: result
            } 
        }
    }
    return response;
};
