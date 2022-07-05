/** @format */

import React from "react";
import Toast from "./client/components/Toast";
import Navigator from "./client/Navigator";
export const GlobalDataContext = React.createContext();

export default function App() {
  const [challengesData, setChallengesData] = useState([]);
  const [SingleChallengeData, setSingleChallengeData] = useState({});
  const [authData, setAuthData] = useState({});
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
