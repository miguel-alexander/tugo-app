import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import RootNavigator from "./src/navigation/RootNavigator";
// import 'react-native-gesture-handler';
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Store, { Persistor } from "./src/redux/Store";

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(["Warning: ..."]);
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;


