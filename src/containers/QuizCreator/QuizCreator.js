import React, { useState } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {  useSelector, useDispatch } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';

const QuizCreator = () => {


  const createFormControls = () => {
    return {
      question: createControl(
        {
          label: 'Введите вопрос',
          errorMessage: 'Вопрос не может быть пустым',
        },
        { required: true }
      ),
      option1: createControl(
        {
          label: `Вариант 1`,
          errorMessage: 'Значение не может быть пустым',
          id: 1,
        },
        { required: true }
      ),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4: createOptionControl(4),
    };
  };
  const createOptionControl = (number) => {
    return createControl(
      {
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number,
      },
      { required: true }
    );
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [formControls, setFormControls] = useState(createFormControls())

  const quiz = useSelector(state=>state.create.quiz)

  const dispatch = useDispatch()


  
  const submitHandler = (event) => {
    event.preventDefault();
  };

  const addQuestionHandler = (event) => {
    event.preventDefault();

    const { question, option1, option2, option3, option4 } = formControls;

    const questionItem = {
      question: question.value,
      id: quiz.length + 1,
      rightAnswerId: rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    dispatch(createQuizQuestion(questionItem));

    setIsFormValid(false)
    setRightAnswerId(1)
    setFormControls(createFormControls())

  };

  const createQuizHandler = (event) => {
    event.preventDefault();
    
    setIsFormValid(false)
    setRightAnswerId(1)
    setFormControls(createFormControls())
    
    dispatch(finishCreateQuiz());
  };

  const changeHandler = (value, controlName) => {
    const formControl = { ...formControls };
    const control = { ...formControl[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControl[controlName] = control;

    setFormControls(formControl)
    setIsFormValid(validateForm(formControl))

  };

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) => changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  };

  const selectChangeHandler = (event) => {
    setRightAnswerId(+event.target.value)
  };

  const select = (
    <Select
      label='Выберите правильный ответ'
      value={rightAnswerId}
      onChange={selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />
  );

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>
          {renderControls()}

          {select}

          <Button
            type='primary'
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>

          <Button
            type='success'
            onClick={createQuizHandler}
            disabled={quiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  );
};



export default QuizCreator;

