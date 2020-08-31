export const initailState = {
  album_list : [],
  viewAlbum_list : [],
  msg_list : [],
  kakaoUser : null,
  kakaoLogingIn : false, 
  msgLoader:false,
  msgAdded : true,
  msgCount : 0,
  msgPage : 1,
  msgMd : {
    open : false,
    data : {}
  },
  albumLoaded : false,
  albumCount : 0,
  albumPage : 1,
  albumView : false,
  albumIndex : 0
};

export const ALBUM_REQUEST = 'ALBUM_REQUEST';
export const ALBUM_SUCCESS = 'ALBUM_SUCCESS';
export const ALBUM_FAILURE = 'ALBUM_FAILURE';

export const ALBUM_VIEW_REQUEST = 'ALBUM_VIEW_REQUEST';
export const ALBUM_VIEW_SUCCESS = 'ALBUM_VIEW_SUCCESS';
export const ALBUM_VIEW_FAILURE = 'ALBUM_VIEW_FAILURE';

export const ALBUM_MODALS = 'ALBUM_MODALS';

export const MSG_REQUEST = 'MSG_REQUEST';
export const MSG_SUCCESS = 'MSG_SUCCESS';
export const MSG_FAILURE = 'MSG_FAILURE';

export const MSG_WRITE_REQUEST = 'MSG_WRITE_REQUEST';
export const MSG_WRITE_SUCCESS = 'MSG_WRITE_SUCCESS';
export const MSG_WRITE_FAILURE = 'MSG_WRITE_FAILURE';

export const MSG_REMOVE_REQUEST = 'MSG_REMOVE_REQUEST';
export const MSG_REMOVE_SUCCESS = 'MSG_REMOVE_SUCCESS';
export const MSG_REMOVE_FAILURE = 'MSG_REMOVE_FAILURE';

export const MSG_REWRITE_REQUEST = 'MSG_REWRITE_REQUEST';
export const MSG_REWRITE_SUCCESS = 'MSG_REWRITE_SUCCESS';
export const MSG_REWRITE_FAILURE = 'MSG_REWRITE_FAILURE';

export const KAKAO_USER_REQUEST = "KAKAO_USER_REQUEST";
export const KAKAO_USER_SUCCESS = "KAKAO_USER_SUCCESS";
export const KAKAO_USER_FAILURE = "KAKAO_USER_FAILURE";

export const MSG_MODIFY_CONFIRM = "MSG_MODIFY_CONFIRM";

const reducer = (state = initailState, action) => {
  switch(action.type) {
    case KAKAO_USER_REQUEST : {
      return {
        ...state,
        kakaoLogingIn : false, 
      }
    }
    case KAKAO_USER_SUCCESS : {
      return {
        ...state,
        kakaoLogingIn : true, 
        kakaoUser : action.data
      }
    }
    case KAKAO_USER_FAILURE : {
      return {
        ...state,
        kakaoLogingIn : true, 
      }
    }
    case ALBUM_REQUEST : {
      return {
        ...state,
        albumLoaded : false,
        albumCount : action.data.count
      }
    }
    case ALBUM_SUCCESS : {
      return {
        ...state,
        albumLoaded : true,
        album_list : action.data.list,
        albumPage : action.data.maxPage
      }
    }
    case ALBUM_FAILURE : {
      return {
        ...state,
        albumLoaded : false
      }
    }
    case ALBUM_VIEW_REQUEST : {
      return {
        ...state,
        albumLoaded : false,
      }
    }
    case ALBUM_VIEW_SUCCESS : {
      return {
        ...state,
        albumLoaded : true,
        viewAlbum_list : action.data
      }
    }
    case ALBUM_VIEW_FAILURE : {
      return {
        ...state,
        albumLoaded : false,
      }
    }
    case ALBUM_MODALS : {
      return {
        ...state,
        albumView : action.data.albumViews,
        albumIndex : action.data.albumIndex
      }
    }
    case MSG_REQUEST : {
      return {
        ...state,
        msgLoader : false,
        msgCount : action.data.count
      }
    }
    case MSG_SUCCESS : {
      return {
        ...state,
        msgLoader : true,
        msg_list : action.data.list,
        msgPage : action.data.maxPage
      }
    }
    case MSG_FAILURE : {
      return {
        ...state,
        msgLoader : false,
        msgCount : 0
      }
    }
    case MSG_WRITE_REQUEST : {
      return {
        ...state,
        msgAdded : false
      }
    }
    case MSG_WRITE_SUCCESS : {
      if (action.data.msg) {
        alert("메세지가 작성되었습니다.");
      }
      return {
        ...state,
        msgAdded : true
      }
    }
    case MSG_WRITE_FAILURE : {
      return {
        ...state,
      }
    }
    case MSG_REMOVE_REQUEST : {
      return {
        ...state,
        msgAdded : false,
      }
    }
    case MSG_REMOVE_SUCCESS : {
      if (action.data.removed) {
        alert("삭제 되었습니다.");
      }
      return {
        ...state,
        msgAdded : true,
      }
    }
    case MSG_REMOVE_FAILURE : {
      return {
        ...state,
      }
    }
    case MSG_MODIFY_CONFIRM : {
      return {
        ...state,
        msgMd : action.data
      }
    }
    case MSG_REWRITE_REQUEST : {
      return {
        ...state,
        msgAdded : false,
        msgMd : {
          open : false,
          data : {}
        }
      }
    }
    case MSG_REWRITE_SUCCESS : {
      alert(action.data.msg_update);
      return {
        ...state,
        msgAdded : true,
        msgMd : {
          open : false,
          data : {}
        }
      }
    }
    case MSG_REWRITE_FAILURE : {
      return {
        ...state,
        msgMd : {
          open : false,
          data : {}
        }
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer;