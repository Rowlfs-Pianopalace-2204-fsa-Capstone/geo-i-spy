/** @format */

import React, { useEffect, useState } from "react";
import Toast from "./client/components/Toast";
import Navigator from "./client/Navigator";
import { apiGetAllChallenges } from "./client/Thunks/Challenges";
import { GlobalDataContext } from "./client/Context";
import { GlobalIsSignedContext } from "./client/Context";
import PublicProfile from "./client/components/PublicProfile";
import FollowingList from "./client/components/FollowingList";
export default function App() {
  const [followData, setFollowData] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [challengesData, setChallengesData] = useState([]);
  const [SingleChallengeData, setSingleChallengeData] = useState({});
  const [authData, setAuthData] = useState({});
  const [isSigned, setIsSigned] = useState(false);
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
