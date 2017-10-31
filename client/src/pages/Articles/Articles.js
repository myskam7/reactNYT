import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { Results, ResultsItem, SavedBtn } from "../../components/Results";
import { Saved, SavedItem, DeleteBtn } from "../../components/Saved";
import { Input, SearchBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    q: "",
      limit: 5,
      begin_date: "",
      end_date: "",
      searchResults: [],
      results: []
  };

  componentDidMount() {
    this.callArticles();
  }



  

  callArticles = () => {
    API.getSaved()
      .then(res => this.setState({ results: res.data, q: "", begin_date: "", end_date: "" }))
      .catch(err => console.log(err));
      
  };

  // deleteBook = id => {
  //   API.deleteArticle(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.q && this.state.begin_date) {
      API.getSaved({
        q: this.state.q,
        begin_date: this.state.begin_date,
        end_date: this.state.end_date
      })
        .then(res => this.callArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Article Search</h1>
            </Jumbotron>
            <form>
            <Input
            value={this.state.q}
            onChange={this.handleInputChange}
            name="q"
            placeholder="search term (required)"
          />
          <Input
            value={this.state.begin_date}
            onChange={this.handleInputChange}
            name="begin_date"
            placeholder="start year (required)"
          />
          <Input
          value={this.state.end_date}
          onChange={this.handleInputChange}
          name="end_date"
          placeholder="end year (Optional)"
        />
             
          <SearchBtn
          disabled={!(this.state.q && this.state.begin_date)}
          onClick={this.handleFormSubmit}
           name="API.runQuery"
           >
           Search
           </SearchBtn>
           

            </form>
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1>Searched Articles</h1>
            </Jumbotron>
             {this.state.results.length ? ( 
               <Results> 
                 {this.state.results.map(result => ( 
                   <ResultsItem key={result._id}> 
                     <a href={"/saved/" + result._id}> 
                       <strong> 
                         {result.q} 
                       </strong> 
                     </a> 
                    
                   </ResultsItem> 
                 ))} 
               </Results> 
             ) : ( 
               <h3>No Results to Display</h3> 
             )} 
          </Col>
        </Row>
      </Container>
    );
  }
}

//have to add saved
export default Articles;