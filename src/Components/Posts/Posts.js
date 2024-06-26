import React,{useState,useEffect,useContext} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Posts() {
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

},[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <button onClick={()=>{history.push('/viewmore')}}>View more</button>
        </div>
        <div className="cards">


        { products.slice(5, 10).map (product=>{
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
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

        { products.slice(0, 5).map (product=>{
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

export default Posts;
