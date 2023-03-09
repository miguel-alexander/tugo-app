const initialState = {
  followingReg: [],
  getUsers: [],
  getPostRegistrant: [],
  getPost: [],
  getUserCommunity: [],
  getCommunityPosts: [],
  getQueryUsers: [],
  getRegistered: [],
  getFollowers: [],
  getRequested: [],
  getCommunityPostsId: [],
  getUserD : [],
  getUserPatch : [],
  usersEdit:[],
  deleteUserAccount:[],
  getPostsWithOutId:[],
  getQueryCommunities:[],
  getDisplayedPosts:[],
  getRegisteredEvents:[],
  getCommunities:[],
  getCommunityGetUser:[],
  getUsersId:[],
  getSavedPosts:[],
  getOwnPostAction:[],
  getFollowing:[],
  FOLLOWING_REGISTRANT:[],
  dark : false
  
};

const allReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case "MOBILE_MODE":
      return {
        ...state,
        dark: actions.payload,
      };
    case "FOLLOWING_REGISTRANT":
      return {
        ...state,
        followingRegistrant: actions.payload,
      };
    case "FOLLOWING_REGISTRATION":
      return {
        ...state,
        followingReg: actions.payload,
      };
    case "GET_USERS":
      return {
        ...state,
        getUsers: actions.payload,
      };
    case "GET_POST_REGISTRANT":
      return {
        ...state,
        getPostRegistrant: actions.payload,
      };
    case "GET_POST":
      return {
        ...state,
        getPost: actions.payload,
      };
    case "GET_FOLLOWING":
      return {
        ...state,
        getFollowing: actions.payload,
      };
    case "GET_USER_COMMUNITY":
      return {
        ...state,
        getUserCommunity: actions.payload,
      };
    case "GET_COMMUNITY_POSTS":
      return {
        ...state,
        getCommunityPosts: actions.payload,
      };
    case "GET_QUERY_USERS":
      return {
        ...state,
        getQueryUsers: actions.payload,
      };
    case "GET_REGISTERED":
      return {
        ...state,
        getRegistered: actions.payload,
      };
    case "GET_FOLLOWERS":
      return {
        ...state,
        getFollowers: actions.payload,
      };
    case "GET_REQUESTED":
      return {
        ...state,
        getRequested: actions.payload,
      };
    case "GET_COMMUNITY_POSTS_ID":
      return {
        ...state,
        getCommunityPostsId: actions.payload,
      };

    case "GET_OWN_POST":
      return {
        ...state,
        getOwnPostAction: actions.payload,
      };
    case "GET_SAVE_POSTS":
      return {
        ...state,
        getSavedPosts: actions.payload,
      };
    case "GET_USERS_ID":
      return {
        ...state,
        getUsersId: actions.payload,
      };
    case "GET_COMMUNITY_GET_USER":
      return {
        ...state,
        getCommunityGetUser: actions.payload,
      };
    case "GET_COMMUNITIES":
      return {
        ...state,
        getCommunities: actions.payload,
      };
    case "GET_REGISTEREDEVENTS":
      return {
        ...state,
        getRegisteredEvents: actions.payload,
      };
    case "GET_DISPLEAYEDPOSTS":
      return {
        ...state,
        getDisplayedPosts: actions.payload,
      };
    case "GET_QUERY_COMMUNITIES":
      return {
        ...state,
        getQueryCommunities: actions.payload,
      };
    case "GET_POSTS_WITH_OUT_ID":
      return {
        ...state,
        getPostsWithOutId: actions.payload,
      };
    case "DELETE_USER_ACCOUNT":
      return {
        ...state,
        deleteUserAccount: actions.payload,
      };
    case "USER_EDIT":
      return {
        ...state,
        usersEdit: actions.payload,
      };
    case "GET_USER_PATCH":
      return {
        ...state,
        getUserPatch: actions.payload,
      };
    case "GET_USER_D":
      return {
        ...state,
        getUserD: actions.payload,
      };

    default:
      return state;
  }
};

export default allReducers;
