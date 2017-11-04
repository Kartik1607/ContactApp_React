import React from 'react'
import constants from '../constants.js'

const imgStyle = {
  maxWidth: '100%',
  borderRadius: '20px',
  height: '200px'
}

const uploadButtonStyle = {
  margin: 'auto',
  background: 'transparent',
  textAlign: 'center',
  width: '100%'
}

const actionButtonStyle = {
  background: 'black',
  color: 'white',
  padding: '10px 20px',
  boxShadow: 'none'
}

const fileUploadInputStyle = {
  display: 'none'
}

class CourseAdd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contact: props.contact ? props.contact : {},
      actionButtonText: props.contact ? 'UPDATE' : 'SAVE',
      imageUploadText: props.contact ? 'Change Image' : 'Upload Image'
    }
    this.submit = this.submit.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.onClickUploadImage = this.onClickUploadImage.bind(this)
  }

  onClickUploadImage () {
    $('#file_upload_input').click()
  }

  submit (event) {
    let that = this
    let url = constants.api_url + '/contacts'
    let method = 'POST'
    if (this.state.contact._id) {
      method = 'PUT'
      url = url + '/' + this.state.contact._id
    } 
    let data = {
      name: document.getElementById('name').value,
      mobileOffice: document.getElementById('phonePersonal').value,
      mobilePersonal: document.getElementById('phoneOffice').value,
      address: document.getElementById('address').value
    }
    let xhr = new window.XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        that.state.contact = JSON.parse(xhr.responseText)
        that.setState({contact: that.state.contact})
        that.setState({showAlert: true})
        window.setTimeout(() => { that.setState({showAlert: false}) }, 1000)
      } else {
      }
    }
    this.uploadImage((imageName) => {
      data.image = imageName
      xhr.send(JSON.stringify(data))
    })
  }

  uploadImage (cb) {
    let xhr = new window.XMLHttpRequest()
    xhr.open('POST', constants.api_url + '/upload')
    const file = $('#file_upload_input').prop('files')[0]
    if (!file) {
      cb(this.state.contact.image)
      return
    }
    let fd = new FormData()
    fd.append('avatar', file)
    xhr.onload = function () {
      if (this.status === 200) {
        cb(JSON.parse(xhr.responseText).filename)
      };
    }
    xhr.send(fd)
  }

  render () {
    let imgSource = './assets/person-placeholder.jpg'
    if (this.state.contact.image) {
      imgSource = './images/' + this.state.contact.image
    } 
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='form-group'>
              <label className='control-label' htmlFor='name'>Name</label>
              <input type='text' placeholder='Full Name' id='name' className='form-control' defaultValue={this.state.contact.name} />
            </div>
            <div className='form-group'>
              <label htmlFor='phonePersonal'>Mobile Office</label>
              <input type='number' placeholder='Office Phone Number' id='phoneOffice' className='form-control' defaultValue={this.state.contact.mobileOffice} />
            </div>
            <div className='form-group'>
              <label htmlFor='phonePersonal'>Mobile Personal</label>
              <input type='number' placeholder='Personal Phone Number' id='phonePersonal' className='form-control' defaultValue={this.state.contact.mobilePersonal} />
            </div>
          </div>
          <div className='col-md-3' onClick={this.onClickUploadImage}>
            <img style={imgStyle} src={imgSource} />
            <button className='btn btn-default' style={uploadButtonStyle}>{this.state.imageUploadText}</button>
            <input type='file' id='file_upload_input' style={fileUploadInputStyle} accept='image/*' />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <input type='text' placeholder='Address' id='address' className='form-control' defaultValue={this.state.contact.address} />
        </div>
        <button className='btn btn-primary pull-right' onClick={this.submit} style={actionButtonStyle}> {this.state.actionButtonText} </button>
        {
          (this.state.showAlert) &&
          <div className='alert alert-success hidden'>
            <strong>Success!</strong>
          </div>
        }
      </div>
    )
  }
}

export default CourseAdd
