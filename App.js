/** @format */

import React, { useEffect, useState } from 'react';
import Toast from './client/components/Toast';
import Navigator from './client/Navigator';
import { apiGetAllChallenges } from './client/Thunks/Challenges';
import { GlobalDataContext } from './client/Context';
import { GlobalIsSignedContext } from './client/Context';
import PublicProfile from './client/components/PublicProfile';
import FollowingList from './client/components/FollowingList';

import SignUp from './client/components/SignUp';

import {
  apiGetAllFollowers,
  apiGetAllFollowing,
} from './client/Thunks/followers';
import { apiGetAllAchievements } from './client/Thunks/cloud';
import { apiAuthGetMe } from './client/Thunks/Auth';

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

  const checkLogin = async () => {
    let token = await apiAuthGetMe();
    if (token) {
      setAuthData(token);
      apiGetAllAchievements().then((data) => {
        setAchievements(data);
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
        }}
      >
        <GlobalIsSignedContext.Provider
          value={{
            isSigned,
            setIsSigned,
          }}
        >
          <Toast />
          <Navigator />
          {/* <SignUp /> */}
          {/* <PublicProfile /> */}
          {/* <FollowingList /> */}
        </GlobalIsSignedContext.Provider>
      </GlobalDataContext.Provider>
    </>
  );
}
