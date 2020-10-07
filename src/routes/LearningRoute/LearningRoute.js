import config from '../../config';
import React, { Component } from 'react'
import TokenService from '../../services/token-service';
import './LearningRoute.css';

class LearningRoute extends Component {
  state = {
    currentWord: '',
    correctScore: 0,
    incorrectScore: 0,
    totalScore: 0
  }
  getHead = () => {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      })
      .then(resJson => {
        console.log(resJson);
        this.setState({
          currentWord: resJson.nextWord,
          correctScore: resJson.wordCorrectCount,
          incorrectScore: resJson.wordIncorrectCount,
          totalScore: resJson.totalScore
        })
      })
  }

  componentDidMount = () => {
    this.getHead();
  }
  
  render() {
    console.log(this.state)
    return (
      <section>
        <h2>Translate the word:</h2>
        <span><h3 className='original-word'>{this.state.currentWord}</h3></span>
        
        <form className='learn-guess-form'>
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
