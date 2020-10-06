import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './LanguageContainer.css';

export default class LanguageContainer extends Component {
  renderWordList = () => {
    return this.props.words.map(this.generateWordItemHtml)
  }
  generateWordItemHtml = (word, i) => {
    return <li className='word-list-item' key={i}>
      <span className='word-span'>{word.original}</span>
      <span className='correct-span'>{word.correct_count}</span>
      <span className='incorrect-span'>{word.incorrect_count}</span>
    </li>
  }
  
  render() {
    return (
      <section>
        <h3 className='language-name'>{this.props.language.name}</h3>
        <ul className='word-list'>
          <li className='word-list-item' style={{borderBottom: 3+'px solid #777'}}>
            <span><strong>Word</strong></span>
            <span><strong># Correct</strong></span>
            <span><strong># Incorrect</strong></span>
          </li>
          {this.renderWordList()}
        </ul>
        <h4>Total Score: {this.props.language.total_score}</h4>
        <Link to='/learn'><button className='learn' onClick={this.toLearn}>Continue this language</button></Link>
      </section>
    );
  }
}