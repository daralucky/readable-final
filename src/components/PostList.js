import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import Moment from 'react-moment'
import 'moment-timezone'
import CategoryBock from './CategoryBlock'
import AddNewPost from './AddNewPost'

class PostList extends Component {

    countPostComments = postId => {
        let counter = this.props.comments.filter(c => c.parentId === postId)
            .reduce((accumulator, currentValue) => {
                return accumulator + 1
            }, 0)
        return counter
    }


    render() {
        const { posts, showCategory } = this.props

        let myPosts = posts.sort(sortBy('voteScore'))

        //console.log("showCategory: " + JSON.stringify(showCategory))
        //filter posts by category
        if (showCategory !== 'SHOW_ALL') {
            myPosts = myPosts.filter(p => p.category === showCategory)
        }

        return (
            <div id='post-list'>

                <CategoryBock />

                <div id='post-block'>

                    <h3>Post:</h3>
                    <p>
                        <span style={{ color: 'red', fontWeight: 'bold' }}>Order by:</span> <a href='#orderByTime'>Time</a>
                        | <a href='#orderByVote'>Vote</a>
                    </p>
                    <ul>
                        {myPosts.map((post) => (

                            <li key={post.id} style={{ marginBottom: '20px' }}>
                                <a href={`${post.category}/${post.id}`}>{post.title}</a> author: {post.author} <button>Edit</button>  <button>Delete</button>
                                <br />
                                {this.countPostComments(post.id)} comments
                 | score: {post.voteScore} <a href='#upVote'>Vote Up</a> , <a href='#downVote'>Vote Down</a>
                                | category: {post.category} | time:
                <Moment unix tz="Asia/Phnom_Penh">
                                    {post.timestamp}
                                </Moment>
                            </li>
                        ))}
                    </ul>
                </div>

                <AddNewPost />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        comments: state.comments
    }
}

export default connect(mapStateToProps)(PostList)