import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from './NavigationBar'
import queryString from 'query-string'

class DetailPage extends Component {
    render() {

        const postId = this.props.match.params.postId
        const { posts } = this.props
        //console.log(JSON.stringify(this.props.match.params))
        //console.log(JSON.stringify(this.props.location))

        // console.log(JSON.stringify(this.props))


        const currentPost = posts[postId]

        return (
            <div>
                 <NavigationBar />

                <div id='detail-block'>
                    {console.log('HELLO: ' + JSON.stringify(this.props.match.params.postId))}
                    {console.log('postID: ' + JSON.stringify(postId))}
                    <div className="my-post-list-page-header">
                        <span style={{ color: 'DodgerBlue', fontWeight: 'bold', fontSize: 'x-large' }}>{currentPost.title}</span>
                    </div>

                    <div>
                        {currentPost.body}
                    </div>

                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}


export default connect(
    mapStateToProps
)(DetailPage)



//export default DetailPage