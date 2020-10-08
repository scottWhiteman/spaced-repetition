import React, { Component } from 'react'
import LearningRouteService from '../../services/LearningRoute-service'
import './LearningRoute.css';

class LearningRoute extends Component {
  state = {
    currentWord: '',
    currentTranslation: null,
    correctScore: 0,
    incorrectScore: 0,
    totalScore: 0,
    correct: null
  }

  componentDidMount = () => {
    LearningRouteService.getHead()
    .then(resJson => {
      this.setState({
        currentWord: resJson.nextWord,
        correctScore: resJson.wordCorrectCount,
        incorrectScore: resJson.wordIncorrectCount,
        totalScore: resJson.totalScore
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const answer = e.target['learn-guess-input'];
    LearningRouteService.postAnswer(answer.value)
    .then(resJson => {
      this.setState({
        currentWord: resJson.nextWord,
        correctScore: resJson.wordCorrectCount,
        incorrectScore: resJson.wordIncorrectCount,
        totalScore: resJson.totalScore,
        currentTranslation: resJson.answer,
        correct: resJson.isCorrect
      })
    })
    answer.value = '';
  }

  handleNextButton = () => {
    this.setState({
      correct: null,
      currentTranslation: null
    })
  }

  renderContent = () => {
    if(this.state.correct !== null){
      return (
        <section className="next-page">
          {this.state.correct === true && <h2>Correct!</h2>}
          {this.state.correct === false && <h2>{`Sorry, the correct answer is ${this.state.currentTranslation}`}</h2>}
          <button type="button" className="learn-button" onClick={this.handleNextButton}>Next Word</button>
        </section>
      )
    } else {
      return (
        <>
        <h2>Translate the word:</h2>
        <h3 className='original-word'>{this.state.currentWord}</h3>
        <form className='learn-guess-form' onSubmit={this.handleSubmit}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input id='learn-guess-input' type='text' required/>
          <button type='submit' className="learn-button">Submit your answer</button>
        </form>
        </>
      )
    }
    }
  
  render() {
    return (
      <section>
        {this.renderContent()}
        <p className="display-score">Your total score is: {this.state.totalScore}</p>
        <p>You have answered this word correctly {this.state.correctScore} times.</p>
        <p>You have answered this word incorrectly {this.state.incorrectScore} times.</p>
      </section>
    );
  }
}

export default LearningRoute
