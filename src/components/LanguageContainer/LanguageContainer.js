import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './LanguageContainer.css';

export default class LanguageContainer extends Component {
  renderWordList = () => {
    return this.props.words.map(this.generateWordItemHtml)
  }
  generateWordItemHtml = (word, i) => {
    return <li className='word-list-item' key={i}>
      <h4 className='item-info'>{word.original}</h4>
      <span className='item-info'>{word.correct_count}</span>
      <span className='item-info'>{word.incorrect_count}</span>
    </li>
  }
  
  render() {
    return (
      <section>
        <h2 className='language-name'>{this.props.language.name}</h2>
          <div className="word-list">
            <div className='word-list-item' style={{borderBottom: 3+'px solid #777'}}>
              <h3 className="table-category">Word</h3>
              <span className="table-category"># Correct</span>
              <span className="table-category"># Incorrect</span>
            </div>
            <ul>
              {this.renderWordList()}
            </ul>
          </div>
        <h4 className="total-score">Total Score: {this.props.language.total_score}</h4>
        <Link to='/learn'><button className='learn' onClick={this.toLearn}>Continue this language</button></Link>
      </section>
    );
  }
}