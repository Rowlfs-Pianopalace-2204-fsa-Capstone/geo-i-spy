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
import socket from '../Thunks/Socket';

export default function RoomScreen({ navigation }) {
  const { singleRoom, authData } = React.useContext(GlobalDataContext);
  const [messages, setMessages] = useState([]);
  const [reset, setReset] = useState(1);

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
  useEffect(() => {
    console.log('MAYBE? SOCKET IN CHAT');
    socket.on(`resetMessage${authData.id}`, (msg) => {
      console.log(msg.messages);
      let giftedChatMessages = msg.messages.map((msg) => {
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
      // let gcm = {
      //   _id: msg.id,
      //   text: msg.message,
      //   createdAt: msg.createdAt,
      //   user: {
      //     _id: msg.user.id,
      //     name: msg.user.username,
      //     avatar: msg.user.img_url,
      //   },
      // };
      // giftedChatMessages.push(gcm);
      giftedChatMessages = giftedChatMessages.reverse();
      setMessages(giftedChatMessages);
    });
  }, [socket]);

  const findOtherUser = () => {
    for (let i = 0; i < singleRoom.messages.length; i++) {
      const ele = singleRoom.messages[i];
      if (ele.user.id !== authData.id) {
        return ele.user.id;
      }
    }
  };

  const handleSend = async (newMessage = {}) => {
    const apiMessage = { message: newMessage[0].text };
    const otherUserId = findOtherUser();
    console.log(singleRoom.id);
    await apiPostMessage(singleRoom.id, apiMessage, otherUserId);
    newMessage._id = newMessage.id;
    setMessages(GiftedChat.append(messages, newMessage));
  };

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        key={props.currentMessage._id}
        wrapperStyle={{
          right: {
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
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
}

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
