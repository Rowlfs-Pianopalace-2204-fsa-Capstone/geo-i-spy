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

export default function App() {
  const [followingData, setFollowingData] = useState([]);
  const [followData, setFollowData] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [challengesData, setChallengesData] = useState([]);
  const [SingleChallengeData, setSingleChallengeData] = useState({});
  const [authData, setAuthData] = useState({});
  const [isSigned, setIsSigned] = useState(false);

  // async function fetchDataFollowers(id) {
  //   const Following = await apiGetAllFollowing(parseInt(id));
  //   setFollowingData(Following);
  //   const Followers = await apiGetAllFollowers(parseInt(id));
  //   setFollowData(Followers);
  // }

  useEffect(() => {
    apiGetAllChallenges().then((data) => {
      setChallengesData(data);
    });
  }, []);

  // useEffect(() => {
  //   if (authData.id) {
  //     fetchDataFollowers(authData.id);
  //   }
  // }, [authData]);
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
          {/* <PublicProfile /> */}
          {/* <FollowingList /> */}
        </GlobalIsSignedContext.Provider>
      </GlobalDataContext.Provider>
    </>
  );
}
