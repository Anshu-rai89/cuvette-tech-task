export interface Phrase {
  id: number;
  phrase: string;
}
export type PhraseProps = {
  phraseList: Array<Phrase>;
  setUpdate: (a: boolean) => void;
};

export type FormProps = {
  setShow: (a: boolean) => void;
  setUpdate: (a: boolean) => void;
  length: number;
};
