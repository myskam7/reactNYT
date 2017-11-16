      // Include the Axios library for HTTP requests
import axios from "axios";


const API = {
  // Query NYT API
  runQuery: function(term, start, end) {
    const APIKey = "27190efe58524369b384481d5de1eec2";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    APIKey + "&q=" + term + "&begin_date=" + start + "0101&end_date=" + end + "0101";
    return axios.get(queryURL)
    .then(function(results) {
            console.log("Axios Results", results.data.response);
            return results.data.response;
          });
  },
  // This will return any saved articles from our database
  getSaved: function() {
    return axios.get("/api/saved")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // This will save new articles to our database
  postSaved: function(title, date, url) {
    var newArticle = { title: title, date: date, url: url };
    console.log('postSaved', title)
    return axios.post("/api/saved", newArticle)
      .then(function(response) {
        console.log("axios results", response.data._id);
        return response.data._id;
      });
  },
  // This will remove saved articles from our database
  deleteSaved: function(title, data, url) {
    return axios.delete("/api/saved", {
      params: {
        "title": title,
        "data": data,
        "url": url
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  }
};


// We export the API function
export default API;