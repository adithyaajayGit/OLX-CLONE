import React,{useState,useEffect,useContext} from 'react';

import './Productview.css';
import { AuthContext, FirebaseContext } from '../../Store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Productview() {
const {firebase} =useContext(FirebaseContext)
const [products,setproducts] = useState([])
const [editedProduct, setEditedProduct] = useState(null)
const {user} = useContext(AuthContext)
const history = useHistory()


useEffect(()=>{
    if (user){
  firebase.firestore().collection('products').where('userId', '==', user.uid).get().then((snapshot)=>{

    const allpost = snapshot.docs.map((product)=>{
          return {
            ...product.data(),
            id:product.id
          }
    })
    setproducts(allpost)
  })
}

},[firebase, user])


const editProduct = (productId) => {
    const edited = products.find((product) => product.id === productId);
    setEditedProduct(edited);
    // Redirect to the edit page or show a modal for editing
    history.push(`/editpost/${productId}`);
  };


const deleteProduct = (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      firebase.firestore().collection('products').doc(productId).delete().then(() => {
        // Remove the deleted product from the state
        setproducts(products.filter((product) => product.id !== productId));
      }).catch((error) => {
        console.error('Error removing document: ', error);
      });
    }
  };


  return (
    <div className="postParentDiv">
      <div className="moreView">
        
        <div className="cards">


        { products.map (product=>{
           return(
            <div className="card">
            <div className="favorite">
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9;{product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
            <div className="buttons">
                <button className="edit-btn" onClick={()=>{editProduct(product.id)}}>Edit</button>
                <button className="delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>

          </div>
           )
        })
          
          
        }

        </div>
      </div>
      
    </div>
  );
}

export default Productview;

