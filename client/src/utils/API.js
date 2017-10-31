import axios from "axios";

const API =  {
runQuery: function(term, start, end) {
  
      // Adjust to get search terms in proper format
      var formattedTerm = term.trim();
      var formattedStart = start.trim() + '0101';
      var formattedEnd = end.trim() + '1231';
  
  
      console.log('Query Run');
      // Run a query using Axios. Then return the results as an object with an array.
      // See the Axios documentation for details on how we structured this with the params.
      return axios.get('https://api.nytimes.com/svc/search/v2/Articlesearch.json?api-key=9b3adf57854f4a19b7b5782cdd6e427a%27', {
        params: {
          
          'q': formattedTerm,
          'begin_date': formattedStart,
          'end_date': formattedEnd
        }
      })
      .then(function(results) {
        console.log('Axios Results', results.data.res);
        return results.data.res;
      });
    },
    getSaved: function() {
      return axios.get('/api/saved')
        .then(function(results) {
          console.log('axios results', results);
          return results;
        });
    },
    // This will save new articles to our database
    postSaved: function(title, date, url) {
      var newArticle = { title: title, date: date, url: url };
      console.log("postSaved", title)
      return axios.post('/api/saved', newArticle)
        .then(function(res) {
          console.log('axios results', res.data._id);
          return res.data._id;
        });
    }

    
  }
      export default API;