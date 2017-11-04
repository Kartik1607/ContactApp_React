import React from 'react'

const imgStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%'
}

const nameStyle = {
  fontFamily: 'Roboto, sans-serif',
  fontWeight: '400',
  fontSize: '1.2em',
  paddingLeft: '30px'
}

class ContactListRow extends React.Component {
  render () {
    let imgSrc = './assets/person-placeholder.jpg'
    if (this.props.contact.image) {
      imgSrc = './images/' + this.props.contact.image
    }
    return (
      // <tr>
      //   <td>{this.props.contact.name}</td>
      //   <td>{this.props.contact.mobileOffice}</td>
      //   <td>{this.props.contact.mobilePersonal}</td>
      //   <td>{this.props.contact.address}</td>
      // </tr> 
      <div className='row'>
        <div className='col-md-1'>
          <img src={imgSrc} style={imgStyle} />
        </div>
        <div>
          <div style={nameStyle}>
            {this.props.contact.name}
          </div>
          <div>
            Mob: {this.props.contact.mobilePersonal}
          </div>
        </div>
      </div>
    )
  }
}

export default ContactListRow
