import React, { Component } from 'react'
import LearningRouteService from '../../services/LearningRoute-service'
import './LearningRoute.css';

class LearningRoute extends Component {
  state = {
    currentWord: '',
    correctScore: 0,
    incorrectScore: 0,
    totalScore: 0
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
    const answer = e.target['learn-guess-input'].value;
    LearningRouteService.postAnswer(answer)
    .then(resJson => {
      this.setState({
        currentWord: resJson.nextWord,
        correctScore: resJson.wordCorrectCount,
        incorrectScore: resJson.wordIncorrectCount,
        totalScore: resJson.totalScore
      })
    })
  }
  
  render() {
    return (
      <section>
        <h2>Translate the word:</h2>
        <span><h3 className='original-word'>{this.state.currentWord}</h3></span>
        
        <form className='learn-guess-form' onSubmit={this.handleSubmit}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input id='learn-guess-input' type='text' required/>
          <button type='submit'>Submit your answer</button>
        </form>
        <p>Your total score is: {this.state.totalScore}</p>
        <p>You have answered this word correctly {this.state.correctScore} times.</p>
        <p>You have answered this word incorrectly {this.state.incorrectScore} times.</p>
      </section>
    );
  }
}

export default LearningRoute
