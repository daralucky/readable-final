import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'
import sortBy from 'sort-by'
import Moment from 'react-moment'
import 'moment-timezone'

class App extends Component {


  componentDidMount() {
    this.props.fetchCat()
    this.props.fetchPosts()
  }

  render() {
    const { categories, posts } = this.props

    let myPosts = posts.sort(sortBy('voteScore'))

    return (
      <div className="App">
        <h1>Readable 02</h1>

        {console.log("categories: " + JSON.stringify(categories))}
        <div id='category-block'>
          <h3>Category:</h3>
          <ul>
            <li key='all'>
              <a href='/'>Root</a>
            </li>
            {categories.map((cat) => (
              <li key={cat.path}>
                <a href={cat.path}>{cat.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {console.log("myPosts: " + JSON.stringify(myPosts))}
        <div id='post-block'>
          <h3>Post:</h3>
          <p>
            <span style={{ color: 'red', fontWeight: 'bold' }}>Order by:</span> timestamp | voteScore
        </p>
          <ul>
            {myPosts.map((post) => (

              <li key={post.id}>
                {post.title} (score: {post.voteScore} | cat: {post.category} | time :
                <Moment unix tz="Asia/Phnom_Penh">
                  {post.timestamp}
                </Moment>)
            </li>

            ))}
          </ul>
        </div>

        <div id='add-new-post-block'>
          <p style={{ textAlign: 'center' }}>
            <a href='#newpost'>ADD NEW POST</a>
          </p>
        </div>

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
