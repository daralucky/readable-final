import React, { Component } from 'react'
import NavigationBar from './NavigationBar'

class DetailPage extends Component {
    render() {
        console.log(JSON.stringify(this.props.match.params))
        console.log(JSON.stringify(this.props.location))
        return (
            <div>
                <NavigationBar />
                <div id='detail-block'>

                    <div className="my-post-list-page-header">
                        <span style={{ color: 'DodgerBlue', fontWeight: 'bold', fontSize: 'x-large' }}> Post Title</span>
                    </div>

                    <div>
                        bla bla bla
                    </div>

                </div>

            </div>
        )
    }
}

export default DetailPage