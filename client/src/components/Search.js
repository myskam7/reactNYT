// Include React as a dependency
import React, { Component } from 'react'

// Include the Query and Results components
import Query from "./Search/Query";
import Results from "./Results";

// Include the API for making API calls
import API from "../utils/API";

// Create the Search component
class Search extends Component {
  // Here we set the initial state variables
  // (this allows us to propagate the variables for maniuplation by the children components
  // Also note the "resuls" state. This will be where we hold the data from our results
  state = { 
    results: []
  }

  // This function will be passed down into child components so they can change the "parent"
  // i.e we will pass this method to the query component that way it can change the main component
  // to perform a new search
  setQuery = (newQuery, newStart, newEnd) => {
    API.runQuery(newQuery, newStart, newEnd)
    .then((data) => {
      this.setState({ results: { docs: data.docs } });
    });
  }

  // Render the component. Note how we deploy both the Query and the Results Components
  render() {
    return (
      <div className="main-container">

        {/* Note how we pass the setQuery function to enable Query to perform searches */}
        <Query updateSearch={this.setQuery} />
        {/* Note how we pass in the results into this component */}
        <Results results={this.state.results} />
      </div>
    );
  }
};

// Export the module back to the route
export default Search;


// import React from "react";

// const Search = props =>
//   <div className="container">
//     <div className="row">
//       <div className="col-lg-12">
//         <div className="panel panel-primary">
//           <div className="panel-heading">
//             <h3 className="panel-title">
//               <strong>
//                 <i className="fa fa-search" aria-hidden="true"></i> Search
//               </strong>
//             </h3>
//           </div>
//           <div className="panel-body">
//             <form>
//               <div className="form-group">
//                 <label htmlFor="topic">Topic</label>
//                 <input onChange={props.handleTopicChange} type="text" className="form-control" id="topic" aria-describedby="emailHelp" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="start-year">Start Year</label>
//                 <input onChange={props.handleStartYearChange} type="text" className="form-control" id="start-year" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="end-year">End Year</label>
//                 <input onChange={props.handleEndYearChange} type="text" className="form-control" id="end-year" />
//               </div>
//               <button onClick={props.handleFormSubmit} type="submit" className="btn btn-primary">Submit</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>

//     <br/><br/>

//     <div className="row">
//       <div className="col-lg-12">
//         <div className="panel panel-primary">
//           <div className="panel-heading">
//             <h3 className="panel-title">
//               <strong>
//                 <i className="fa fa-newspaper-o" aria-hidden="true"></i> Results
//               </strong>
//             </h3>
//           </div>
//           <div className="panel-body">
//             {props.renderArticles()}
//           </div>
//         </div>
//       </div>
//     </div>
//     <br/><br/>
//   </div>


// export default Search;
