import React, { useEffect, useState } from 'react';
import './users.css';

const Users = ({ users, error }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  useEffect(() => {
    // Reset filtered users when the users prop changes
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page when searching

    if (searchTerm.trim() !== "") {
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(user.user_id).includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    } else {
      // If the search term is empty, display all users
      setFilteredUsers(users);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="search-wrapper">
        {/* Include your search input here, you can use the same SearchBar component or create a new one */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div className="users-container" key={index}>
              <span className="pro">{user.role}</span>
              <div className="search-wrapper">
                <img src={user.image_link} alt={user.username} />
              </div>
              <h3>{user.username}</h3>
              <h6>Email: {user.email}</h6>
              <h6>Phone: {user.phone}</h6>
              <h6>Address: {user.address}</h6>
              <h6>User Id: {user.user_id}</h6>
            </div>
          ))
        ) : (
          <p>No matching users found.</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn-9">
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn-9">
          Next
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Users;
// import React, { useEffect, useState } from 'react';
// import './users.css';

// const Users = ({ users, error }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState([]);

//   useEffect(() => {
//     // Reset filtered users when the users prop changes
//     setFilteredUsers(users);
//   }, [users]);

//   const handleSearch = (searchTerm) => {
//     setSearchTerm(searchTerm);
//     if (searchTerm.trim() !== "") {
//       const filteredUsers = users.filter((user) =>
//         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         String(user.user_id).includes(searchTerm.toLowerCase()) ||
//         user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.address.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredUsers(filteredUsers);
//     } else {
//       // If the search term is empty, display all users
//       setFilteredUsers(users);
//     }
//   };

//   return (
//     <div>
//       <div className="search-wrapper">
//         {/* Include your search input here, you can use the same SearchBar component or create a new one */}
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchTerm}
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user, index) => (
//             <div className="users-container" key={index}>
//               <span className="pro">{user.role}</span>
//               <div className="search-wrapper">
//                 <img src={user.image_link} alt={user.username} />
//               </div>
//               <h3>{user.username}</h3>
//               <h6>Email: {user.email}</h6>
//               <h6>Phone: {user.phone}</h6>
//               <h6>Address: {user.address}</h6>
//               <h6>User Id: {user.user_id}</h6>
//               <label className='online'>
//                 <input type="checkbox" id={`online-status-${index}`} />
//                 <span>Online</span>
//               </label>
//             </div>
//           ))
//         ) : (
//           <p>No matching users found.</p>
//         )}
//       </div>
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default Users;

