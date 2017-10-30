// import axios from "axios";

// export default {
//   // Gets all articles
//   getarticles: function() {
//     return axios.get("/api/articles");
//   },
//   // Gets the article with the given id
//   getarticle: function(id) {
//     return axios.get("/api/articles/" + id);
//   },
//   // Deletes the article with the given id
//   deletearticle: function(id) {
//     return axios.delete("/api/articles/" + id);
//   },
//   // Saves a article to the database
//   savearticle: function(articleData) {
//     return axios.post("/api/articles", articleData);
//   }
// };

// import axios from "axios";


// export default {
//   // Gets all articles
//   getArticles: function() {
//     return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", "27190efe58524369b384481d5de1eec2");
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


import axios from "axios";


export default {
  // Gets all books
  getArticles: function() {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", "27190efe58524369b384481d5de1eec2");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveArticle: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};