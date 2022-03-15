import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import KeyBoard from "../components/KeyBoard";
import { words } from "../components/WordList";

const Home: NextPage = () => {
  const [correct, setCorrect] = useState<string>("");
  const [currentRow, setCurrentRow] = useState(0);
  const [answer, setAnswer] = useState<string[]>([""]);
  const answerId = useRef<number>();

  useEffect(() => {
    answerId.current = Math.round(Math.random() * words.length);
    setCorrect(words[answerId.current]);
  }, []);
  const answerColor = useCallback(
    (row: number, col_idx: number, char: string) => {
      if(!correct) return;
      const isInclude = () => {
        return correct.includes(char);
      };
      const isCorrectPosition = () => {
        return correct.split("")[col_idx] === char;
      };
      if (row >= currentRow){
        return;
      }
      if (isCorrectPosition()) {
        return { backgroundColor: "#a3e635", color: "white" };
      } else if (isInclude()) {
        return { backgroundColor: "#facc15", color: "white" };
      } else {
        return { backgroundColor: "#94a3b8", color: "white" };
      }
    },
    [correct, currentRow]
  );

  return (
    <>
      <div
        style={{
          fontSize:20,
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >CAPDLE&nbsp;&nbsp;{answerId.current}</div>
      <div
        style={{
          fontSize:16,
          textAlign: 'center',
          marginBottom:10
        }}
      >－キャッパーWORDLE－</div>
      {[0, 1, 2, 3, 4, 5].map((rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: "flex",
            marginLeft: `calc(50vw - ${(correct.length * 44)/2}px)`
          }}
        >
          {correct.split("").map((key, colIdx) => (
            <div
              className="cell"
              key={colIdx}
              style={{
                color: 'black',
                ...answerColor(
                  rowIdx,
                  colIdx,
                  answer[rowIdx]?.[colIdx]
                )
              }}
            >
              {answer[rowIdx]?.[colIdx]}
            </div>
          ))}
        </div>
      ))}
      <KeyBoard
        setAnswer={setAnswer}
        answer={answer}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
      />
    </>
  );
};

export default Home;
