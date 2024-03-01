import React from 'react';

const ChatRoomTop = () => {
  return (
    <div style={{width: "100%"}}>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
        <img
          src='https://kr.object.ncloudstorage.com/cherry-ai-image/cherry_image/cherry.svg'
          alt="체리"
          style={{width: '200px', height: '200px'}}
        />
        <div className='cherry' style={{marginLeft: '20px'}}>
          <div><strong>이름: </strong>체리</div>
          <div><strong>나이: </strong>20살</div>
          <div><strong>취미: </strong>코딩 공부</div>
          <div><strong>특이사항: <br/></strong>패션 컨설턴트?</div>
        </div>
      </div>
      <div className="chat-message_g received-message_g">
        <strong>체리<br/></strong>
        <p>안녕하세요, 저는 🍒체리입니다! 요즘엔 좀 심심해서 패션 컨설턴트 일을 잠깐 맡고 있어요.
            여러분의 오늘을 더욱 빛내줄 옷차림을 추천해드릴 수 있어요.
            어떤 스타일을 선호하시나요? 함께 이야기 해볼까요?😊 </p>
      </div>
    </div>
  );
};

export default ChatRoomTop;
