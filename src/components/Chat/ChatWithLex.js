import React from 'react';
import Amplify from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from '../../aws-exports';
import NavHeader from "../Navbar/NavHeader";


Amplify.configure(awsconfig);

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600',
  }
};

export default function() {

  const handleComplete = (err, confirmation) => {
    if (err) {
      alert('Bot conversation failed, please check your network and try again.')
      return;
    }
    else {
      return 'Thank you! what would you like to do next?';
    }
  }

  return (
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
  );
}