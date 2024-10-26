import React from 'react';
import './App.css';
import {TitleBar} from "./components/layout/title-bar/TitleBar";
import {Tracker} from "./components/tracker/Tracker";
import {useTrackerHelper} from "./components/tracker/trackerHelper";

function App() {
  const trackerHelper = useTrackerHelper((x) => console.log(x));

  return (<>
    <TitleBar/>
    <Tracker {...trackerHelper}/>
  </>);
}

export default App;
