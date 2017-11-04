import React from 'react'
import ContactPage from './components/ContactPage.jsx'
import CourseAdd from './components/CourseAdd.jsx'
import Constants from './constants.js'
import Header from './components/header/Header.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: Constants.contactPage
    }
    this.changePage = this.changePage.bind(this)
    this.onItemClicked = this.onItemClicked.bind(this)
  }

  changePage (page) {
    this.state.currentPage = page
    this.setState({currentPage: this.state.currentPage})
  }

  onItemClicked (item) {
    this.state.currentPage = Constants.editPage
    this.setState({
      currentPage: this.state.currentPage,
      contact: item
    })
  }

  render () {
    var page
    if (this.state.currentPage === Constants.contactPage) {
      page = <ContactPage onItemClick={this.onItemClicked} />
    } else if (this.state.currentPage === Constants.addPage) {
      page = <CourseAdd />
    } else {
      page = <CourseAdd contact={this.state.contact} />
    }
    return (
      <div>
        <Header onChangePage={this.changePage} currentPage={this.state.currentPage} />
        {page}
      </div>
    )
  }
}

export default App
