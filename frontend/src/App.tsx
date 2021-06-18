import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PhraseList from "./component/PhraseList";
import CustomModal from "./component/Modal";
import axios from "axios";
function App() {
  const [phraseList, setPhrase] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const result = await axios("http://localhost:7000/api/getPhrase");
      console.log("data is ", result.data.data);
      setPhrase(result.data.data);
    };

    getData();
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
