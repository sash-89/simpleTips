import React from 'react';
import style from "./Questions.module.css";
import {Button} from "../../../components/Button/Button";

const QuestionsDT = ({questionsAndAnswers, handleClick, active}) => {

    return (
        <div className={style.questionsContainer}>
            <div className={style.questionsWrapper}>
                {questionsAndAnswers.map((item, i) => (
                    <div key={item + i} >
                        <Button style={{marginBottom: "8px"}} className={active !== i ? style.whiteBtn : style.activeBtn}
                                onClick={() => handleClick(i)}>
                            {item.question}
                        </Button>
                    </div>

                ))}
            </div>


            {questionsAndAnswers[active] && <div className={style.activeAnswerWrapper}>
                <h5 className={style.header}>
                    {questionsAndAnswers[active].question}
                </h5>
                {questionsAndAnswers[active].answers.map((answer, i) =>
                    <div key={i} className={style.activeAnswer}>
                        <div className={style.answer}>
                            {answer}
                        </div>
                    </div>)}
            </div>}
        </div>
    )

};

export default QuestionsDT;