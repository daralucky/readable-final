import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import Moment from 'react-moment'
import 'moment-timezone'
import NavigationBar from './NavigationBar'
import AddNewPost from './AddNewPost'
import { PageHeader, Glyphicon, Label, Button } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'

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

                    <div className="my-page-header">
                        <span  style={{ color: 'OrangeRed', fontWeight: 'bold', fontSize: 'larger' }}> Showing posts in {currentCategory}</span>

                            <span style={{ color: 'red' }} className="pull-right">Order by: <a href='#orderByTime'>Time</a>
                            | <a href='#orderByVote'>Vote</a> </span>

                    </div>


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

                <div className="row">
                    <div className="col-xs-2 my-padding-left-1 my-padding-right-1">
                        <div className="well my-well-height text-center my-vertical-center">

                            <Button onClick={this.onHome} bsStyle="success" bsSize="xsmall">
                                <Glyphicon glyph="thumbs-up" />
                            </Button>
                            <span className="my-post-votescore">26</span>
                            <Button onClick={this.onHome} bsStyle="danger" bsSize="xsmall">
                                <Glyphicon glyph="thumbs-down" />
                            </Button>
                        </div>
                    </div>
                    <div className="col-xs-10 my-padding-left-1 my-padding-right-1">
                        <div className="well my-well-height">
                            <a href='#hh'>Udacity is the best place to learn React </a> <Button onClick={this.onHome} bsStyle="warning" bsSize="xsmall">
                                <Glyphicon glyph="pencil" /> Edit
                                </Button> <Button onClick={this.onHome} bsStyle="danger" bsSize="xsmall">
                                <Glyphicon glyph="trash" /> Delete </Button>

                            <div><small>submitted on Sep 29, 2015, 9:12 PM by Siray</small></div>
                            <div>1901 comments. posted in Redux</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="link">
                        <div className="midcol">
                            <div className="text-center" tabindex="0">
                                <Button onClick={this.onHome} bsStyle="success" bsSize="xsmall">
                                    <Glyphicon glyph="thumbs-up" />
                                </Button>
                            </div>
                            <div className="my-post-votescore" title="2831">2831</div>
                            <div className="text-center" tabindex="0">
                                <Button onClick={this.onHome} bsStyle="danger" bsSize="xsmall">
                                    <Glyphicon glyph="thumbs-down" />
                                </Button>
                            </div>
                        </div>
                        <div className="entry">
                            <div>
                                <p className="title">
                                    <a className="title" href="http://www.sltrib.com/news/2017/09/08/detectives-body-camera-confirms-that-logan-police-asked-him-to-back-off-blood-draw/">
                                        Detective’s body camera confirms that Logan police asked him to back off blood draw before nurse’s arrest</a> <Button onClick={this.onHome} bsStyle="warning" bsSize="xsmall">
                                        <Glyphicon glyph="pencil" /> Edit
                                </Button> <Button onClick={this.onHome} bsStyle="danger" bsSize="xsmall">
                                        <Glyphicon glyph="trash" /> Delete </Button>
                                </p>
                                <p className="tagline">
                                    submitted on Sep 29, 2015, 9:12 PM by Siray
				            </p>
                                <ul className="flat-list buttons">
                                    <li>
                                        <a href="#mylink" rel="nofollow" className="deco-none">478 comments</a>
                                    </li>
                                    <li>
                                        <a href='/redux'>posted in Redux</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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