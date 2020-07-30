import React from "react";
import Amplify from "aws-amplify";
import { ChatBot, AmplifyTheme } from "aws-amplify-react";
import awsconfig from "../../aws-exports";
import NavHeader from "../Navbar/NavHeader";

// config to access lex
Amplify.configure(awsconfig);

// Imported default theme. changes background color for header
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "#ff6600",
  },
};

export default function () {
  
  // handle completion event
  const handleComplete = (err, confirmation) => {
    if (err) {
      alert(
        "Bot conversation failed, please check your network or contact us if problem presists."
      );
      return;
    } else {
      return "Thank you! what would you like to do next?";
    }
  };

  return (
    <div>
     <NavHeader  />
    <ChatBot
      userInput="book ticket"
      title="Virtual Help"
      theme={myTheme}
      botName="BookTrip_dev"
      welcomeMessage="Welcome, with which module can i help you?"
      onComplete={handleComplete}
      clearOnComplete={false}
      textEnabled={true}
      conversationModeOn={true}
    />
    </div>
  );
}
