import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FireBaseContext, AuthContext } from "../../store/Context";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [Pname, setPname] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [Image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const { db, storage } = useContext(FireBaseContext);
  const date = new Date().toDateString();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // To store validation errors

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous errors
    setErrors({});

    // Validation checks
    const validationErrors = {};
    if (!Pname) {
      validationErrors.Pname = "Product name is required";
    }
    if (!Category) {
      validationErrors.Category = "Category is required";
    }
    if (!Price) {
      validationErrors.Price = "Price is required";
    }
    if (Price < 0) {
      validationErrors.Price = "please enter a valid price";
    }
    if (!Image) {
      validationErrors.Image = "Image is required";
    }
    if (Object.keys(validationErrors).length === 0) {
      const storageRef = ref(storage, `/images/${Image.name}`);
      uploadBytes(storageRef, Image).then((reference) => {
        getDownloadURL(reference.ref).then((url) => {
          addDoc(collection(db, "products"), {
            productName: Pname,
            category: Category,
            price: Price,
            url: url,
            userId: user.uid,
            createdAt: date,
          })
            .then(() => navigate("/"))
            .catch((error) => alert(error.message));
        });
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={Pname}
            onChange={(e) => setPname(e.target.value)}
            defaultValue="John"
          />
          <div className="error-message">{errors.Pname}</div>
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            defaultValue="John"
          />
          <div className="error-message">{errors.Category}</div>
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="error-message">{errors.Price}</div>
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={Image ? URL.createObjectURL(Image) : ""}
          />
          <div className="error-message">{errors.Image}</div>
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
