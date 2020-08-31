/*global kakao*/
/*global Kakao*/
import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  ALBUM_REQUEST,
  ALBUM_SUCCESS,
  ALBUM_FAILURE,
  ALBUM_VIEW_REQUEST,
  ALBUM_VIEW_SUCCESS,
  ALBUM_VIEW_FAILURE,
  MSG_REQUEST,
  MSG_SUCCESS,
  MSG_FAILURE,
  MSG_WRITE_REQUEST,
  MSG_WRITE_SUCCESS,
  MSG_WRITE_FAILURE,
  KAKAO_USER_REQUEST,
  KAKAO_USER_SUCCESS,
  KAKAO_USER_FAILURE,
  MSG_REMOVE_REQUEST,
  MSG_REMOVE_SUCCESS,
  MSG_REMOVE_FAILURE,
  MSG_REWRITE_REQUEST,
  MSG_REWRITE_SUCCESS,
  MSG_REWRITE_FAILURE
} from '../reducers/invitation';
axios.defaults.withCredentials = true;
const tokenAuth = {
  usertoken : process.env.REACT_APP_TOKEN_KEY,
  userhost : process.env.REACT_APP_TOKEN_HOST,
  userid : process.env.REACT_APP_TOKEN_ID,
};
const notAccessWord = "18아,18놈,18새끼,18뇬,18노,18것,18넘,개년,개놈,개뇬,개새,개색끼,개세끼,개세이,개쉐이,개쉑,개쉽,개시키,개자식,개좆,게색기,게색끼,광뇬,뇬,눈깔,뉘미럴,니귀미,니기미,니미,도촬,되질래,뒈져라,뒈진다,디져라,디진다,디질래,병쉰,병신,뻐큐,뻑큐,뽁큐,삐리넷,새꺄,쉬발,쉬밸,쉬팔,쉽알,스패킹,스팽,시벌,시부랄,시부럴,시부리,시불,시브랄,시팍,시팔,시펄,실밸,십8,십쌔,십창,싶알,쌉년,썅놈,쌔끼,쌩쑈,썅,써벌,썩을년,쎄꺄,쎄엑,쓰바,쓰발,쓰벌,쓰팔,씨8,씨댕,씨바,씨발,씨뱅,씨봉알,씨부랄,씨부럴,씨부렁,씨부리,씨불,씨브랄,씨빠,씨빨,씨뽀랄,씨팍,씨팔,씨펄,씹,아가리,아갈이,엄창,접년,잡놈,재랄,저주글,조까,조빠,조쟁이,조지냐,조진다,조질래,존나,존니,좀물,좁년,좃,좆,좇,쥐랄,쥐롤,쥬디,지랄,지럴,지롤,지미랄,쫍빱,凸,퍽큐,뻑큐,빠큐,ㅅㅂㄹㅁ";

function* watchKakaoUser() {
  yield takeLatest(KAKAO_USER_REQUEST, requestKakaoUser);
}
function* requestKakaoUser(action) {
  try {
    const result = yield call(KakaoUserAPI, action.data);
    yield put({
      type : KAKAO_USER_SUCCESS,
      data : result.properties
    });
  }
  catch(e) {
    yield put({
      type : KAKAO_USER_FAILURE
    });
  }
};
function KakaoUserAPI() {
  return Kakao.API.request({
    url: '/v2/user/me'
  })
}

function* watchAlbum() {
  yield takeLatest(ALBUM_REQUEST, requestAlbum);
};
function* requestAlbum(action) {
  try {
    const result = yield call(albumAPI, action.data);
    yield put({
      type : ALBUM_SUCCESS,
      data : result.data
    });
  }
  catch(e) {
    yield put({
      type : ALBUM_FAILURE
    });
  }
};
function albumAPI(view_data) {
  return axios.post(`/invitation/album/`, {
    tokenAuth,
    imgData : view_data
  }, {
    withCredentials: true, // 프런트서버와 백엔드 서버 모두 쿠키교환 가능하도록 설정
  });
};

function* watchViewAlbum() {
  yield takeLatest(ALBUM_VIEW_REQUEST, requestViewAlbum);
}
function* requestViewAlbum(action) {
  try {
    const result = yield call(albumViewAPI, action.data);
    yield put({
      type : ALBUM_VIEW_SUCCESS,
      data : result.data
    });
  }
  catch(e) {
    yield put({
      type : ALBUM_VIEW_FAILURE
    });
  }
};
function albumViewAPI(view_data) {
  return axios.post(`/invitation/album/view`, {
    tokenAuth,
    imgData : view_data
  }, {
    withCredentials: true, // 프런트서버와 백엔드 서버 모두 쿠키교환 가능하도록 설정
  });
}

function* watchMsg() {
  yield takeLatest(MSG_REQUEST, requestMsg);
}
function* requestMsg(action) {
  try {
    const result = yield call(msgAPI, action.data);
    yield put({
      type : MSG_SUCCESS,
      data : result.data
    });
  }
  catch(e) {
    yield put({
      type : MSG_FAILURE
    });
  }
}
function msgAPI(msg_data) {
  return axios.post(`/invitation/msg/${msg_data.wr_id}/${msg_data.count}`, {
    tokenAuth
  }, {
    withCredentials: true, // 프런트서버와 백엔드 서버 모두 쿠키교환 가능하도록 설정
  });
}

function* watchMsgWrite() {
  yield takeLatest(MSG_WRITE_REQUEST, requestMsgWrite);
}
function* requestMsgWrite(action) {
  const { comment } = action.data;
  const notWordArr = notAccessWord.split(',');
  let post;
  for (let i = 0; i < notWordArr.length; i++) {
    if (comment.indexOf(notWordArr[i]) > -1) {
      post = false;
      break;
    } else {
      post = true;
    }
  }
  if (post) {
    try {
      const result = yield call(msgAPIWrite, action.data);
      yield put({
        type : MSG_WRITE_SUCCESS,
        data : result.data
      });
    }
    catch(e) {
      yield put({
        type : MSG_WRITE_FAILURE
      });
    }
  } else {
    yield put({
      type : MSG_WRITE_FAILURE
    });
    alert("금지된 단어가 포함되어 있습니다.")
  }
}
function msgAPIWrite(msg_data) {
  return axios.post(`/invitation/mag/write/upload`, {
    msg_data,
    tokenAuth
  }, {
    withCredentials: true, // 프런트서버와 백엔드 서버 모두 쿠키교환 가능하도록 설정
  });
}

function* watchMsgRewrite() {
  yield takeLatest(MSG_REWRITE_REQUEST, requestMsgRewrite);
}
function* requestMsgRewrite(action) {
  const { comment } = action.data;
  const notWordArr = notAccessWord.split(',');
  let post;
  for (let i = 0; i < notWordArr.length; i++) {
    if (comment.indexOf(notWordArr[i]) > -1) {
      post = false;
      break;
    } else {
      post = true;
    }
  }
  if (post) {
    try {
      const result = yield call(msgAPIRewrite, action.data);
      yield put({
        type : MSG_REWRITE_SUCCESS,
        data : result.data
      });
    }
    catch(e) {
      yield put({
        type : MSG_REWRITE_FAILURE
      });
    }
  } else {
    yield put({
      type : MSG_REWRITE_FAILURE
    });
    alert("금지된 단어가 포함되어 있습니다.")
  }
}
function msgAPIRewrite(msg_data) {
  return axios.post(`/invitation/mag/write/update`, {
    msg_data,
    tokenAuth
  }, {
    withCredentials: true, // 프런트서버와 백엔드 서버 모두 쿠키교환 가능하도록 설정
  });
}

function* watchMsgRemove() {
  yield takeLatest(MSG_REMOVE_REQUEST, requestMsgRemove);
}
function* requestMsgRemove(action) {
  try {
    const result = yield call(msgAPIRemove, action.data);
    yield put({
      type : MSG_REMOVE_SUCCESS,
      data : result.data
    });
  }
  catch(e) {
    yield put({
      type : MSG_REMOVE_FAILURE
    });
  }
}
function msgAPIRemove(msg_data) {
  return axios.post(`/invitation/remove`, {
    msg_data,
    tokenAuth
  }, {
    withCredentials: true, // 프런트서버와 백엔드 서버 모두 쿠키교환 가능하도록 설정
  });
}

export default function* user() {
  yield all([
    fork(watchAlbum),
    fork(watchViewAlbum),
    fork(watchMsg),
    fork(watchMsgWrite),
    fork(watchKakaoUser),
    fork(watchMsgRewrite),
    fork(watchMsgRemove),
  ]);
};