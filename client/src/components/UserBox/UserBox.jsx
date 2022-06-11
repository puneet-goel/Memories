import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../../actions/user.js';
import { Link } from 'react-router-dom';
import './style.css';

const UserBox = () => {
  const profile = useSelector((state) => state.profile);
  const allUsers = useSelector((state) => state.users);
  const [searchUser, setSearchUser] = useState('');
  const dispatch = useDispatch();

  const handleFollowUser = (whomToFollow) => {
    dispatch(followUser(whomToFollow, profile));
  };

  const finalUsersToDispaly = allUsers.filter((user) => {
    const pattern = searchUser.toLowerCase().trim();
    if (pattern === '') return true;
    if (user.username.includes(pattern)) return true;
    if (user.email.includes(pattern)) return true;
    return false;
  });

  return (
    <div className="container-fluid p-0 bg-white vh-100">
      <NavBar searchText={searchUser} setSearchText={setSearchUser} />
      <div className="row m-0">
        <div className="col-1 col-sm-2 p-0" />
        <div className="col-10 col-sm-8 p-0">
          <div className="container-fluid overflow-auto p-0 users-container">
            <div className="row">
              {finalUsersToDispaly
                .filter((user) => user.username !== profile.username)
                .map((user) => (
                  <div
                    className="col-12 col-sm-6 pt-4 px-4"
                    key={user.username}
                  >
                    <div className="card text-center">
                      <img
                        src={user.profileImage.url}
                        className="card-img-top user-image"
                        alt="user profile"
                      />
                      <div className="card-body d-flex flex-column">
                        <Link to={`/profile/${user.username}`}>
                          <span className="card-title fs-5 fw-bolder">
                            @{user.username}
                          </span>
                        </Link>
                        <span className="fst-italic mb-2">{user.email}</span>
                        {(profile.following || []).includes(user.username) ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleFollowUser(user.username)}
                          >
                            UnFollow
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() => handleFollowUser(user.username)}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-1 col-sm-2 p-0" />
      </div>
    </div>
  );
};

export default UserBox;
