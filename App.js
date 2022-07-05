/** @format */

import React, { useEffect, useState } from "react";
import Toast from "./client/components/Toast";
import Navigator from "./client/Navigator";
import { apiGetAllChallenges } from "./client/Thunks/Challenges";
export const GlobalDataContext = React.createContext();

export default function App() {
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
        }}
      >
        <Toast />
        <Navigator />
      </GlobalDataContext.Provider>
    </>
  );
}
