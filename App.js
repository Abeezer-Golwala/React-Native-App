import React from 'react';
import type {Node} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
  Linking,
  PermissionsAndroid,
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


CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, (e)=>{console.log(e)});

CleverTap.addListener(CleverTap.CleverTapInboxMessageTapped, (event) => {console.log("Appinbox clicked"+JSON.stringify(event))});

CleverTap.addListener(CleverTap.CleverTapInboxMessageButtonTapped, (event) => {console.log("Appinbox button clicked"+JSON.stringify(event))});



console.log("test")
// Listener to handle incoming deep links
Linking.addEventListener('url', (e)=>{console.log("Deeplink inside app"+e.url)});
/// this handles the case where a deep link launches the application
Linking.getInitialURL().then((url) => {
  if (url) {
      console.log('launch url', url);
  }
}).catch(err => console.error('launch url error', err));
// check to see if CleverTap has a launch deep link


// handles the case where the app is launched from a push notification containing a deep link
CleverTap.getInitialUrl((err, url) => {
if (url) {
    console.log('CleverTap launch url', url);
} else if (err) {
    console.log('CleverTap launch url', err);
}
});

CleverTap.addListener(CleverTap.CleverTapDisplayUnitsLoaded, (data) => {
  console.log("displayunits"+JSON.stringify(data))
});



CleverTap.onUserLogin({
  'Name': 'Jack Montana',    
  'Identity': '61022'     
})

//Initialize app inbox
CleverTap.initializeInbox();

CleverTap.addListener(CleverTap.CleverTapInboxDidInitialize, (event) => {
  console.log('CleverTap Inbox Event - ', CleverTap.CleverTapInboxDidInitialize, event);
});
// Triggered when a new message is recieved or the app inbox message is read 
CleverTap.addListener(CleverTap.CleverTapInboxMessagesDidUpdate, (event) => {
  console.log('CleverTap Inbox Event - ', CleverTap.CleverTapInboxMessagesDidUpdate, event);
  console.log("INBOX Updated")
});



CleverTap.createNotificationChannel("abtest", "CT Channel id- abtest", "CT React Native Testing", 5, true) 
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        } catch (error) {
      }
    }};
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <Button onPress={() => {
            CleverTap.recordEvent('Abeezergetmsg');
            console.log("test");
          }} title="Get event"/> 
        <Button onPress={() => {
        CleverTap.showInbox({
            });
          }} title="App inbox"/> 
          <Button onPress={() => {
       checkApplicationPermission()
          }} title="push permission"/> 
          <Button onPress={() => {
CleverTap.getAllDisplayUnits((err, res) => {
  console.log('All Display Units: ', res, err);
});
          }} title="display units"/> 
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;