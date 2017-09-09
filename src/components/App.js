import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { fetchCategories, fetchPosts } from '../actions'
import PostList from './PostList'

class App extends Component {
  componentDidMount() {
    this.props.fetchCat()
    this.props.fetchPosts()
  }

  render() {

    return (
      <div id="App" className="container">

        <Route path='/' exact render={() =>
          <PostList showCategory='' />
        } />

        {this.props.categories.map(category => (
          <Route key={category.path} path={`/${category.path}`} render={() =>
            <PostList showCategory={category.name} />
          } />
        ))}

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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
