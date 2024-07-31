import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failed: 'FAILED',
  success: 'SUCCESS',
}

class ProductItemDetails extends Component {
  state = {quantity: 1, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchProductDetails()
  }

  fetchProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    // const data = await response.json()
    console.log(await response.json())
  }

  render() {
    return (
      <>
        <Header />
      </>
    )
  }
}

export default ProductItemDetails
