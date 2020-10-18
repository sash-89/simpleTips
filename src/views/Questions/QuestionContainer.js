import React, {Component} from "react";
import QuestionsMB from "./QuestuinsMobile/QuestionsMB";
import {getPopularQuestions} from "../../modules/questions/questionAction";
import {connect} from "react-redux";
import QuestionsDT from "./QuestionsDesktop/QuestionsDT";
import {questionsAndAnswersSelector} from "../../modules/questions/questionsSelectors";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";


class QuestionContainer extends Component {
    state = {
        active: this.props.windowSizeMobile ? null : 0,
    };


    handleClick = (i) => {
        this.setState({active: i})
    };

    componentDidMount() {
        this.props.getPopularQuestions();
    }

    render() {
        return (
            <>
                <div className={'Mobile'}>
                    <QuestionsMB questionsAndAnswers={this.props.questionsAndAnswers} onClick={this.handleClick}
                                 active={this.state.active}/>
                </div>

                <div className={'Desktop'}>
                    <QuestionsDT questionsAndAnswers={this.props.questionsAndAnswers} handleClick={this.handleClick}
                                 active={this.state.active}/>
                </div>
            </>
        )

    }
}

const mapStateToProps = state => ({
    questionsAndAnswers: questionsAndAnswersSelector(state),
    windowSizeMobile: windowSizeSelector(state)
});

export default connect(mapStateToProps, {getPopularQuestions})(QuestionContainer);
