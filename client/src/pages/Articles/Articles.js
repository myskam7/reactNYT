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
    articles: []
  };

  componentDidMount() {
    this.callArticles();
  }

  callArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
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
              <Input name="topic" placeholder="Topic (required)" />
              <Input name="startYear" placeholder="Start Year (required)" />
              <Input name="endYear" placeholder="End Year (Optional)" />
              <SearchBtn name="API.getArticles">Search</SearchBtn>
           
            </form>
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1>Searched Articles</h1>
            </Jumbotron>
            {/* {this.state.articles.length ? ( */}
              {/* <Results> */}
                {/* {this.state.articles.map(book => ( */}
                  {/* <ResultsItem key={article._id}> */}
                    {/* <a href={"/books/" + article._id}> */}
                      {/* <strong> */}
                        {/* {article.title} */}
                      {/* </strong> */}
                    {/* </a> */}
                    {/* <SavedBtn /> */}
                  {/* </ResultsItem> */}
                {/* ))} */}
              {/* </Results> */}
            {/* ) : ( */}
              {/* <h3>No Results to Display</h3> */}
            {/* )} */}
          </Col>
        </Row>
      </Container>
    );
  }
}

//have to add saved
export default Articles;