import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props

  const transformedData = {imageUrl: productDetails.image_url}
  const {
    availability,
    brand,
    description,
    id,
    imageUrl,
    price,
    rating,
    style,
    title,
    totalReviews,
  } = productDetails

  return (
    <li className="similar-product-list-item-container">
      <div className="similar-product-list-item-image-title-container">
        <div className="similar-product-list-item-image-container">
          <img
            src={transformedData.imageUrl}
            alt="similar product"
            className="similar-product-list-item-image"
          />
        </div>
        <h3 className="similar-product-list-item-heading">{title}</h3>
        <p className="similar-product-list-item-brand">{brand}</p>
      </div>
      <div className="similar-product-list-item-rating-price-container">
        <p className="similar-product-list-item-price">Rs {price}/-</p>
        <div className="similar-product-list-item-rating-container">
          <p className="similar-product-list-item-rating">{rating}</p>
          <div className="similar-product-list-item-rating-star-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="similar-product-list-item-rating-star"
            />
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
