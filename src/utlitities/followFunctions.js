import { React, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

// const [loadingChangeFollowing, setLoadingChangeFollowing] = useState(true);
// let loadingChangeFollowing = useRef(true);

const changeFollowing = (new_following_list, id) => {
  const userSession = useSelector((state) => state.userReducer);
  // setLoadingChangeFollowing(false);
  // loadingChangeFollowing = false;
  fetch(`https://tugoserver.com/api/get/users?id=${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userSession.session.key}`,
    },
    body: JSON.stringify({
      following_list: new_following_list,
    }),
  })
    .then((resp) => {
      resp.json();
      // setLoadingChangeFollowing(true);
      // loadingChangeFollowing = true;
    })
    .catch((error) => console.log(error));
};

// const [loadingChangeFollowers, setLoadingChangeFollowers] = useState(true);
// let loadingChangeFollowers = useRef(true);

const changeFollowers = (new_followers_list, id) => {
  // setLoadingChangeFollowers(false);
  // loadingChangeFollowers = false;
  fetch(`https://tugoserver.com/api/get/users?id=${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userSession.session.key}`,
    },
    body: JSON.stringify({
      followers_list: new_followers_list,
    }),
  })
    .then((resp) => {
      resp.json();
      // setLoadingChangeFollowers(true);
      // loadingChangeFollowers = true;
    })
    .catch((error) => console.log(error));
};

// const [loadingChangeRequestsReceived, setLoadingChangeRequestsReceived] =
//   useState(true);

// let loadingChangeRequestsReceived = useRef(true);

const changeRequestsReceived = (new_requested_to_follow_list, id) => {
  // setLoadingChangeRequestsReceived(false);
  // loadingChangeRequestsReceived = false;
  fetch(`https://tugoserver.com/api/get/users?id=${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userSession.session.key}`,
    },
    body: JSON.stringify({
      requested_to_follow_list: new_requested_to_follow_list,
    }),
  })
    .then((resp) => {
      resp.json();
      // setLoadingChangeRequestsReceived(true);
      // loadingChangeRequestsReceived = true;
    })
    .catch((error) => console.log(error));
};

// const [loadingChangeRequestsSent, setLoadingChangeRequestsSent] =
//   useState(true);

// let loadingChangeRequestsSent = useRef(true);

const changeRequestsSent = (new_outgoing_request_list, id) => {
  // setLoadingChangeRequestsSent(false);
  // loadingChangeRequestsSent = false;
  fetch(`https://tugoserver.com/api/get/users?id=${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userSession.session.key}`,
    },
    body: JSON.stringify({
      outgoing_request_list: new_outgoing_request_list,
    }),
  })
    .then((resp) => {
      resp.json();
      // setLoadingChangeRequestsSent(true);
      // loadingChangeRequestsSent = true;
    })
    .catch((error) => console.log(error));
};

export const isOk = () => {
  console.log("testing");
  // return (
  //   loadingChangeFollowers &&
  //   loadingChangeFollowing &&
  //   loadingChangeRequestsReceived &&
  //   loadingChangeRequestsSent
  // );
  // console.log(
  //   loadingChangeFollowers &&
  //     loadingChangeFollowing &&
  //     loadingChangeRequestsReceived &&
  //     loadingChangeRequestsSent
  // );
  // return true;
};

export const follow = (user, loggedInUser, isPublic) => {
  // setLoadingChangeRequestsSent(false);
  // setLoadingChangeFollowers(false);
  // setLoadingChangeRequestsReceived(false);
  // setLoadingChangeRequestsSent(false);

  if (isPublic) {
    following_list = loggedInUser["following_list"];
    index = following_list.indexOf(user["id"]);
    if (index <= -1) {
      // only add when item is not found
      following_list.push(user["id"]);
    }
    changeFollowing(following_list, loggedInUser["id"]);
    // changeFollowing(following_list, loggedInUser["id"]);

    followers_list = user["followers_list"];
    index = followers_list.indexOf(loggedInUser["id"]);
    if (index <= -1) {
      // only add when item is not found
      followers_list.push(loggedInUser["id"]);
    }
    changeFollowers(followers_list, user["id"]);
    // changeFollowers(followers_list, user["id"]);
  } else {
    console.log("yay");
    requested_to_follow_list = user["requested_to_follow_list"];
    index = requested_to_follow_list.indexOf(loggedInUser["id"]);
    if (index <= -1) {
      // only add when item is not found
      requested_to_follow_list.push(loggedInUser["id"]);
    }
    console.log(requested_to_follow_list);
    // changeRequestsReceived(requested_to_follow_list, user["id"]);
    changeRequestsReceived(requested_to_follow_list, user["id"]);

    outgoing_request_list = loggedInUser["outgoing_request_list"];
    index = outgoing_request_list.indexOf(user["id"]);
    if (index <= -1) {
      // only add when item is not found
      outgoing_request_list.push(user["id"]);
    }
    changeRequestsSent(outgoing_request_list, loggedInUser["id"]);
    // changeRequestsSent(outgoing_request_list, loggedInUser["id"]);
  }

  // if (twice) {
  //   changeRequestsSent(outgoing_request_list, user["id"]);
  //   changeRequestsSent(outgoing_request_list, user["id"]);
  // }

  // changeRequestsSent(outgoing_request_list, user["id"]);

  // if (!loadingChangeRequestsSent) setLoadingChangeRequestsSent(true);
  // if (!loadingChangeFollowing) setLoadingChangeFollowing(true);
  // if (!loadingChangeFollowers) setLoadingChangeFollowers(true);
  // if (!loadingChangeRequestsReceived) setLoadingChangeRequestsReceived(true);
};

export const unfollow = (user, loggedInUser) => {
  // setLoadingChangeRequestsSent(false);
  // setLoadingChangeFollowers(false);
  // setLoadingChangeRequestsReceived(false);
  // setLoadingChangeRequestsSent(false);

  following_list = loggedInUser["following_list"];
  index = following_list.indexOf(user["id"]);
  if (index > -1) {
    // only splice array when item is found
    following_list.splice(index, 1); // 2nd parameter means remove one item only
  }
  // changeFollowing(following_list, loggedInUser["id"]);
  changeFollowing(following_list, loggedInUser["id"]);

  followers_list = user["followers_list"];
  index = followers_list.indexOf(loggedInUser["id"]);
  if (index > -1) {
    // only splice array when item is found
    followers_list.splice(index, 1); // 2nd parameter means remove one item only
  }
  // changeFollowers(followers_list, user["id"]);
  changeFollowers(followers_list, user["id"]);

  // changeRequestsSent(outgoing_request_list, user["id"]);
  // if (twice) changeRequestsSent(outgoing_request_list, user["id"]);

  // if (!loadingChangeRequestsSent) setLoadingChangeRequestsSent(true);
  // if (!loadingChangeFollowing) setLoadingChangeFollowing(true);
  // if (!loadingChangeFollowers) setLoadingChangeFollowers(true);
  // if (!loadingChangeRequestsReceived) setLoadingChangeRequestsReceived(true);
};

export const unrequest = (user, loggedInUser, twice) => {
  // setLoadingChangeRequestsSent(false);
  // setLoadingChangeFollowers(false);
  // setLoadingChangeRequestsReceived(false);
  // setLoadingChangeRequestsSent(false);

  requested_to_follow_list = loggedInUser["requested_to_follow_list"];
  index = requested_to_follow_list.indexOf(user["id"]);
  if (index > -1) {
    // only splice array when item is found
    requested_to_follow_list.splice(index, 1); // 2nd parameter means remove one item only
  }
  // if (twice)
  //   changeRequestsReceived(requested_to_follow_list, loggedInUser["id"]);
  changeRequestsReceived(requested_to_follow_list, loggedInUser["id"]);

  outgoing_request_list = user["outgoing_request_list"];
  index = outgoing_request_list.indexOf(loggedInUser["id"]);
  if (index > -1) {
    // only splice array when item is found
    outgoing_request_list.splice(index, 1); // 2nd parameter means remove one item only
  }
  // if (twice) {
  //   changeRequestsSent(outgoing_request_list, user["id"]);
  //   changeRequestsSent(outgoing_request_list, user["id"]);
  // }
  changeRequestsSent(outgoing_request_list, user["id"]);

  // if (!loadingChangeRequestsSent) setLoadingChangeRequestsSent(true);
  // if (!loadingChangeFollowing) setLoadingChangeFollowing(true);
  // if (!loadingChangeFollowers) setLoadingChangeFollowers(true);
  // if (!loadingChangeRequestsReceived) setLoadingChangeRequestsReceived(true);
};

export const acceptRequest = (user, loggedInUser) => {
  // setLoadingChangeRequestsSent(false);
  // setLoadingChangeFollowers(false);
  // setLoadingChangeRequestsReceived(false);
  // setLoadingChangeRequestsSent(false);

  unrequest(user, loggedInUser, false);
  follow(loggedInUser, user, true);

  // if (!loadingChangeRequestsSent) setLoadingChangeRequestsSent(true);
  // if (!loadingChangeFollowing) setLoadingChangeFollowing(true);
  // if (!loadingChangeFollowers) setLoadingChangeFollowers(true);
  // if (!loadingChangeRequestsReceived) setLoadingChangeRequestsReceived(true);
};
