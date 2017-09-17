import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import Moment from 'react-moment'
import 'moment-timezone'
import { Link, withRouter } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import AddNewPost from './AddNewPost'
import { Glyphicon, Button } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'
import { updateSettings, postUpdateVote } from '../actions'
import * as CONSTANTS from '../constants'
import DeletePost from './DeletePost'

class PostList extends Component {

    countPostComments = postId => {
        let count = this.props.comments.filter(c =>
            c.parentId === postId
            && c.deleted === false
            && c.parentDeleted === false
        ).length

        return count
    }

    render() {
        //console.log(JSON.stringify(this.props.location))

        const { posts, showCategory, settings, changeSettings, votePost } = this.props

        let myPosts = posts.filter(p => p.deleted === false).sort(sortBy(settings.orderPost))

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
                        <span style={{ color: 'DodgerBlue', fontWeight: 'bold', fontSize: 'x-large' }}> List posts in {currentCategory} </span>

                        <span style={{ color: 'red', marginLeft: '10px' }}>
                            Order by: <Button bsStyle={settings.orderPost === '-timestamp' ? 'primary' : 'default'} bsSize="xsmall"
                                onClick={() => changeSettings('orderPost', '-timestamp')}
                            >
                                Time</Button> <Button bsStyle={settings.orderPost === '-voteScore' ? 'primary' : 'default'} bsSize="xsmall"
                                    onClick={() => changeSettings('orderPost', '-voteScore')}
                                >
                                Vote Score</Button>
                        </span>

                        <AddNewPost caller={this.props.location.pathname} />

                    </div>

                    {
                        myPosts.map((post) => (
                            <div className="link" key={post.id}>
                                <div className="midcol">
                                    <div tabIndex="0" title="Vote Up">
                                        <Button bsStyle="success" bsSize="xsmall"
                                            onClick={() => votePost(post.id, CONSTANTS.UP_VOTE)}
                                        >
                                            <Glyphicon glyph="thumbs-up" />
                                        </Button>
                                    </div>
                                    <div className="my-post-votescore" title={`${post.voteScore} Vote Score`}>{post.voteScore}</div>
                                    <div tabIndex="0" title="Vote Down">
                                        <Button bsStyle="info" bsSize="xsmall"
                                            onClick={() => votePost(post.id, CONSTANTS.DOWN_VOTE)}
                                        >
                                            <Glyphicon glyph="thumbs-down" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="entry">
                                    <div>
                                        <p className="title">
                                            <Link to={`${post.category}/${post.id}`} className="title"> {post.title} </Link>
                                            <Button onClick={this.onHome} bsStyle="warning" bsSize="xsmall">
                                                <Glyphicon glyph="pencil" /> Edit
                                            </Button> <DeletePost postId={post.id} needRedirection={false} />
                                        </p>
                                        <p className="tagline">
                                            submitted on <Moment unix tz="Asia/Phnom_Penh" format="DD MMM YYYY HH:mm">
                                                {post.timestamp}
                                            </Moment> by {post.author}
                                        </p>
                                        <ul className="flat-list buttons">
                                            <li>
                                                <Link to={`${post.category}/${post.id}#comments`} className="deco-none"> {this.countPostComments(post.id)} comments </Link>
                                            </li>
                                            <li>
                                                <Link to={`/${post.category}`}> posted in {capitalize(post.category)} </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

            </div >
        )
    }
}

const mapStateToProps = state => {

    let posts = []
    for (let myPost of Object.values(state.posts)) {
        posts.push(myPost)
    }

    let comments = []
    for (let myComment of Object.values(state.comments)) {
        comments.push(myComment)
    }

    return {
        posts,
        comments,
        settings: state.settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSettings: (key, value) => dispatch(updateSettings(key, value)),
        votePost: (postId, newSore) => (dispatch(postUpdateVote(postId, newSore)))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostList)
)
