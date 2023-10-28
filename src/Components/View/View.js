import React, { useContext, useEffect, useState } from "react";
import { getDoc, collection,doc, where, query, getDocs } from "firebase/firestore";
import { postContext } from "../../store/PostContext";
import { FireBaseContext } from "../../store/Context";
import "./View.css";
function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(postContext);
  const { db } = useContext(FireBaseContext);

  useEffect(()=>{
    const userQuery = query(collection(db,'users'),where('id','==',postDetails&&postDetails.userId))
    getDocs(userQuery).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data())
      })
    })
  },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails&&postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        {postDetails&&<div className="productDetails">
          <p>&#x20B9; {postDetails.price}  </p>
          <span>{postDetails.productName}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>}
        {userDetails&&<div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.profileName}</p>
          <p>{userDetails.phoneNumber}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
