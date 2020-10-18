import React from 'react';
import upArrow from '../../../assets/images/VectorDown.png'
import downArrow from '../../../assets/images/VectorUp.png'
import style from "./QuestuinsMB.module.css"

const QuestionsMB = ({ questionsAndAnswers, active, onClick }) => {
    return (
            <div className={style.accordionContainer}>
                {questionsAndAnswers.map((item, i) => (
                    <div key={i}>
                        <div className={i === active ? style.activeTab : style.tab}
                             onClick={() => onClick(i === active ? null : i)}
                        >
                            {item.question}

                            <img src={active === i ? upArrow : downArrow} alt={"Arrow"} className={style.arrow}/>
                    </div>

                        {questionsAndAnswers[active] &&
                        <div className={i === active ? style.activeAnswersWrapper : style.hiddenAnswersWrapper}>
                            {questionsAndAnswers[active].answers.map((answer, i) =>
                                <div key={i} className={style.activeAnswers}>
                                    {answer}
                                </div>
                            )}
                        </div>
                        }
                </div>
                ))}
            </div>
    );
};

export default QuestionsMB
