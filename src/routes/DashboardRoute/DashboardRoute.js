import React, { Component } from 'react';
import config from '../../config';
import LanguageContext from '../../contexts/LanguageContext';
import TokenService from '../../services/token-service';
import LanguageContainer from '../../components/LanguageContainer/LanguageContainer';

class DashboardRoute extends Component {
  static contextType = LanguageContext;
  getLanguages = () => {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json();
      })
  }
  renderLanguages = () => {
    const {language = {}, words = []} = this.context;
    console.log(language);
    console.log(words);
    return <LanguageContainer language={language} words={words}/>
  }
  
  componentDidMount() {
    this.context.clearError();
    this.getLanguages()
      .then(this.context.setLanguage)
      .catch(this.context.setError);
  }

  render() {
    return (
      <section>
        <h2>Languages</h2>
        {this.context.language && this.renderLanguages()}
      </section>
    );
  }
}

export default DashboardRoute
