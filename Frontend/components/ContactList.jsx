import React from 'react'
import ContactListRow from './ContactListRow.jsx'

const listStyle = {
  borderRadius: '40px',
  border: '2px solid',
  overflow: 'hidden'
}

class ContactList extends React.Component {
  clickItem (contact) {
    this.props.onItemClick(contact)
  }

  render () {
    return (
      // <table className='table table-bordered table-hover'>
      //   <thead>
      //     <tr>
      //       <td><b>Name</b></td>
      //       <td><b>Mobile Office</b></td>
      //       <td><b>Mobile Personal</b></td>
      //       <td><b>Address</b></td>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {
      //     this.props.contacts.map(contact =>
      //       <ContactListRow key={contact.id} contact={contact} />
      //   )}
      //   </tbody>
      // </table>
      <div>
        <div className='list-group' style={listStyle}>
          {
            this.props.contacts.map(contact =>
              <button key={contact.id} className='list-group-item' type='button' onClick={() => this.clickItem(contact)}>
                <ContactListRow contact={contact} />
              </button>)
          }
        </div>
      </div>
    )
  }
}

ContactList.propTypes = {
  contacts: React.PropTypes.array.isRequired
}

export default ContactList
