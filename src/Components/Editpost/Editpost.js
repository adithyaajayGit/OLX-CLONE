import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../Store/Context';
import { useHistory, useParams } from 'react-router-dom';
import './Editpost.css'; // Make sure Editpost.css contains styles for .edit-post-container, .input-container, .input, and .upload-btn

function Editpost() {
  const { firebase } = useContext(FirebaseContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState(''); // State for image URL
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      history.push('/productview'); // Redirect if id is not provided
    } else {
      firebase.firestore().collection('products').doc(id).get().then((snapshot) => {
        const data = snapshot.data();
        if (data) {
          setName(data.name || '');
          setCategory(data.category || '');
          setPrice(data.price || '');
          setUrl(data.url || ''); // Set URL if available
        } else {
          history.push('/productview'); // Redirect if product with id is not found
        }
      }).catch((error) => {
        console.error('Error getting document:', error);
        // Handle error, e.g., show error message to the user
      });
    }
  }, [firebase, history, id]);

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setUrl(URL.createObjectURL(file)); // Set URL file when input changes
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productRef = firebase.firestore().collection('products').doc(id);
      let imageUrl = url ? await uploadImageToStorage(url) + `?${new Date().getTime()}` : null;

      await productRef.update({
        name,
        category,
        price,
        url: imageUrl, // Update URL field with new URL or null
        // Update other fields as needed
      });

      setLoading(false);
      history.push('/productview'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating document:', error);
      setLoading(false);
      // Handle error, e.g., show error message to the user
    }
  };

  const uploadImageToStorage = async (imageFile) => {
    try {
      const imageRef = firebase.storage().ref(`image/${imageFile.name}`);
      await imageRef.put(imageFile);
      return await imageRef.getDownloadURL();
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error, e.g., show error message to the user
      return null; // Return null if image upload fails
    }
  };

  return (
    <div className="edit-post-container">
      <h1>Edit AD</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="input-container">
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>

        <div className="input-container">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div className="input-container">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} accept="image/*" className="upload-btn" />
        </div>

        <button type="submit" disabled={loading}>Update</button>
      </form>
      <br></br>
      {url && <img className="displayimage" src={url} />} {/* Display updated image */}
    </div>
  );
}

export default Editpost;
