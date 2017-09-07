import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'

import PostList from './PostList'
import AddNewPost from './AddNewPost'
import { Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.fetchCat()
    this.props.fetchPosts()
  }

  render() {

    return (
      <div className="App">
        <h1>Readable 02</h1>
        {console.log("categories: " + JSON.stringify(this.props.categories))}

        <Route path='/' exact component={PostList} />
        {this.props.categories.map(category => (
          <Route path={`/${category.path}`} component={PostList} />
        ))}

        <AddNewPost />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCat: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
