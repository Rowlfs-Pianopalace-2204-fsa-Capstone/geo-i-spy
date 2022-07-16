/** @format */

import React, { useEffect, useState } from 'react';
import Toast from './client/components/Toast';
import Navigator from './client/Navigator';
import { apiGetAllChallenges } from './client/Thunks/Challenges';
import { GlobalDataContext } from './client/Context';
import { GlobalIsSignedContext } from './client/Context';
import PublicProfile from './client/components/PublicProfile';
import FollowingList from './client/components/FollowingList';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  apiGetAllFollowers,
  apiGetAllFollowing,
} from './client/Thunks/followers';
import { apiGetAllAchievements } from './client/Thunks/cloud';
import { apiAuthGetMe } from './client/Thunks/Auth';
import io from 'socket.io-client';
import socket, { createSocket, removeSocket } from './client/Thunks/Socket';
import { apiGetAllRooms } from './client/Thunks/Rooms';

export default function App() {
  const [followingData, setFollowingData] = useState([]);
  const [followData, setFollowData] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [challengesData, setChallengesData] = useState([]);
  const [SingleChallengeData, setSingleChallengeData] = useState({});
  const [authData, setAuthData] = useState({});
  const [isSigned, setIsSigned] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [feed, setFeed] = useState([]);
  const [img, setImg] = useState('');
  const [search, setSearch] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [singleRoom, setSingleRoom] = useState([]);

  useEffect(function didMount() {
    //
    return function didUnmount() {
      removeSocket();
    };
  }, []);

  const checkLogin = async () => {
    let token = await apiAuthGetMe();
    if (token) {
      setAuthData(token);
      apiGetAllAchievements().then((data) => {
        setAchievements(data);
      });
      apiGetAllFollowing(token.id).then((result) => {
        setFollowingData(result);
      });
      apiGetAllFollowers(token.id).then((result) => {
        setFollowData(result);
      });
      apiGetAllRooms(token.id).then((result) => {
        setRooms(result);
      });
      return token;
    } else {
      setIsSigned(false);
      return;
    }
  };

  useEffect(() => {
    const token = checkLogin();
    if (token) {
      setIsSigned(true);
    }
  }, []);

  return (
    <>
      <GlobalDataContext.Provider
        value={{
          challengesData,
          setChallengesData,
          SingleChallengeData,
          setSingleChallengeData,
          authData,
          setAuthData,
          followData,
          setFollowData,
          singleUser,
          setSingleUser,
          followingData,
          setFollowingData,
          achievements,
          setAchievements,
          feed,
          setFeed,
          img,
          setImg,
          search,
          setSearch,
          rooms,
          setRooms,
          singleRoom,
          setSingleRoom,
        }}
      >
        <GlobalIsSignedContext.Provider
          value={{
            isSigned,
            setIsSigned,
          }}
        >
          <Toast />
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </GlobalIsSignedContext.Provider>
      </GlobalDataContext.Provider>
    </>
  );
}
