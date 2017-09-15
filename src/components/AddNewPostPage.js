import React from 'react'
import AddNewPostForm from './AddNewPostForm'
import NavigationBar from './NavigationBar'

class AddNewPostPage extends React.Component {

  showResults(values) {
    new Promise(resolve => {
      setTimeout(() => {
        // simulate server latency
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        resolve()
      }, 500)
    })
  }

  render() {


    return (
      <div>
        <NavigationBar />

        <AddNewPostForm onSubmit={this.showResults} />
      </div>

    )
  }
}

export default AddNewPostPage