import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/Context';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails, setPostDetails } = useContext(PostContext) || {};
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (!postDetails) {
      const storedPostDetails = JSON.parse(localStorage.getItem('postDetails'));
      if (storedPostDetails) {
        setPostDetails(storedPostDetails);
      }
    }
  }, [postDetails, setPostDetails]);

  useEffect(() => {
    if (postDetails && postDetails.userId) {
      const { userId } = postDetails;
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
        res.forEach(doc => {
          setUserDetails(doc.data());
        });
      });
    }
  }, [firebase, postDetails]);

  // Persist postDetails to local storage
  useEffect(() => {
    localStorage.setItem('postDetails', JSON.stringify(postDetails));
  }, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails ? postDetails.url : ''}
          alt="image"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <h5 style={{ textDecoration: 'underline' }}>Product details</h5>
          {postDetails && (
            <>
              <h3>&#x20B9; {postDetails.price} </h3>
              <span>Name- {postDetails.name}</span>
              <p>category - {postDetails.category}</p>
              <span>Posted at- {postDetails.createdAt}</span>
            </>
          )}
        </div>
        {userDetails && (
          <div className="contactDetails">
            <h5 style={{ textDecoration: 'underline' }}>Seller details</h5>
            <p>Name- {userDetails.username}</p>
            <p>Mob No - {userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
