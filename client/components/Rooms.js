/** @format */

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { GlobalDataContext } from '../Context';
import { apiPostMessage } from '../Thunks/Messages';

export default function RoomScreen({ navigation }) {
  const {
    rooms,
    setRooms,
    singleRoom,
    setSingleRoom,
    authData,
    setSingleUser,
  } = React.useContext(GlobalDataContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let giftedChatMessages = singleRoom.messages.map((msg) => {
      let gcm = {
        _id: msg.id,
        text: msg.message,
        createdAt: msg.createdAt,
        user: {
          _id: msg.user.id,
          name: msg.user.username,
          avatar: msg.user.img_url,
        },
      };
      return gcm;
    });
    giftedChatMessages = giftedChatMessages.reverse();
    setMessages(giftedChatMessages);
  }, []);

  // helper method that is sends a message
  const handleSend = async (newMessage = {}) => {
    // console.log('MESSAGE:', newMessage[0].text);
    const apiMessage = { message: newMessage[0].text };
    await apiPostMessage(singleRoom.id, apiMessage);
    newMessage._id = newMessage.id;
    setMessages(GiftedChat.append(messages, newMessage));
  };

  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        key={props.currentMessage._id}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{
        _id: authData.id,
        name: authData.username,
        avatar: authData.img_url,
      }}
      renderBubble={renderBubble}
      placeholder='Type your message here...'
      showUserAvatar
      alwaysShowSend
      // Step 2: add the prop
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
}

// Step 3: add corresponding styles
const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
