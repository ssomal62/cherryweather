import './App.css';
import Router from "./router/Router";
import {useEffect} from "react";


function App() {

    useEffect(() => {
        sessionStorage.removeItem('searchResult');
        sessionStorage.removeItem('searchTriggered');
    }, []);

  return (
      <>
          <Router />
      </>
  );
}

export default App;
