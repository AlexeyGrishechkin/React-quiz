// import React, { useEffect } from 'react';
// import classes from './Quiz.module.css';
// import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
// import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
// import Loader from '../../components/UI/Loader/Loader';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

// const Quiz = (props) => {
//   const results = useSelector((state) => state.quiz.results);
//   const isFinished = useSelector((state) => state.quiz.isFinished);
//   const activeQuestion = useSelector((state) => state.quiz.activeQuestion);
//   const answerState = useSelector((state) => state.quiz.answerState);
//   const quiz = useSelector((state) => state.quiz.quiz);
//   const loading = useSelector((state) => state.quiz.loading);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchQuizById(props.match.params.id));
//     return ()=>dispatch(retryQuiz());
//   }, [dispatch]);

//   return (
//     <div className={classes.Quiz}>
//       <div className={classes.QuizWrapper}>
//         <h1>Ответьте на все вопросы</h1>
//         {loading || !quiz ? (
//           <Loader />
//         ) : isFinished ? (
//           <FinishedQuiz results={results} quiz={quiz} onRetry={retryQuiz} />
//         ) : (
//           <ActiveQuiz
//             answers={quiz[activeQuestion].answers}
//             question={quiz[activeQuestion].question}
//             onAnswerClick={quizAnswerClick}
//             quizLength={quiz.length}
//             answerNumber={activeQuestion + 1}
//             state={answerState}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;

import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';


class Quiz extends Component {
 componentDidMount() {
  this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount(){
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
            {
              this.props.loading || !this.props.quiz
              ? <Loader/>
              :  this.props.isFinished ? (
                <FinishedQuiz
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRetry={this.props.retryQuiz}
                />
              ) : (
                <ActiveQuiz
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  onAnswerClick={this.props.quizAnswerClick}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  state={this.props.answerState}
                />
              )
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

const mapDistpatchToProps = (dispatch) => {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDistpatchToProps)(Quiz);
