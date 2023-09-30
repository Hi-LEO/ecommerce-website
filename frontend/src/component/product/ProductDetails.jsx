import React, { useEffect } from "react";
import { Fragment } from "react";
import "../product/ProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { getproductDetail } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";

const ProductDetails = ({ match }) => {
  const id = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => {
    return state.productDetail;
  });
  useEffect(() => {
    dispatch(getproductDetail(id.id));
  }, [dispatch, id.id]);

  const options = {
    edit: false,
    // color:"rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Fragment>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span> ({product.numOfReviews} Reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`Rs${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input value="1" type="number" />
                <button>+</button>
              </div>
              {""}
              <button>Add to Cart</button>
            </div>
            <p>
              Status:{""}
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
            <button className="submitReview">Submit Reviews</button>
          </div>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>
      {/* {product.reviews &&
      product.reviews.map((review)=><Revi)} */}
    </Fragment>
  );
};

export default ProductDetails;