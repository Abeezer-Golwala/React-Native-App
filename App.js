import React, { Component } from "react";
import {
  Button,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const CleverTap = require('clevertap-react-native');
CleverTap.initializeInbox();
CleverTap.addListener(CleverTap.CleverTapInboxDidInitialize, (event) => {
  _handleCleverTapInbox(CleverTap.CleverTapInboxDidInitialize, event);
});
function _handleCleverTapInbox(eventName, event) {
  console.log('CleverTap Inbox Event - ', eventName, event);

}

//Listener triggered after a new app inbox message is recieved.

CleverTap.addListener(CleverTap.CleverTapInboxMessagesDidUpdate, (event) => {
  _handleCleverTapInbox(CleverTap.CleverTapInboxMessagesDidUpdate, event);
  CleverTap.getInboxMessageUnreadCount((err, res) => {
    console.log('Unread Messages: ', res, err);
});
});

CleverTap.createNotificationChannel("abtest","abtest","Clevertap test",3,true);

CleverTap.addListener(CleverTap.CleverTapDisplayUnitsLoaded, (event) => {
  console.log("CleverTapDisplayUnitsLoaded",event);
});
CleverTap.addListener(CleverTap.CleverTapInAppNotificationButtonTapped, (event) => {
  _handleCleverTapEvent(CleverTap.CleverTapInAppNotificationButtonTapped, event);
});

function _handleCleverTapEvent(eventName, event) {
console.log('CleverTap Event called - ', eventName, event);
}
// Listener to handle incoming deep links
Linking.addEventListener('url', (e)=>{console.log("Deeplink inside app"+e.url)});

/// this handles the case where a deep link launches the application
Linking.getInitialURL().then((url) => {
    if (url) {
        console.log('launch url', url);
    }
}).catch(err => console.error('launch url error', err));
// check to see if CleverTap has a launch deep link

CleverTap.onUserLogin({
  'Name': 'Jack Montana',    
  'Identity': '61022'     
})
// handles the case where the app is launched from a push notification containing a deep link
CleverTap.getInitialUrl((err, url) => {
  if (url) {
      console.log('CleverTap launch url', url);
  } else if (err) {
      console.log('CleverTap launch url', err);
  }
});
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree",
      ]
    };
  }
  render() {
    return (
        <View style={{ flex: 1,  }}>
          <Button onPress={() => {
            CleverTap.recordEvent('Abeezergetmsg');
            console.log("test");
          }} title="Get event"/> 
          <Button onPress={() => {
CleverTap.showInbox({
    });
          }} title="App inbox"/> 
          <Button onPress={() => {
            this.state.images = []
             CleverTap.getAllDisplayUnits((err, res) => {
              this.setState({ datasource: JSON.parse(res) })
              for (var i=0; i< this.state.datasource.content.length; i++){
                this.setState({nativekey: this.state.datasource.wzrk_id}) //Store wzrk_id to use it as Unit_id  
                this.setState({ url: this.state.datasource.content[i].media.url})
                console.log(i);
                // this.state.images = [...prevState.images,this.state.url]
                this.setState({images: this.state.images.concat(this.state.url)})
                console.log("Unit ID is"+this.state.url)
              }
              });
          }} title="Get display units"/> 
  
      </View>
    );
}
}