export const followingRegistrantAction =
  (data, response, error) => async (dispatch) => {
    await fetch(
      `https://tugoserver.com/api/get-following-registrants?email=${data?.email}&id=${data?.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${data?.token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        response(data);
        dispatch({
          type: "FOLLOWING_REGISTRANT",
          payload: data,
        });
      })
      .catch((error) => {
        console.log("fetch error-----", error);
      });
  };

export const getUserAction = (data, response, error) => async (dispatch) => {
  await fetch(`https://tugoserver.com/api/get-user?email=${data?.email}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${data?.token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      response(data);
      dispatch({
        type: "GET_USERS",
        payload: data,
      });
    })
    .catch((error) => {
      alert("error====>>>", error.message);
    });
};

export const getPostRegistrant =
  (data, response, error) => async (dispatch) => {
    await fetch(
      `https://tugoserver.com/api/get-post-registrants?id=${props.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${data?.token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        for (index in data) {
          if (data[index]["id"] == user_id) {
            setRegistered(true);
          }
        }
      })
      .catch((error) => alert("error", error.message))
      .finally(() => {
        setLoadingRegistrants(false);
      });
  };

export const getPostAction = (data, response, error) => async (dispatch) => {
  await fetch(`https://tugoserver.com/api/posts/${data.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${data?.token}`,
    },
    body: data?.body,
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("patch data==>>", data);
    })
    .catch((error) => console.log(error));
};

export const getFollowingAction =
  (data, response, error) => async (dispatch) => {
    await fetch(
      `https://tugoserver.com/api/is-following?email1=${data.email1}&email2=${data.email2}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setIsFollowing(data[0] != null);
      })
      .catch((error) => {
        // alert("error", error.message);
      })
      .finally(() => {
        setLoadingIsFollowing(false);
      });
  };

export const getUserCommunityAction =
  (data, response, error) => async (dispatch) => {
    await fetch(
      `https://tugoserver.com/api/get-user-communities?email=${data?.email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${data?.token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        response(data);
        dispatch({
          type: "GET_USER_COMMUNITY",
          payload: data,
        });
      })
      .catch((error) => alert("error1111", error.message));
  };

export const getCommunityPosts =
  (data, response, error) => async (dispatch) => {
    fetch(`https://tugoserver.com/api/community-posts/${id}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        return data.length;
      })
      .catch((error) => alert("error", error.message));
  };

export const getQueryUsers = (data, response, error) => async (dispatch) => {
  fetch(`https://tugoserver.com/api/query-users?query=${data?.query}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${data?.token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      setResults(data);
    })
    .catch((error) => {
      alert("error", error.message);
    })
    .finally(() => {
      setLoadingResults(false);
    });
};

export const getRegisteredAction = (data, response, error) => (dispatch) => {
  fetch(`https://tugoserver.com/api/get-registered?id=${data?.id}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${data?.token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      response(data);
      dispatch({
        type: "GET_REGISTERED",
        payload: data,
      });
    })
    .catch((error) => {
      alert("error", error.message);
    });
};

export const getFollowingActoins =
  (data, response, error) => async (dispatch) => {
    fetch(`https://tugoserver.com/api/get-following?email=${data?.email}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${data?.token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        response(data);
        dispatch({
          type: "GET_FOLLOWING",
          payload: data,
        });
      })
      .catch((error) => {
        alert("error", error.message);
      });
  };

export const getRequestedAction =
  (data, response, error) => async (dispatch) => {
    fetch(`https://tugoserver.com/api/get-requested?email=${data?.email}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${data?.token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        response(data);
        dispatch({
          type: "GET_REQUESTED",
          payload: data,
        });
      })
      .catch((error) => {
        alert("error", error.message);
      });
  };

export const getOwnPostAction = (data, response, error) => async (dispatch) => {
  fetch(
    `https://tugoserver.com/api/get-own-posts?email=${data?.email}&tense=${data?.tense}`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${data?.token}`,
      },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      response(data);
      dispatch({
        type: "GET_OWN_POST",
        payload: data,
      });
    })
    .catch((error) => {
      alert("error", error.message);
    })
    .finally(() => {});
};

export const getFollowersAction =
  (data, response, error) => async (dispatch) => {
    fetch(`https://tugoserver.com/api/get-followers?email=${data?.email}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${data?.token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        response(data);
        dispatch({
          type: "GET_FOLLOWERS",
          payload: data,
        });
      })
      .catch((error) => {
        alert("error", error.message);
      });
  };

export const getUserPosts = (data, response, error) => async (dispatch) => {
  fetch(`https://tugoserver.com/api/get-user-posts?email=${data?.email}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${data?.token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      setPosts(data);
    })
    .catch((error) => {
      alert("error", error.message);
    })
    .finally(() => {
      setLoadingPosts(false);
    });
};

export const getSavedPosts = (data, response, error) => async (dispatch) => {
  fetch(`https://tugoserver.com/api/get-saved-posts?email=${data?.email}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${data?.token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      setPosts(data);
    })
    .catch((error) => {
      alert("error", error.message);
    })
    .finally(() => {
      setLoadingPosts(false);
    });
};

export const getCommunityPostsId =
  (data, response, error) => async (dispatch) => {
    fetch(
      `https://tugoserver.com/api/community-posts?id=${data?.id}&email=${data?.email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${data?.token}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        response(data);
        dispatch({
          type: "GET_COMMUNITY_POSTS_ID",
          payload: data,
        });
      })
      .catch((error) => alert("error", error.message));
  };

export const getUsersId = (data, response, error) => async (dispatch) => {
  await fetch(`https://tugoserver.com/api/get/users?id=${data?.poster}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${data?.token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      response(data);
      dispatch({
        type: "GET_USERS_ID",
        payload: data,
      });
      console.log("---->>>", data[0]);
    })
    .catch((error) => alert("error===>>", error.message));
};

export const getCommunityGetUser = (data, response, error) => (dispatch) => {
  fetch(
    `https://tugoserver.com/api/community-get-user?user_id=${data?.user_id}&community_id=${data?.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${data?.token}`,
      },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data.length > 0) {
        setIsMember(true);
      }
    })
    .catch((error) => alert("error", error.message))
    .finally(() => {
      setCheckingUser(false);
    });
};

export const getCommunities = (data, response, error) => (dispatch) => {
  fetch(`https://tugoserver.com/api/communities/${data?.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${data?.token}`,
    },
    body: JSON.stringify({
      users: newUsers,
      moderators: newModerators,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      response(data);
      dispatch({
        type: "GET_COMMUNITIES",
        payload: data,
      });
    })
    .catch((error) => console.log(error));
};

export const getRegisteredEvents = (data, response, error) => (dispatch) => {
  fetch(
    `https://tugoserver.com/api/get-registered-events?email=${data?.email}`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${data?.token}`,
      },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      response(data);
      dispatch({
        type: "GET_REGISTEREDEVENTS",
        payload: data,
      });
    })
    .catch((error) => {
      alert("error", error.message);
    });
};

export const getDisplayedPosts = (data, response, error) => (dispatch) => {
  fetch(
    `https://tugoserver.com/api/get-displayed-posts?latitude=${data?.latitude}&longitude=${data?.longitude}&tabName=${data?.tabName}&email=${data?.email}&offset=${data?.offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${data?.token}`,
      },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      response(data);
      dispatch({
        type: "GET_DISPLEAYEDPOSTS",
        payload: data,
      });
    })
    .catch((error) => {
      alert("error", error.message);
    })
    .finally(() => {});
};

export const getQueryCommunities = (data, response, error) => (dispatch) => {
  fetch(
    `https://tugoserver.com/api/query-communities?query=${data?.query}&latitude=${data?.latitude}&longitude=${data?.longitude}`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${data?.token}`,
      },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      setResults(data);
    })
    .catch((error) => {
      alert("error", error.message);
    })
    .finally(() => {
      setLoadingResults(false);
    });
};

export const getPostsWithOutId = (data, response, error) => (dispatch) => {
  return fetch("https://tugoserver.com/api/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${data?.token}`,
    },
    body: data?.body,
  })
    .then((resp) => resp.json())
    .then((data) => {
      response(data);
      dispatch({
        type: "GET_POSTS_WITH_OUT_ID",
        payload: data,
      });
    })
    .catch((error) => console.log("error me with id", error));
};

export const deleteUserAccount =
  (data, response, error) => async (dispatch) => {
    await fetch(`https://tugoserver.com/api/delete-user?email=${data?.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${data?.token}`,
      },
    })
      .then((resp) => {
        resp.json();
      })
      .catch((error) => console.log(error));
  };

export const usersEdit = (data, response, error) => async (dispatch) => {
  fetch(`https://tugoserver.com/api/users_edit/${data?.user}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${data?.token}`,
    },
    body: data?.body,
  })
    .then((resp) => resp.json())
    .then((data) => {
      response(data);
      dispatch({
        type: "GET_DISPLEAYEDPOSTS",
        payload: data,
      });
    })
    .catch((error) => console.log(error));
};

export const getUserPatch = (data, response, error) => async (dispatch) => {
  fetch(`https://tugoserver.com/api/users/${data?.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${data?.token}`,
    },
    body: data?.body,
  })
    .then((resp) => {
      resp.json();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      setLoadingChangeFollowing(false);
    });
};

export const getUserD = (data, response, error) => async (dispatch) => {
  await fetch(`https://tugoserver.com/api/users_d/${user["id"]}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userSession.session.key}`,
    },
    body: JSON.stringify({
      dark_mode: dark,
    }),
  })
    .then((resp) => {
      resp.json();
    })
    .catch((error) => console.log(error));
};
