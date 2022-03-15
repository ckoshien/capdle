import { Dispatch, MutableRefObject, SetStateAction } from "react";

const Key: React.FC<{
  char: string;
  setAnswer: Dispatch<SetStateAction<string[]>>;
  answer: string[],
  currentRow:number;
}> = ({ char, answer, setAnswer, currentRow }) => {
  return <div className="key"
    onClick={()=>{
        let tmpAnswer = [...answer];
        if(!tmpAnswer[currentRow]){
          tmpAnswer[currentRow] = ''  
        }
        tmpAnswer[currentRow] = tmpAnswer[currentRow].concat(char);
        setAnswer(tmpAnswer);
    }}
  >{char}</div>;
};
export default Key;
