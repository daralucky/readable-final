import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'
import CategoryBock from './CategoryBlock'
import PostList from './PostList'
import AddNewPost from './AddNewPost'

class App extends Component {
  componentDidMount() {
    this.props.fetchCat()
    this.props.fetchPosts()
  }

  render() {

    return (
      <div className="App">
        <h1>Readable 02</h1>

        <CategoryBock />

        <PostList />

        <AddNewPost />

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCat: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
