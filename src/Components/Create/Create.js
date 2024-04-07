import React, { Fragment, useContext, useState } from 'react';
import './Create.css'; // Make sure Create.css contains styles for .Create, .centerDiv, .input, and .uploadBtn
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../Store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Create = () => {
  const {firebase} =useContext(FirebaseContext)
  const {user} =useContext(AuthContext)
  const history = useHistory()
  const [name,setname] =useState('');
  const [category,setcategory] =useState('');
  const [price,setprice] = useState('');
  const [image,setimage] = useState(null);
  const date= new Date()
  const handlesubmit=()=>{
    try {
      if (!name || !category || !price || !image) {
        throw new Error("Please fill in all the fields.");
      }
  
      firebase.storage().ref(`/image/ ${image.name}`).put(image).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          console.log(url)
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
          })
          alert("ADD Added")
          history.push('/home')
        })
      })
    } catch (error) {
      alert(error.message);
    }
  }
  

  return (
    <Fragment>
      <Header />
      <div className="Create">
        <div className="centerDiv">
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setname(e.target.value)}
              id="name"
              name="name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setcategory(e.target.value)}
              id="category"
              name="category"
              defaultValue="Category"
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" 
            type="number"
            value={price}
            onChange={(e)=>setprice(e.target.value)}
            id="price"
             name="price" />
            <br />
            <img
              alt="select"
              width="200px"
              height="200px"
              src={image ? URL.createObjectURL(image) : ''}
            />
            <br />
            <input  onChange={(e)=>{setimage(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handlesubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
