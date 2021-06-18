import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PhraseList from "./component/PhraseList";
import CustomModal from "./component/Modal";
import axios from "axios";
function App() {
  // variables to keep track of phraseList
  const [phraseList, setPhrase] = useState([]);
  // variable to trigger useEffect on any write delete update
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    try {
      const getData = async () => {
        const result = await axios("http://localhost:7000/api/getPhrase");
        setPhrase(result.data.data);
      };

      getData();
    } catch (err) {
      alert(`Error in getting phrases ${JSON.stringify(err)}`);
    }
  }, [update]);

  return (
    <div className="App">
      <div>
        <CustomModal setUpdate={setUpdate} length={phraseList.length} />
        {phraseList.length ? (
          <PhraseList phraseList={phraseList} setUpdate={setUpdate} />
        ) : (
          <h2>No Phrase</h2>
        )}
      </div>
    </div>
  );
}

export default App;
