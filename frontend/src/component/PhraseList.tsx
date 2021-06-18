import React, { FunctionComponent } from "react";
import PhraseComponent from "./Phrase";
import { Phrase, PhraseProps } from "../types";

const PhraseList: FunctionComponent<PhraseProps> = ({
  phraseList,
  setUpdate,
}) => {
  return (
    <div className="phrase-list">
      {phraseList.map((phrase: any, index: number) => (
        <PhraseComponent phrase={phrase} key={index} setUpdate={setUpdate} />
      ))}
    </div>
  );
};

export default PhraseList;
