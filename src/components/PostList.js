import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import Moment from 'react-moment'
import 'moment-timezone'
import NavigationBar from './NavigationBar'
import AddNewPost from './AddNewPost'
import { Glyphicon, Button } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'
import { updateSettings, postVoteUp } from '../actions'

class PostList extends Component {

    countPostComments = postId => {
        let counter = this.props.comments.filter(c => c.parentId === postId)
            .reduce((accumulator, currentValue) => {
                return accumulator + 1
            }, 0)
        return counter
    }

    render() {
        const { posts, showCategory, settings, changeSettings, votePostUp } = this.props

        let myPosts = posts.sort(sortBy(settings.orderPost))

        //console.log("showCategory: " + JSON.stringify(showCategory))
        //filter posts by category
        let currentCategory
        if (showCategory !== '') {
            myPosts = myPosts.filter(p => p.category === showCategory)
            currentCategory = capitalize(showCategory)
        } else {
            currentCategory = 'All'
        }

        return (
            <div>

                <NavigationBar />

                <div id='post-block'>

                    <div className="my-post-list-page-header">
                        <span style={{ color: 'DodgerBlue', fontWeight: 'bold', fontSize: 'x-large' }}> Showing posts in {currentCategory}</span>
                        <span style={{ color: 'red' }} className="pull-right">
                            Order by: <Button bsStyle={settings.orderPost === '-timestamp' ? 'primary' : 'default'} bsSize="xsmall"
                                onClick={() => changeSettings('orderPost', '-timestamp')}
                            >
                                Time</Button> <Button bsStyle={settings.orderPost === '-voteScore' ? 'primary' : 'default'} bsSize="xsmall"
                                    onClick={() => changeSettings('orderPost', '-voteScore')}
                                >
                                Vote Score</Button> </span>
                    </div>

                    {myPosts.map((post) => (
                        <div className="link" key={post.id}>
                            <div className="midcol">
                                <div tabIndex="0" title="Vote Up">
                                    <Button onClick={this.onHome} bsStyle="success" bsSize="xsmall"
                                        onClick={() => votePostUp(post.id)}
                                    >
                                        <Glyphicon glyph="thumbs-up" />
                                    </Button>
                                </div>
                                <div className="my-post-votescore" title={`${post.voteScore} Vote Score`}>{post.voteScore}</div>
                                <div tabIndex="0" title="Vote Down">
                                    <Button onClick={this.onHome} bsStyle="info" bsSize="xsmall">
                                        <Glyphicon glyph="thumbs-down" />
                                    </Button>
                                </div>
                            </div>
                            <div className="entry">
                                <div>
                                    <p className="title">
                                        <a className="title" href={`${post.category}/${post.id}`}>
                                            {post.title}</a> <Button onClick={this.onHome} bsStyle="warning" bsSize="xsmall">
                                            <Glyphicon glyph="pencil" /> Edit
                                </Button> <Button onClick={this.onHome} bsStyle="danger" bsSize="xsmall">
                                            <Glyphicon glyph="trash" /> Delete </Button>
                                    </p>
                                    <p className="tagline">
                                        submitted on <Moment unix tz="Asia/Phnom_Penh">
                                            {post.timestamp}
                                        </Moment> by {post.author}
                                    </p>
                                    <ul className="flat-list buttons">
                                        <li>
                                            <a href="#mylink" rel="nofollow" className="deco-none">478 comments</a>
                                        </li>
                                        <li>
                                            <a href='/redux'>posted in {capitalize(post.category)}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <AddNewPost />

            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        comments: state.comments,
        settings: state.settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSettings: (key, value) => dispatch(updateSettings(key, value)),
        votePostUp: (postId) => (dispatch(postVoteUp(postId)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)