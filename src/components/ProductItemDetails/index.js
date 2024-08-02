import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failed: 'FAILED',
  success: 'SUCCESS',
}

class ProductItemDetails extends Component {
  state = {quantity: 1, apiStatus: apiStatusConstants.initial, productData: {}}

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
    const data = await response.json()

    // const transformedData = {
    //   availability: data.availability,
    //   brand: data.brand,
    //   description: data.description,
    //   id: data.id,
    //   imageUrl: data.image_url,
    //   price: data.price,
    //   rating: data.rating,
    //   similarProducts: data.similar_products.map(eachSimilarProduct => ({
    //     availability: eachSimilarProduct.availability,
    //     brand: eachSimilarProduct.brand,
    //     description: eachSimilarProduct.description,
    //     id: eachSimilarProduct.id,
    //     imageUrl: eachSimilarProduct.image_url,
    //     price: eachSimilarProduct.price,
    //     rating: eachSimilarProduct.rating,
    //     style: eachSimilarProduct.style,
    //     title: eachSimilarProduct.title,
    //     totalReviews: eachSimilarProduct.total_reviews,
    //   })),
    //   style: data.style,
    //   title: data.title,
    //   totalReviews: data.total_reviews,
    // }

    const transformedData = {
      availability: data.availability,
      brand: data.brand,
      description: data.description,
      id: data.id,
      imageUrl: data.image_url,
      price: data.price,
      rating: data.rating,
      similarProducts: data.similar_products,
      style: data.style,
      title: data.title,
      totalReviews: data.total_reviews,
    }

    if (response.ok === true) {
      this.setState({
        productData: transformedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failed})
    }
  }

  displayLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  onClickIncrement = () =>
    this.setState(prevState => ({quantity: prevState.quantity + 1}))

  onClickDecrement = () =>
    this.setState(prevState => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
    }))

  displayData = () => {
    const {productData, quantity} = this.state
    const {
      availability,
      brand,
      description,
      id,
      imageUrl,
      price,
      rating,
      similarProducts,
      style,
      title,
      totalReviews,
    } = productData

    return (
      <div className="product-details-bg-container">
        <div className="product-details-inner-container">
          <div className="product-image-container">
            <img src={imageUrl} className="product-image" alt="product" />
          </div>
          <div className="product-details-container">
            <h1 className="title-heading">{title}</h1>
            <p className="product-price">Rs {price}/-</p>
            <div className="rating-review-container">
              <div className="rating-container">
                <p className="total-rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                  className="rating-image"
                  alt="star"
                />
              </div>
              <p className="total-reviews">{totalReviews} Reviews</p>
            </div>
            <p className="description">{description}</p>
            <p className="stock-container">
              <span className="blue-text">Available</span> {availability}
            </p>
            <p className="stock-container">
              <span className="blue-text">Brand</span> {brand}
            </p>
            <hr />
            <div className="quantity-container">
              <button
                className="quantity-button"
                type="button"
                onClick={this.onClickDecrement}
                data-testid="plus"
              >
                <BsDashSquare />{' '}
              </button>
              <p>{quantity}</p>
              <button
                className="quantity-button"
                type="button"
                onClick={this.onClickIncrement}
                data-testid="minus"
              >
                <BsPlusSquare />{' '}
              </button>
            </div>
            <div className="cart-button-container">
              <button
                className="cart-button"
                type="button"
                onClick={this.onClickCartButton}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <ul className="similar-products-container">
          <h1 className="similar-products-heading">Similar Products</h1>
          <div className="similar-products-list-container">
            {similarProducts.map(eachProduct => (
              <SimilarProductItem
                key={eachProduct.id}
                productDetails={eachProduct}
              />
            ))}
          </div>
        </ul>
      </div>
    )
  }

  displayFailMessage = () => (
    <div className="failed-view-container">
      <div className="failed-view-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="failed-view-image"
        />
      </div>
      <h2 className="failed-view-heading">Product Not Found</h2>
      <div className="failed-view-button-container">
        <Link to="/Products">
          <button type="button" className="failed-view-button">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />
        {apiStatus === apiStatusConstants.initial && this.displayLoader()}
        {apiStatus === apiStatusConstants.success && this.displayData()}
        {apiStatus === apiStatusConstants.failed && this.displayFailMessage()}
      </>
    )
  }
}

export default ProductItemDetails
