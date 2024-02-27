import React, { useState, useEffect } from 'react';
import './userprofile.css';

const UserProfile = ({ userId }) => {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/admin/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          console.error('Server Error:', response.statusText);
          setError('Error fetching user details. Please try again.');
        }
      } catch (error) {
        console.error('Client Error:', error);
        setError('Error fetching user details. Please try again.');
      }
    };

    fetchUserDetails();
  }, [userId]);



  return (
    <div className='cardy'>
    <div className="card-container">
      <span className="pro">{userDetails.role}</span>
      <div className="search-wrapper">
          <img src={userDetails.image_link} alt={userDetails.username}/>
      </div>
      <h3>{userDetails.username}</h3>
      <h6>Email: {userDetails.email}</h6>
      <h6>Phone: {userDetails.phone}</h6>
      <h6>Address: {userDetails.address}</h6>
      {error && <p className="error-message">{error}</p>}
      <label className='online'>
        <input type="checkbox" id="online-status" />
        <span>Online</span>
      </label>
    </div>
    </div>
  );
};

export default UserProfile;


// import React, { useState, useEffect } from 'react';
// import './userprofile.css';

// const UserProfile = ({ userId }) => {
//     const [userDetails, setUserDetails] = useState({});
//     const [file, setFile] = useState(null);
//     const [displayImage, setDisplayImage] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch(`/get_user/${userId}`)
//             .then(response => response.json())
//             .then(data => {
//                 setUserDetails(data);
//                 setDisplayImage(data.image_link !== null);
//             })
//             .catch(error => {
//                 console.error('Error fetching user details:', error);
//                 setError('Error fetching user details. Please try again.');
//             });
//     }, [userId]);

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         //const confirmation = window.confirm("Are you sure you want to change your profile photo?");
//         if (selectedFile) {
//             setFile(selectedFile);
//             setDisplayImage(true);

//             const formData = new FormData();
//             formData.append('image', selectedFile);
            

//             // If the user already has an image, update it; otherwise, upload a new one.
//             const updateEndpoint = userDetails.image_link
//                 ? `/update_user/${userId}`
//                 : `/upload_user_image/${userId}`;

//             fetch(updateEndpoint, {
//                 method: 'PATCH',  // or 'POST' if you're creating a new image
//                 body: formData,
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data.message);
//                     // Update UI for successful upload
//                     setUserDetails(prevDetails => ({ ...prevDetails, image_link: data.updatedImageUrl }));
//                 })
//                 .catch(error => {
//                     console.error('Error updating image:', error);
//                     setError('Error updating image. Please try again.');
//                 });
//         }
//     };

//     const handleEmptyPhotoClick = () => {
//         // Trigger file input click
//         document.getElementById('file-input').click();
//     };

//     const getFirstLetter = () => {
//         return userDetails.username ? userDetails.username.charAt(0).toUpperCase() : '';
//     };

//     return (
//         <div className="card-container">
//             <span className="pro">{userDetails.role}</span>
//             <div className="search-wrapper">
//                 <label className="camera">
//                     <input id="file-input" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
//                     {displayImage ? (
//                         <div>
//                             <img src={userDetails.image_link} alt="Profile" onClick={() => setDisplayImage(false)} />
//                         </div>
//                     ) : (
//                         <div className="empty-photo" onClick={handleEmptyPhotoClick}>
//                             {file ? (
//                                 <img src={URL.createObjectURL(file)} alt="Profile" />
//                             ) : (
//                                 <div className="initial">{getFirstLetter()}</div>
//                             )}
//                         </div>
//                     )}
//                 </label>
//             </div>
//             <h3>{userDetails.username}</h3>
//             <h6>Email: {userDetails.email}</h6>
//             <h6>Phone: {userDetails.phone}</h6>
//             {error && <p className="error-message">{error}</p>}
//             <label className='online'>
//                 <input type="checkbox" id="online-status" />
//                 <span>Online</span>
//             </label>
//         </div>
//     );
// };

// export default UserProfile;



// import React, { useState, useEffect } from 'react';
// import './userprofile.css';

// const UserProfile = ({ userId }) => {
//     const [userDetails, setUserDetails] = useState({});
//     const [file, setFile] = useState(null);
//     const [displayImage, setDisplayImage] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch(`/get_user/${userId}`)
//             .then(response => response.json())
//             .then(data => {
//                 setUserDetails(data);
//                 setDisplayImage(data.image_link !== null);
//             })
//             .catch(error => {
//                 console.error('Error fetching user details:', error);
//                 setError('Error fetching user details. Please try again.');
//             });
//     }, [userId]);

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//             setDisplayImage(true);

//             const formData = new FormData();
//             formData.append('image_link', selectedFile);

//             const updateEndpoint = `/update_user/${userId}`;

//             fetch(updateEndpoint, {
//                 method: 'PATCH',
//                 body: formData,
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data.message);
//                     setUserDetails(prevDetails => ({ ...prevDetails, image_link: data.updatedUserDetails.image_link }));
//                 })
//                 .catch(error => {
//                     console.error('Error updating image:', error);
//                     setError('Error updating image. Please try again.');
//                 });
//         }
//     };

//     const handleEmptyPhotoClick = () => {
//         document.getElementById('file-input').click();
//     };

//     const getFirstLetter = () => {
//         return userDetails && userDetails.username ? userDetails.username.charAt(0).toUpperCase() : '';
//     };

//     return (
//         <div className="card-container">
//             <span className="pro">{userDetails.role}</span>
//             <div className="search-wrapper">
//                 <label className="camera">
//                     <input id="file-input" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
//                     {displayImage ? (
//                         <div>
//                             {userDetails.image_link && (
//                                 <img src={userDetails.image_link} alt="Profile" onClick={() => setDisplayImage(false)} />
//                             )}
//                         </div>
//                     ) : (
//                         <div className="empty-photo" onClick={handleEmptyPhotoClick}>
//                             {file ? (
//                                 <img src={URL.createObjectURL(file)} alt="Profile" />
//                             ) : (
//                                 <div className="initial">{getFirstLetter()}</div>
//                             )}
//                         </div>
//                     )}
//                 </label>
//             </div>
//             <h3>{userDetails.username}</h3>
//             <h6>Email: {userDetails.email}</h6>
//             <h6>Phone: {userDetails.phone}</h6>
//             {error && <p className="error-message">{error}</p>}
//             <label className='online'>
//                 <input type="checkbox" id="online-status" />
//                 <span>Online</span>
//             </label>
//         </div>
//     );
// };

// export default UserProfile