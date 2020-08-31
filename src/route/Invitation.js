/*global Kakao*/
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import { FaPhoneAlt, FaMapMarker, FaSubway, FaBus, FaCarAlt, FaCommentDots, FaSearch } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";

import Modal from 'react-modal';
import Slider from "react-slick";

import { useInput, kakaoMapInit, kakaoNavInit } from "../utils/untils"; 
import { ALBUM_REQUEST, MSG_REQUEST, MSG_WRITE_REQUEST, KAKAO_USER_REQUEST, MSG_REMOVE_REQUEST, MSG_MODIFY_CONFIRM, MSG_REWRITE_REQUEST, ALBUM_MODALS, ALBUM_VIEW_REQUEST } from '../reducers/invitation';

import '../css/invitation.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import mainImg from '../img/invitation/main_img.jpg';
import introImg from '../img/invitation/intro_img.jpg';
import kakaoBtns from '../img/invitation/kakao_logins.png';
import caricature1 from '../img/invitation/caricature1.png';
import caricatureCate1 from '../img/invitation/caricatureCate1.jpg';
import caricature2 from '../img/invitation/caricature2.png';
import caricatureCate2 from '../img/invitation/caricatureCate2.jpg';
import phoneNumTitle1 from '../img/invitation/phoneNumTitle1.jpg';
import phoneNumTitle2 from '../img/invitation/phoneNumTitle2.jpg';
import albumTitle from '../img/invitation/albumTitle.png';
import mapTitle from '../img/invitation/mapTitle.png';
import msgTitle from '../img/invitation/msgTitle.png';

const hosts = process.env.REACT_APP_PRODUCTION === 'production' ? 'http://dvnode.gabia.io' : 'http://localhost:5000'

const Invitation = () => {
  const [ msgOpen, setMsgOpen ] = useState(false);
  const [ navHeight, setNavHeight ] = useState(0);
  const { kakaoUser } = useSelector(state => state.invitation);
  const dispatch = useDispatch();
  const scrollEvents = () => {
    const htmlEl = document.querySelector("html");
    const navEl = document.getElementById('invitation_nav');
    const htmlPos = htmlEl.scrollTop;
    if (htmlPos <= 0) {
      navEl.style.top = "-100%";
    } else {
      navActive(htmlPos);
      navEl.style.top = 0;
    }
  };
  let targetNum = '';
  const navActive = (nowPos) => {
    const targetArr = document.getElementsByClassName('navTarget');
    const browserHarf = window.innerHeight / 2;
    let posArr = [];
    for (let i = 0; i < targetArr.length; i++) {
      posArr[i] = i === 0 ? targetArr[i].offsetTop : targetArr[i].offsetTop - browserHarf ;
      document.getElementsByClassName("navItems")[i].style.background = "transparent" 
    };
    if (nowPos >= posArr[0] && nowPos < posArr[1]) {
      targetNum = 0;
      setMsgOpen(false);
    }
    if (nowPos >= posArr[1] && nowPos < posArr[2]) {
      targetNum = 1;
      setMsgOpen(false);
    }
    if (nowPos >= posArr[2] && nowPos < posArr[3]) {
      targetNum = 2;
      setMsgOpen(false);
    }
    if (nowPos >= posArr[3]) {
      targetNum = 3;
      document.getElementById('mapControls').classList.remove('on');
      if (!msgOpen) {
        setMsgOpen(true);
      }  
    }
    document.getElementsByClassName("navItems")[targetNum].style.background = "rgba(0,0,0,0.8)";
  };
  document.addEventListener("scroll", scrollEvents);
  const getNavHeight = () => {
    const navEl = document.getElementById('invitation_nav');
    const navOffsetHeight = navEl.offsetHeight;
    return navOffsetHeight;
  };
  useEffect(() => {
    if (navHeight === 0) {
      setNavHeight(getNavHeight());
    }
    if (!kakaoUser) {
      dispatch({
        type : KAKAO_USER_REQUEST
      })
    }
  },[]);
  return (
    <article id="main-conts" className="text-center">
      <Helmet>
        <title>정인호♡박은지의 결혼식에 초대합니다.</title>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap" rel="stylesheet"></link>
      </Helmet>
      <InvitationNavs />
      <section id="main_sections" className="navTarget"> 
        <MDBContainer>
          <img src={mainImg} alt="wedding" />
        </MDBContainer>
      </section>
      <section id="invitation_txt" className="pt-5 pb-5">
        <MDBContainer className="pt-4 pb-4">
          <img src={introImg} alt="intro" />
        </MDBContainer>
      </section>
      <section id="phoneNum" className="pb-5">
        <MDBContainer>
          <div id="phoneNumConts">
            <MDBCol size="6">
              <div>
                <div className="caricatures">
                  <img src={caricature1} alt="신랑" />
                </div>
                <div className="weddingName mt-4">
                  <span>
                    <img src={caricatureCate1} alt="" />
                  </span>
                  <span className="ml-2">정인호</span>
                </div>
                <div className="weddingPhone mt-4">
                  <div className="pr-3">
                    <a href="tel:01075744639">
                      <FaPhoneAlt />
                    </a>
                  </div>
                  <div className="pl-3">
                    <a href="sms:01075744639">
                      <GoMail />
                    </a>
                  </div>
                </div>
              </div>
            </MDBCol>
            <MDBCol size="6">
              <div>
                <div className="caricatures">
                  <img src={caricature2} alt="신부" />
                </div>
                <div className="weddingName mt-4">
                  <span>
                    <img src={caricatureCate2} alt="" />
                  </span>
                  <span className="ml-2">박은지</span>
                </div>
                <div className="weddingPhone mt-4">
                  <div className="pr-3">
                    <a href="tel:01099006327">
                      <FaPhoneAlt />
                    </a>
                  </div>
                  <div className="pl-3">
                    <a href="sms:01099006327">
                      <GoMail />
                    </a>
                  </div>
                </div>
              </div>
            </MDBCol>
          </div>
        </MDBContainer>
      </section>
      <section id="familyNum" className="pb-5">
        <MDBContainer>
          <div id="familyNumConts">
            <div className="familyNumItems">
              <div>
                <p className="weddingCamp">
                  <img src={phoneNumTitle1} alt="신랑측 혼주" />
                </p>
                <div className="mt-2 mb-2">
                  <p className="phoneNames">
                    <span className="mr-2 weddingPos greenColor">아버지</span>
                    <span className="weddingName">정강민</span>
                  </p>
                </div>
                <div className="familyPhoneIconWrapper">
                  <div className="mr-4">
                    <a href="tel:01090526204" className="phoneIcons greenColor">
                      <FaPhoneAlt />
                    </a>
                  </div>
                  <div>
                    <a href="sms:01090526204" className="phoneIcons greenBg">
                      <GoMail />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-2">
                  <p className="phoneNames">
                    <span className="mr-2 weddingPos greenColor">어머니</span>
                    <span className="weddingName">이지연</span>
                  </p>
                </div>
                <div className="familyPhoneIconWrapper">
                  <div className="mr-4">
                    <a href="tel:01087864061" className="phoneIcons greenColor">
                      <FaPhoneAlt />
                    </a>
                  </div>
                  <div>
                    <a href="sms:01087864061" className="phoneIcons greenBg">
                      <GoMail />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="familyNumItems">
              <div>
                <p className="weddingCamp">
                  <img src={phoneNumTitle2} alt="신부측 혼주" />
                </p>
                <div className="mt-2 mb-2">
                  <p className="phoneNames">
                    <span className="mr-2 weddingPos pinkColor">아버지</span>
                    <span className="weddingName">박문순</span>
                  </p>
                </div>
                <div className="familyPhoneIconWrapper">
                  <div className="mr-4">
                    <a href="tel:01067516327" className="phoneIcons pinkColor">
                      <FaPhoneAlt />
                    </a>
                  </div>
                  <div>
                    <a href="sms:01067516327" className="phoneIcons pinkBg">
                      <GoMail />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-2">
                  <p className="phoneNames">
                    <span className="mr-2 weddingPos pinkColor">어머니</span>
                    <span className="weddingName">홍성실</span>
                  </p>
                </div>
                <div className="familyPhoneIconWrapper">
                  <div className="mr-4">
                    <a href="tel:01089086327" className="phoneIcons pinkColor">
                      <FaPhoneAlt />
                    </a>
                  </div>
                  <div>
                    <a href="sms:01089086327" className="phoneIcons pinkBg">
                      <GoMail />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MDBContainer>
      </section>
      <Albums />
      <Navigator />
      <Massages open={msgOpen} />
      {
        kakaoUser
        ?
        <Shares />
        :
        ''
      }
      <AlbumView />
    </article>
  );
};
const InvitationNavs = () => {
  const navsConts = [
    {
      title : "HOME",
      target : "main_sections"
    },
    {
      title : "PHOTO",
      target : "albums"
    },
    {
      title : "MAP",
      target : "weddingMaps"
    },
    {
      title : "MESSAGE",
      target : "msgArea"
    }
  ];
  const scrollMove = (target) => {
    let targetPos = document.getElementById(target).offsetTop;
    window.scrollTo({top:targetPos, behavior:'smooth'});
  };
  return (
    <section id="invitation_nav">
      <MDBRow>
      {navsConts.map((conts, i) => {
        return (
          <MDBCol size="3" key={i} className='navListItems'>
            <button className='navItems' onClick={() => scrollMove(conts.target)}>{conts.title}</button>
          </MDBCol>
        )
      })}
      </MDBRow>
    </section>
  )
};
const Albums = () => {
  const { album_list, albumCount, albumPage, albumLoaded } = useSelector(state => state.invitation);
  let page = albumCount;
  const dispatch = useDispatch();
  const moreView = useCallback(() => {
    if (albumPage > page) {
      page ++;
      dispatch({
        type : ALBUM_REQUEST,
        data : {
          wr_id:"1",
          count:page
        }
      })
    } else {
      alert("마지막 페이지입니다.");
    }
  });
  const albumView = useCallback((i) => {
    dispatch({
      type : ALBUM_MODALS,
      data : {
        albumViews : true,
        albumIndex : i
      }
    })
  })
  useEffect(() => {
    dispatch({ 
      type : ALBUM_REQUEST,
      data : {
        wr_id:"1",
        count : 1
      }
    })
  }, []);
  return (
    <section id="albums" className="pt-5 pb-5 navTarget">
      <MDBContainer>
        <h2 className="mb-4">
          <img src={albumTitle} alt="앨범" />
        </h2>
        <MDBRow>
          {
            albumLoaded 
            ?
            album_list.length > 0
            ?
            album_list.map((img, i) => {
              return (
                <MDBCol size="4" key={i} className="albumItems">
                  <button onClick={() => albumView(img.file_index)}>
                    <img src={hosts+img.file_path} alt="wedding album"/>
                  </button>
                </MDBCol>
              )
            })
            :
            <MDBCol size="12">
              업로드된 앨범 이미지가 없습니다.
            </MDBCol>
            :
            <div className="loadLayer">
              <div className="loader_img">
                <VscLoading />
              </div>
            </div>
          }
        </MDBRow>
        <div className="mt-4">
          <button id="albumAdd" onClick={() => moreView()}><FaAngleDown /></button>
        </div>
      </MDBContainer>
    </section>
  )
};
const AlbumView = () => {
  const { albumView, albumIndex, viewAlbum_list } = useSelector(state => state.invitation);
  const dispatch = useDispatch();
  const closeModal = useCallback(() => {
    dispatch({ 
      type:ALBUM_MODALS,
      data : {
        albumViews : false,
        albumIndex : 0
      }
    })
  });
  const settings = {
    dots: false,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide:albumIndex,
  };
  useEffect(() => {
    if (albumView) {
      dispatch({
        type : ALBUM_VIEW_REQUEST,
        data : {
          wr_id : 2
        }
      })
    }
  }, [albumView])
  return (
    <Modal
      isOpen={albumView}
      contentLabel="wedding album modal"
      ariaHideApp={false}
      closeTimeoutMS={500}
      id="album_modals"
    >
      <div id="albumConts">
        <div id="albumViewHeader">
          <div id="albumViewNav">
            <h3>PHOTO</h3>
            <div>
              <button onClick={() => closeModal()}>
                <AiOutlineClose />
              </button>  
            </div>
          </div>
        </div>
        <div id="albumViewLists">
          <Slider {...settings}>
            {
              viewAlbum_list.map((imgs, i) => {
                return (
                  <div className="albumViewItems" key={i}>
                    <img src={hosts+imgs.file_path} alt="weddings"/>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
      <div id="modalBg" onClick={() => closeModal()}></div>
    </Modal>
  );
};
const Navigator = () => {
  let is_Mobile;
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  is_Mobile = isMobile();
  useEffect(() => {
    kakaoMapInit("maps")
  }, []);
  
  const naverNavInit = () => {
    window.open('//map.naver.com/?menu=location&pinType=place&lat=37.549331&lng=126.668133&title=인천아시아드웨딩컨벤션')
  }
  const fadeLayout = () => {
    document.getElementById('mapControls').classList.add('on');
  }
  return (
    <section id="weddingMaps" className="pt-5 pb-5 navTarget">
      <MDBContainer>
        <div id="mapsConts" className="pt-4">
          <h2 className="mb-5">
            <img src={mapTitle} alt="오시는 길" />
          </h2>
          <MDBRow className="justify-content-center mb-3">
            <div className="ml-4 mr-4">
              <button type="button" id="naverMapsBtn" className="mapBtns" onClick={() => naverNavInit()}>
                <div>
                  <FaMapMarker className='markerIcons' />
                </div>
                <p>네이버</p>
              </button>
            </div>
            <div className="ml-4 mr-4">
              <button type="button" id="kakaoMapsBtn" className="mapBtns" onClick={() => kakaoNavInit(is_Mobile)}>
                <div>
                  <FaMapMarker className='markerIcons' />
                </div>
                <p>카카오</p>
              </button>
            </div>
          </MDBRow>
          <div id="mapInit">
            <div id="mapWrapper">
              <div id="maps"></div>
              <div id="mapControls">
                <div id="mapFadeOutBtn">
                  <MDBBtn color="pink" onClick={() => fadeLayout()}>
                    <FaSearch />
                    <span>자세히보기</span>
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </section>
  )
};
const Massages = (props) => {
  const { msg_list, msgAdded, msgCount, msgPage, msgLoader } = useSelector(state => state.invitation);
  const dispatch = useDispatch();
  let count = msgCount; 
  const addMsgList = useCallback(() => {
    if (msgPage > count) {
      count ++;
      dispatch({
        type : MSG_REQUEST,
        data : {
          wr_id:"1",
          count:count
        }
      })
    } else {
      alert("마지막 페이지입니다.");
    }
  });
  useEffect(() => {
    dispatch({
      type : MSG_REQUEST,
      data : {
        wr_id:"1",
        count:1
      }
    })
  }, [msgAdded]);
  return (
    <section id="msgArea" className="pb-5 navTarget">
      {
        msgLoader
        ?
        <div>
          <MDBContainer id="msgListContainer" className="pt-5">
            <div id="msgListConts">
              <h2 className="mb-5">
                <img src={msgTitle} alt="축하 메세지" />
              </h2>
              <div id="msgLists">
              {
                msg_list.length > 0
                ?
                <MassageItems list={msg_list} />
                :
                <div id="emptyMsg">
                  <div>
                    <p>작성된 메세지가 없습니다.</p>
                    <p>신랑, 신부에게 메세지를 남겨주세요</p>
                  </div>
                </div>
              }
              </div>
              <div className="mt-4">
                <button id="addMsgBtn" onClick={() => addMsgList()}><FaAngleDown /></button>
              </div>
            </div>
          </MDBContainer>
          <MsgWriter open={props.open} />
        </div>
        :
        <div className="loadLayer">
          <div className="loader_img">
            <VscLoading />
          </div>
        </div>
      }
    </section>
  );
};
const MsgWriter = (props) => {
  const { kakaoUser, msgAdded, kakaoLogingIn } = useSelector(state => state.invitation);
  const [ msg, onChageMsg, setMsg ] = useInput('');
  const dispatch = useDispatch();
  const msgWrite = useCallback((e) => {
    e.preventDefault();
    if (!msg || !msg.trim()) {
      return alert("축하 메세지를 작성해주세요!");
    }
    let writeConfirm = window.confirm("메세지를 남기시겠습니까?");
    if (writeConfirm) {
      dispatch({
        type : MSG_WRITE_REQUEST,
        data : {
          comment : msg,
          wr_name : kakaoUser.nickname ,
          wr_id : document.getElementById('wr_id').value,
          wr_thumbs : kakaoUser.thumbnail_image
        }
      }, []);
    } else {
      alert("취소되었습니다.");
      setMsg('')
    }
  });
  const kakaoLoginInit = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        dispatch({
          type : KAKAO_USER_REQUEST
        })
      },
      fail: function (err) {
        console.log(JSON.stringify(err));
      }
    });
  };
  useEffect(() => {
    if (msgAdded) {
      setMsg('');
    }
  }, [msgAdded])
  return (
    <div>
    {
      props.open
      ?
      <div id="writeWiget">
        <MDBContainer>
        {
          kakaoUser
          ?
          <form onSubmit={msgWrite}>
            <input type="hidden" name="wr_id" id="wr_id" value="1" />
            <input type="hidden" name="wr_name" value={kakaoUser.nickname} />
            <input type="hidden" name="wr_thubms" value={kakaoUser.thumbnail_image} />
            <div id="msgBox">
              <div id="writerBox">
                <div id="thumbnail_wrapper">
                  <img id="wr_thumbnail" src={kakaoUser.thumbnail_image} alt={kakaoUser.nickname} />
                </div>
                <div>
                  <span id="wr_nick">{kakaoUser.nickname}</span>
                </div>
              </div>
              <div id="msgMemoBox">
                <textarea id="msgText" value={msg} onChange={onChageMsg} placeholder="신랑, 신부에게 축하 메세지를 남겨주세요"></textarea>
              </div>
              <div id="msgSubmit">
                <MDBBtn type="submit" color="pink">작성</MDBBtn>
              </div>
            </div>
          </form>
          :
          kakaoLogingIn
          ?
          <button id="kakaoLoginsBtn" onClick={() => kakaoLoginInit()}>
            <div id="msgBox">
              <div id="kakaoLoginSubmit">
                <img src={kakaoBtns} alt='카카오 로그인' />
              </div>
              <div id="msgMemoBox">
                <textarea id="loginmsgText" disabled placeholder="카카오 로그인 해주세요."></textarea>
              </div>
            </div>
          </button>
          :
          <div className="loadLayer">
            <div className="loader_img">
              <VscLoading />
            </div>
          </div>
        }
        </MDBContainer>
      </div>
      :
      ''
    }
    </div>
  )
};
const MassageItems = (props) => {
  const { kakaoUser, msgMd } = useSelector(state => state.invitation);
  const { list } = props;
  const dispatch = useDispatch();
  const msgRemove = useCallback((id, wr_id) =>{
    let removeConfirm = window.confirm('메세지를 삭제하시겠습니까?');
    if (removeConfirm) {
      dispatch({
        type : MSG_REMOVE_REQUEST,
        data : {
          id,
          wr_id
        }
      })
    };
  });
  const msgModify = useCallback((lists) => {
    dispatch({
      type : MSG_MODIFY_CONFIRM,
      data : {
        open : true,
        data : lists
      }
    }, [msgMd.open === false])
  });
  return (
    <div>
      <div>
      {
        list.map((lists, i) => {
          return (
            <div key={i} className="msgListItems">
              <div className="msgListWriter">
                <div className="msgListWriter">
                  <span className="msgListThumbs">
                    <img className="msgListThumbImgs" src={lists.wr_thumbs ? lists.wr_thumbs : 'http://dvisign.com/main_portfolio/img/logo/nav_logo.png'} alt={lists.wr_name} />
                  </span>
                  <span className="msgListWriterName">{lists.wr_name}</span>
                  {
                    lists.new_date
                    ?
                    <span className="msgListNewIcons"><FaCommentDots /></span>
                    :
                    ''
                  }
                  {
                    kakaoUser === null
                    ?
                    ''
                    :
                    kakaoUser.nickname === lists.wr_name && kakaoUser.thumbnail_image === lists.wr_thumbs
                    ?
                    <span>
                      <button className="msgMdBtns" onClick={() => msgModify(lists)}>수정</button>
                      <button className="msgMdBtns" onClick={() => msgRemove(lists.id, lists.wr_id)}>삭제</button>
                    </span>
                    :
                    ''
                  }
                </div>
                <div className="msgListWrDatetime">
                  <span>{lists.wr_datetime}</span>
                </div>
              </div>
              <p className="msgListComments">{lists.comment}</p>
            </div>
          )
        })
      }
      </div>
      {
        msgMd.open
        ?
        <MassageModify />
        :
        ''
      }
    </div>
  );
};
const MassageModify = () => {
  const { msgMd, kakaoUser } = useSelector(state => state.invitation);
  const [ msg , onChageMsg, setMsg ] = useInput(msgMd.data.comment);
  const dispatch = useDispatch();
  const msgCloseMd = useCallback(() => {
    dispatch({
      type : MSG_MODIFY_CONFIRM,
      data : {
        open : false,
        data : {}
      }
    }, [msgMd.open === true])
  });
  const msgWrite = useCallback((e) => {
    e.preventDefault();
    if (!msg || !msg.trim()) {
      return alert("축하 메세지를 작성해주세요!");
    }
    let writeConfirm = window.confirm("메세지를 수정하시겠습니까?");
    if (writeConfirm) {
      dispatch({
        type : MSG_REWRITE_REQUEST,
        data : {
          id:msgMd.data.id,
          comment : msg,
          wr_name : msgMd.data.wr_name,
          wr_id : msgMd.data.wr_id,
          wr_thumbs : msgMd.data.wr_thumbs,
          loginUser : kakaoUser
        }
      }, []);
    } else {
      alert("취소되었습니다.");
      msgCloseMd();
    }
  });
  return (
    <div id="msgModifys">
      <MDBContainer>
        <div id="msgMdWrapper">
          <div id="msgMdConts">
            <form onSubmit={msgWrite}>
              <div id="md_writer_wrapper" className="mb-4">
                <div id="md_wr_thumbs">
                  <img id="md_wr_imgs" src={msgMd.data.wr_thumbs} alt={msgMd.data.wr_name} />
                </div>
                <div id="md_wr_names">
                  <p>{msgMd.data.wr_name}</p>
                </div>
              </div>
              <div id="md_comment_wrapper">
                <textarea name='md_comment' id='md_comment' value={msg} onChange={onChageMsg} placeholder="신랑, 신부에게 축하 메세지를 남겨주세요." />
              </div>
              <div id="md_submit_wrapper">
                <MDBBtn color='warning' onClick={() => msgCloseMd()}>취소</MDBBtn>
                <MDBBtn type="submit" color="pink">수정</MDBBtn>
              </div>
            </form>
          </div>
        </div>
      </MDBContainer>
      <div id="msgMdBg"></div>
    </div>
  );
};
const Shares = () => {
  const onSendLink = useCallback(() => {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '제목은 뭘로할꺼유?',
        description: '',
        imageUrl: 'http://dvnode.gabia.io/storage/invitation_thumb.jpg',
        link: {
          mobileWebUrl: 'http://dvisign-react.com/invitation',
          webUrl: 'http://dvisign-react.com/invitation'
        },
        imageWidth: 800,
        imageHeight: 800
      },
      buttons: [{
        title: '버튼제목은 뭘로할꺼유?',
        link: {
          mobileWebUrl: 'http://dvisign-react.com/invitation',
          webUrl: 'http://dvisign-react.com/invitation'
        }
      }, ]
    });
  });
  return (
    <section id="share_section" className="pt-5 pb-5">
      <MDBContainer>
        <button id="kakaoShereBtn" onClick={() => onSendLink()}>카카오톡 공유하기</button>
      </MDBContainer>
    </section>
  );
};
export default Invitation;