import './App.css';
import mainImg from './image/17.jpg';
import mainImg2 from './image/4.jpg';

function App() {
  return (
    <div className="App">
      <img src={mainImg} style={{width:'650px'}} alt=""/>
      <h1><b>스프링부트 + 리액트 CI/CD 성공기원 !! 카리나의 응원 얍 </b></h1>
      <img src={mainImg2} style={{width:'650px'}} alt=""/>
        <h1>짝짝 성공입니다!</h1>
    </div>
  );
}

export default App;
