import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import Key from "./Key";

const KeyBoard: React.FC<{
  setAnswer: Dispatch<SetStateAction<string[]>>;
  answer: string[];
  currentRow: number;
  setCurrentRow: Dispatch<SetStateAction<number>>;
}> = ({ setAnswer, answer, currentRow, setCurrentRow }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundColor: "#e5e7eb",
            width: 78,
            margin: 4,
            padding: 4,
            textAlign: "center",
          }}
          onClick={() => {
            if (answer[currentRow]?.length === 0) {
              alert("未入力です");
              return;
            }
            setCurrentRow(currentRow + 1);
          }}
        >
          Enter
        </div>
        <div
          style={{
            backgroundColor: "#e5e7eb",
            width: 78,
            margin: 4,
            padding: 4,
            textAlign: "center",
          }}
          onClick={() => {
            let tmpAnswer = [...answer];
            if (!tmpAnswer[currentRow]) {
              tmpAnswer[currentRow] = "";
            }
            tmpAnswer[currentRow] = tmpAnswer[currentRow].slice(
              0,
              tmpAnswer[currentRow].length - 1
            );
            setAnswer(tmpAnswer);
          }}
        >
          Delete
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginLeft: `calc(50vw - ${(36*10)/2}px)`
        }}
      >
        {[
          "アイウエオ",
          "カキクケコ",
          "サシスセソ",
          "タチツテト",
          "ナニヌネノ",
          "ハヒフヘホ",
          "マミムメモ",
          "ヤユヨ",
          "ラリルレロ",
          "ワヲン",
        ]
          .reverse()
          .map((row) => (
            <div key={row}>
              {row.split("").map((char) => (
                <Key
                  char={char}
                  key={char}
                  setAnswer={setAnswer}
                  answer={answer}
                  currentRow={currentRow}
                />
              ))}
            </div>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          marginTop:8,
          marginLeft: `calc(50vw - ${(36*8)/2}px)`
        }}
      >
        {[
        "ァィゥェォ",
        "ガギグゲゴ",
        "ザジズゼゾ",
        "ダヂヅデド",
        "ッ",
        "パピプペポ",
        "バビブベボ",
        "ャュョ",
        "ーヴ",
      ]
          .reverse()
          .map((row) => (
            <div key={row}>
              {row.split("").map((char) => (
                <Key
                  char={char}
                  key={char}
                  setAnswer={setAnswer}
                  answer={answer}
                  currentRow={currentRow}
                />
              ))}
            </div>
          ))}
      </div>
      
    </>
  );
};
export default KeyBoard;