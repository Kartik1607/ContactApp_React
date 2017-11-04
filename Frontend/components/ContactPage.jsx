import React from 'react'
import ContactList from './ContactList.jsx'
import constants from '../constants.js'

class ContactPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts: []
    }
    this.loadContacts = this.loadContacts.bind(this)
    this.updateContacts = this.updateContacts.bind(this)
    this.loadContacts()
  }

  loadContacts () {
    let that = this
    let xhr = new window.XMLHttpRequest()
    xhr.open('GET', constants.api_url + '/contacts', true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        that.updateContacts(xhr.responseText)
        that.setState({contacts: that.state.contacts})
      }
    }
    xhr.send(null)
  }

  updateContacts (data) {
    let contactArray = JSON.parse(data)
    for (let i = 0; i < contactArray.length; ++i) {
      let current = contactArray[i]
      this.state.contacts.push(current)
      console.log(current)
    }
  }

  render () {
    return (
      <div>
        <div className='container'>
          <ContactList contacts={this.state.contacts} onItemClick={this.props.onItemClick} />
        </div>
      </div>
    )
  }
}

export default ContactPage
