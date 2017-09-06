import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'

class App extends Component {


  componentDidMount() {
    this.props.fetchCat()
    this.props.fetchPosts()
  }

  render() {
    const { categories, posts } = this.props


    return (
      <div className="App">
        <h1>Readable 02</h1>

        {console.log("categories: " + JSON.stringify(categories))}
        <h3>Category:</h3>
        <ul>
          {categories.map((cat) => (

            <li key={cat.path}>{cat.name}</li>

          ))}
        </ul>

        {console.log("posts: " + JSON.stringify(posts))}
        <h3>Post:</h3>
        <ul>
          {posts.map((post) => (

            <li key={post.id}>{post.title}</li>

          ))}
        </ul>


      </div>
    );
  }
}


const mapStateToProps = (state) => {
  //console.log(state.categories)
  return {
    categories: state.categories,
    posts: state.posts
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
