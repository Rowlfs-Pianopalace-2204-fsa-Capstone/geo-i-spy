/** @format */

// /** @format */

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import { GlobalDataContext } from '../Context';
// import tw from 'twrnc';
// import socket from '../Thunks/Socket';
// import { timeSince } from '../helpers/time';
// import { apiGetRoom } from '../Thunks/Rooms';
// import { apiSearchUser } from '../Thunks/followers';

// // Replace this URL with your own socket-io host, or start the backend locally
// const socketEndpoint = 'https://geoispy.herokuapp.com/';
// export default function SocketComponent({ navigation }) {
//   const {
//     rooms,
//     setRooms,
//     singleRoom,
//     setSingleRoom,
//     authData,
//     setSingleUser,
//   } = React.useContext(GlobalDataContext);
//   useEffect(() => {
//     console.log('SOCKET');
//     socket.on('resetRooms', (data) => {
//       console.log(data);
//       setRooms(data);
//     });
//   }, [rooms]);
//   const setSingleRoomMessages = async (id) => {
//     const data = await apiGetRoom(id);
//     setSingleRoom(data);
//     navigation.navigate('SingleRoom');
//   };

//   const showPublicProfile = async (id) => {
//     const user = await apiSearchUser(id);
//     setSingleUser(user[0]);
//     navigation.navigate('PublicProfile');
//   };

//   return (
//     <View>
//       {dummyData.map((ele) => {
//         let otherUser;
//         if (authData.id === ele.users[0].id) {
//           otherUser = ele.users[1];
//         } else {
//           otherUser = ele.users[0];
//         }
//         return (
//           <View key={ele.id}>
//             <TouchableOpacity onPress={() => showPublicProfile(otherUser.id)}>
//               <Image
//                 source={{ uri: otherUser.img_url }}
//                 style={tw`h-16 w-16 pl-16`}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => setSingleRoomMessages(ele.id)}>
//               <View>
//                 <Text>{otherUser.username}</Text>
//                 <Text>Last Message Placeholder</Text>
//               </View>
//               <View>
//                 <Text>{timeSince(new Date(ele.updatedAt))}</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         );
//       })}
//     </View>
//   );
// }
