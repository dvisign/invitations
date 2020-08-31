import React from 'react';

const LoadingCss = {
  "background":"rgba(255,255,255,0.5)",
  "color":"#fff",
  "position":"fixed",
  "width":"100%",
  "height":"100vh",
  "left":"0",
  "top":"0"
}
const Loading = () => {
  return (
    <div style={LoadingCss}>
      로딩중
    </div>
  )
};

export default Loading;