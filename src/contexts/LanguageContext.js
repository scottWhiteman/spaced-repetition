import React, { Component } from 'react'
//import AuthApiService from '../services/auth-api-service'

const LanguageContext = React.createContext({
  language: {},
  words: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setLanguage: () => {}
})

export default LanguageContext

export class LanguageProvider extends Component {
  state = {
    language: {},
    words: [],
    error: null
  }

  setError = error => {
    console.log(error);
    this.setState(error);
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setLanguage = language => {
    this.setState({ language: language.language, words: language.words })
  }

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setLanguage: this.setLanguage,
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}