import React,{useState,useEffect,useContext} from 'react';

import Heart from '../../assets/Heart';
import './Viewmore.css';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Viewmore() {
const {firebase} =useContext(FirebaseContext)
const [products,setproducts] = useState([])
const {setPostDetails} = useContext(PostContext)
const history = useHistory()


useEffect(()=>{
  firebase.firestore().collection('products').get().then((snapshot)=>{

    const allpost = snapshot.docs.map((product)=>{
          return {
            ...product.data(),
            id:product.id
          }
    })
    setproducts(allpost)
  })

},[firebase])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        
        <div className="cards">


        { products.map (product=>{
           return(
            <div className="card"  onClick={()=>{
              setPostDetails(product)
              history.push('/viewPost');
            }}>
            <div className="favorite">
              <Heart></Heart>
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
          </div>
           )
        })
          
          
        }

        </div>
      </div>
      
    </div>
  );
}

export default Viewmore;
