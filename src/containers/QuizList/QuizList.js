import React, { useEffect } from 'react';
import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';
import Loader from '../../components/UI/Loader/Loader';

const QuizList = () => {
  const quizes = useSelector((state) => state.quiz.quizes);
  const loading = useSelector((state) => state.quiz.loading);

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchQuizes()), [dispatch]);

  const renderQuizes = () => {
    return quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>

        {loading && quizes.length !== 0 ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};

export default QuizList;
