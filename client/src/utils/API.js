import axios from "axios";

// var APIKey = '27190efe58524369b384481d5de1eec2';

const APIKEY = "27190efe58524369b384481d5de1eec2";

// Helper functions
const API = {

  getArticles: function(searchTerm, startYear, endYear){
    const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var params = "?api-key=" + APIKEY;
    params+="&q="+ searchTerm;
    if(parseInt(startYear))
      params+="&begin_date="+startYear+"0101";
    if(parseInt(endYear))
      params+="&end_date="+endYear+"1231";

    return axios.get(BASEURL+params);
  },
  saveArticle: function(article) {
    var newArticle = {
      title: article.headline.main,
      section: article.section_name,
      date: article.pub_date,
      url: article.web_url
    };
    newArticle.by = article.byline ? article.byline.original : "No Author";
    
    return axios.post("/api/saved", newArticle);
  },
  getSavedArticles: function() {
    return axios.get("/api/saved");
  },

  removeArticle: function(id){
    return axios.delete("/api/saved", {params: {id: id}});
  },
  
};

export default API;


// export default {

//   getArticles: function() {
//     return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=27190efe58524369b384481d5de1eec2");
//   },
//   // Gets the article with the given id
//   getArticle: function(id) {
//     return axios.get("/api/articles/" + id);
//   },
//   // Deletes the article with the given id
//   deleteArticle: function(id) {
//     return axios.delete("/api/articles/" + id);
//   },
//   // Saves a article to the database
//   saveArticle: function(articleData) {
//     return axios.post("/api/articles", articleData);
//   }
// };


  



