import startLogo from '../img/startLogo.svg';
import arrow from '../img/arrow.svg';
import '../css/startElem.css';
export default function StartElem() {
  return (
    <div className="startElem">
      <div className="rowify">
        <img src={arrow} className="arrow"></img>
        <div className="startTitle">click me to start</div>
      </div>
      <div className="container">
        <img className="logo" src={startLogo}></img>
      </div>
    </div>
  );
}
