import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { fetchCategories, fetchPosts } from '../actions'
import '../styles/App.css'
import PostList from './PostList'
import PostDetails from './PostDetails'
import EditPostPage from './EditPostPage'
import AddNewPostPage from './AddNewPostPage'
import AddCommentPage from './AddCommentPage'
import EditCommentPage from './EditCommentPage'

class App extends Component {
  componentDidMount() {
    this.props.fetchCat()
    this.props.fetchPosts()
  }

  render() {
    const { categories } = this.props

    return (
      <div id="App" className="container">

        <Route path='/add-new-post' exact component={AddNewPostPage} />

        <Route path='/edit-post/:postId' component={EditPostPage} />

        <Route path='/add-comment/:postId' component={AddCommentPage} />

        <Route path='/edit-comment/:commentId' component={EditCommentPage} />

        <Route path='/' exact render={() =>
          <PostList showCategory='' />
        } />

        {
          categories.map(category => (
            <div key={category.path}>
              <Route path={`/${category.path}`} exact render={() =>
                <PostList showCategory={category.name} />
              } />

              <Route path={`/${category.path}/:postId`} component={PostDetails} />

            </div>
          ))
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let categories = []
  for (let myCat of Object.values(state.categories)) {
    categories.push(myCat)
  }

  return { categories }
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
