import React, { useEffect, useContext, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FireBaseContext } from "../../store/Context";
import { postContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [products, setProducts] = useState([]);
  const { db } = useContext(FireBaseContext);
  const {setPostDetails} = useContext(postContext)
  const navigate = useNavigate()
  useEffect(() => {
    getDocs(collection(db, "products")).then((data) => {
      const allPost = data.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(allPost);
    });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div onClick={()=>{
                setPostDetails(product)
                navigate('/viewPost')
                }} className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.productName}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
   
    </div>
  );
}

export default Posts;
