// Include React as a dependency
// import React, { Component } from 'react'
// // Including the Link component from React Router to navigate within our application without full page reloads
// // https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
// import { Link } from "react-router";

// // Create the Main component
// class Main extends Component {

//   render() {

//     return (
//       // We can only render a single div. So we need to group everything inside of this main-container one
//       <div className="main-container">
//         <div className="container">
//           {/* Navbar */}
//           <nav className="navbar navbar-default">
//             <div className="container-fluid">
//               <div className="navbar-header">
//                 <button
//                   type="button"
//                   className="navbar-toggle"
//                   data-toggle="collapse"
//                   data-target=".navbar-ex1-collapse"
//                 >
//                   <span className="sr-only">Toggle navigation</span>
//                   <span className="icon-bar"></span>
//                   <span className="icon-bar"></span>
//                   <span className="icon-bar"></span>
//                 </button>
//                 <Link className="navbar-brand" to="/">NYT-React</Link>
//               </div>

//               <div className="collapse navbar-collapse navbar-ex1-collapse">
//                 <ul className="nav navbar-nav navbar-right">
//                   {/* Using <Link> in place of <a> and "to" in place of "href" */}
//                   <li><Link to="/search">Search</Link></li>
//                   <li><Link to="/saved">Saved Articles</Link></li>
//                 </ul>
//               </div>
//             </div>
//           </nav>

//           {/* Jumbotron */}
//           <div className="jumbotron">
//             <h2 className="text-center"><strong>(ReactJS) New York Times Article Scrubber</strong></h2>
//             <h3 className="text-center">Search for and save articles of interest.</h3>
//           </div>


//           {/* Here we will deploy the sub components (Search or Saved */}
//           {/* These sub-components are getting passed as this.props.children */}
//           {this.props.children}

//           <footer>
//             <hr />
//             <p className="pull-right">
//               <i className="fa fa-github" aria-hidden="true"></i>
//               Proudly built using React.js
//             </p>
//           </footer>
//         </div>
//       </div>
//     );
//   }
// };

// // Export the module back to the route
// export default Main;

import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/API";

class Main extends Component {

  state = {
    term: "",
    start: "",
    end: "",
    articles: [],
    saved: []
  };

  // When the component mounts, get a list of all saved articles and update this.state.saved
  componentDidMount() {
    this.getSavedArticles()
  }

  // Method for getting saved articles (all articles) from the db
  getSavedArticles = () => {
    API.getSaved()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  // A helper method for rendering one search results div for each article
  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // A helper method for rendering one div for each saved article
  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // Keep track of what user types into term input so that input can be grabbed later
  handleTopicChange = (event) => {
    this.setState({ term: event.target.value });
  }

  // Keep track of what user types into term input so that input can be grabbed later
  handleStartYearChange = (event) => {
    this.setState({ start: event.target.value });
  }

  // Keep track of what user types into term input so that input can be grabbed later
  handleEndYearChange = (event) => {
    this.setState({ end: event.target.value });
  }

  // When the search form submits, perform NYT api search with user input
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Getting NYT Articles");
    console.log("this.state.term: ", this.state.term);
    console.log("this.state.start: ", this.state.start);
    console.log("this.state.end: ", this.state.end);
    API.runQuery(this.state.term, this.state.start, this.state.end)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        console.log("this.state.articles: ", this.state.articles);
      });
  }

  // When save article button is clicked, add article to db
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }

  // When delete article button is clicked, remove article from db
  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {
    return (

      <div className="main-container">
        <div className="container">
          {/* Jumbotron */}
          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Search</strong></h1>
            <h2 className="text-center">Search for and save articles of interest.</h2>
          </div>
          {/* Search Form and Results Section */}
          <Search
            handletermChange={this.handleTopicChange}
            handleStartYearChange={this.handlestartChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />
          {/* Saved Articles Section */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      <strong>
                        <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      {this.renderSaved()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <hr />
            <p className="pull-right">
              <i className="fa fa-github" aria-hidden="true"></i>
              Proudly built using React.js
            </p>
          </footer>
        </div>
      </div>

    );
  }

}

export default Main;
