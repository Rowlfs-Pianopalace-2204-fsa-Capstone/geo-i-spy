/** @format */

import React, { useEffect, useState } from 'react';
import Toast from './client/components/Toast';
import Navigator from './client/Navigator';
import { apiGetAllChallenges } from './client/Thunks/Challenges';
import { GlobalDataContext } from './client/Context';
import SignUp from './client/components/SignUp';

export default function App() {
  const [followData, setFollowData] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [challengesData, setChallengesData] = useState([]);
  const [SingleChallengeData, setSingleChallengeData] = useState({});
  const [authData, setAuthData] = useState({});
  useEffect(() => {
    apiGetAllChallenges().then((data) => {
      setChallengesData(data);
    });
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
        }}
      >
        <Toast />
        <Navigator />
        {/* <SignUp /> */}
        {/* <PublicProfile /> */}
        {/* <FollowingList /> */}
      </GlobalDataContext.Provider>
    </>
  );
}
