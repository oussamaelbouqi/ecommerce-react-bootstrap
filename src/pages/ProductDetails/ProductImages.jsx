
function ProductImages( {product} ) {
  return (

               <div className="col-lg-6 col-md-6 col-12">
                 <div className="imgs-items">
                   <div className="big-img">
                     <img
                       id="big-img"
                       src={product.images[0]}
                       alt={product.title}
                       className="img-fluid"
                     />
                   </div>
   
                   <div className="sm-img">
                     {product.images.map((img, index) => (
                      <div className='img-div-sm ' key={index}>
                       <img
                         src={img}
                         alt={product.title}
                         className="img-fluid"
                         onClick={() =>
                           (document.getElementById("big-img").src = img)
                         }
                       />
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
  )
}

export default ProductImages
