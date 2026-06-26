import "./ProductDetails.css";

function ProductDetailsLoading() {
  return (
    <div className="Loading-Item">
      <div className="item-details">
        <div className="container">
          <div className="row align-items-start">
            {/* Images Section */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="imgs-items skeltion "></div>
            </div>

            {/* Details Section */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="details-item">
                <h5 className="loading-textDetailsItem skeltion"></h5>
                <h5 className="loading-textDetailsItem skeltion"></h5>
                <h5 className="loading-textDetailsItem skeltion"></h5>
                <h5 className="loading-textDetailsItem skeltion"></h5>
                <h5 className="loading-textDetailsItem skeltion"></h5>
                <h5 className="loading-textDetailsItem skeltion"></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsLoading;
