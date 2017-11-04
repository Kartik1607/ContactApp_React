import React from 'react'
import constants from '../../constants'

const iconStyle = {
  marginRight: '1.2em'
}

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: props.currentPage
    }
    this.performButtonAction = this.performButtonAction.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.state = {
      currentPage: nextProps.currentPage
    }
    this.setState({currentPage: this.state.currentPage})
  }

  performButtonAction () {
    if (this.state.currentPage === constants.contactPage) {
      this.state.currentPage = constants.addPage
    } else {
      this.state.currentPage = constants.contactPage
    }
    this.setState({
      currentPage: this.state.currentPage
    })
    this.props.onChangePage(this.state.currentPage)
  }

  render () {
    return (
      <div className='row header'>
        <div className='col-md-6 mainTitle'>{this.state.currentPage.title}</div>
        <div className='col-md-6 pull-right'>
          <button className='btn btn-default btn-lg pull-right headerButton'
            onClick={this.performButtonAction}>
            <span className={this.state.currentPage.headerButtonIcon} style={iconStyle} />
            {this.state.currentPage.headerButtonText}
          </button>
        </div>
      </div>
    )
  }
}

export default Header
