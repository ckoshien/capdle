import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import KeyBoard from "../components/KeyBoard";
import { words } from "../components/WordList";
import { TwitterShareButton } from "react-share";

const Home: NextPage = () => {
  const GREEN = "#a3e635";
  const WHITE = "white";
  const YELLOW = "#facc15";
  const GLAY = "#94a3b8";
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
      if (!correct) return;
      const isInclude = () => {
        return correct.includes(char);
      };
      const isCorrectPosition = () => {
        return correct.split("")[col_idx] === char;
      };
      if (row >= currentRow) {
        return;
      }
      if (isCorrectPosition()) {
        return { backgroundColor: GREEN, color: WHITE };
      } else if (isInclude()) {
        return { backgroundColor: YELLOW, color: WHITE };
      } else {
        return { backgroundColor: GLAY, color: WHITE };
      }
    },
    [correct, currentRow]
  );

  const shareContent = useCallback(() => {
    let str: string = "";
    str = str + `CAPDLE ${answerId.current}/${words.length}`;
    for (let i = 0; i < currentRow; i++) {
      str = str + "\n";
      for (let j = 0; j < correct.length; j++) {
        switch (answerColor(i, j, answer[i]?.[j])?.backgroundColor) {
          case GREEN:
            str = str + "🟩";
            break;
          case YELLOW:
            str = str + "🟨";
            break;
          case GLAY:
            str = str + "⬛";
            break;
          default:
            break;
        }
      }
    }
    str = str + "\n";
    return str;
  }, [currentRow, answer, answerColor, correct]);

  return (
    <>
      <div
        style={{
          fontSize: 20,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        CAPDLE&nbsp;&nbsp;{answerId.current}/{words.length}
      </div>
      <div
        style={{
          fontSize: 16,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        －キャッパーWORDLE－
      </div>
      <div
        style={{
          height: 46*6,
          overflowY: 'scroll'
        }}
      >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: "flex",
            marginLeft: `calc(50vw - ${(correct.length * 44) / 2}px)`,
          }}
        >
          {correct.split("").map((key, colIdx) => (
            <div
              className="cell"
              key={colIdx}
              style={{
                color: "black",
                ...answerColor(rowIdx, colIdx, answer[rowIdx]?.[colIdx]),
              }}
            >
              {answer[rowIdx]?.[colIdx]}
            </div>
          ))}
        </div>
      ))}
      </div>
      <TwitterShareButton
        url={`https://capdle.netlify.app/`}
        title={shareContent()}
        hashtags={["キャッパーWORDLE"]}
      >
        結果をシェア
      </TwitterShareButton>
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
