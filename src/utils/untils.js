/*global kakao*/
/*global Kakao*/
import { useState, useCallback } from 'react';

export const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
}
export const kakaoMapInit = (target) => {
  kakao.maps.load(() => {
    let container = document.getElementById(target);
    let options = {
      center: new kakao.maps.LatLng(37.549331, 126.668133),
      level: 5
    };
    const map = new window.kakao.maps.Map(container, options);
    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(
      37.549331,
      126.668133
    );

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  });
};
export const kakaoNavInit = (is_Mobile) => {
  if (!is_Mobile) {
    window.open('http://kko.to/6SUZ6GzDo',"PopupWin", "width=1160, height=600");
  } else {
    try {
      Kakao.Navi.start({
        name: "인천아시아드웨딩컨벤션",
        x: 126.668133,
        y: 37.549331,
        coordType: 'wgs84'
      });
    }
    catch(e) {
      alert("알수없는 오류가 발생했습니다.")
    }
  }
};