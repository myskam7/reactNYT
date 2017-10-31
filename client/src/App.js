// import React from "react";
// import Articles from "./pages/Articles";

// const App = () => (
//   <div>
//     <Articles />
//   </div>
// );



import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";


const App = () =>
  <Router>
    <div>
      
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/result" component={Articles} />
       
      </Switch>
    </div>
  </Router>;

  export default App;