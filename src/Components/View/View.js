import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../Store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { PostContext } from '../../Store/PostContext';

function Editproduct() {
  const { firebase } = useContext(FirebaseContext);
  const { postDetails, setPostDetails } = useContext(PostContext);
  const history = useHistory();
  const [editedProduct, setEditedProduct] = useState({});
  const [image, setImage] = useState(null); // State for uploaded image

  useEffect(() => {
    // Fetch product details if not already in context
    if (!postDetails.id) {
      const fetchProductDetails = async () => {
        try {
          const productDoc = await firebase.firestore().collection('products').doc(postDetails.id).get();
          if (productDoc.exists) {
            const productData = productDoc.data();
            setPostDetails({ id: postDetails.id, ...productData });
            setEditedProduct(productData);
          } else {
            console.log('Product not found');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };

      fetchProductDetails();
    } else {
      setEditedProduct(postDetails);
    }
  }, [firebase, postDetails, setPostDetails]);

  const handleSaveEdit = async () => {
    // Upload new image if provided
    if (image) {
      try {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`image/${postDetails.id}`);
        await imageRef.put(image);
        const imageUrl = await imageRef.getDownloadURL();
        await firebase.firestore().collection('products').doc(postDetails.id).update({
          name: editedProduct.name,
          price: editedProduct.price,
          category: editedProduct.category,
          imageUrl: imageUrl, // Update image URL in Firestore
        });
        history.push('/productview'); // Navigate back to the product view page after saving
      } catch (error) {
        console.error('Error updating product with image:', error);
      }
    } else {
      // If no new image provided, update other details only
      try {
        await firebase.firestore().collection('products').doc(postDetails.id).update({
          name: editedProduct.name,
          price: editedProduct.price,
          category: editedProduct.category,
        });
        history.push('/productview'); // Navigate back to the product view page after saving
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="editProductContainer">
      <h2>Edit Product</h2>
      <input
        type="text"
        value={editedProduct.name || ''}
        onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
      />
      <input
        type="number"
        value={editedProduct.price || ''}
        onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
      />
      <input
        type="text"
        value={editedProduct.category || ''}
        onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSaveEdit}>Save</button>
    </div>
  );
}

export default Editproduct;
