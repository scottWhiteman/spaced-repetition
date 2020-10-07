import config from '../config';
import TokenService from './token-service';

const LearningRouteService = {
    getHead() {
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
      },

      postAnswer(ans) {
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ guess: ans })
        })
        .then(res => {
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        })

      }
}

export default LearningRouteService;