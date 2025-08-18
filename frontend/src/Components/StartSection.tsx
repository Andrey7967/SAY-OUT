import '../css/startSection.css';
import BluredLogo from '../img/startLogo.svg';
import arrow from '../img/arrow.svg';
export default function StartSection() {
  return (
    <div className="startSection">
      <div className="rowify movedTitle">
        <img className="arrow" src={arrow}></img>
        <div className="p64 seldomFont centerTitle ">click me to start</div>
      </div>
      <div className="tapes">
        <div className="tapeCont ">
          <div className="tape">
            <div className="p96 seldomFont movTitle ">
              start to message! start to message! start to message! start to
              message! start to message! start to message!
            </div>
          </div>
        </div>
        <div className="tapeCont ">
          <div className="tapeR">
            <div className="p96 seldomFont movTitle ">
              start to message! start to message! start to message! start to
              message! start to message! start to message!
            </div>
          </div>
        </div>
      </div>
      <img className="startLogo" src={BluredLogo}></img>
      <div className="tapes">
        <div className="tapeCont ">
          <div className="tape">
            <div className="p96 seldomFont movTitle ">
              start to message! start to message! start to message! start to
              message! start to message! start to message!
            </div>
          </div>
        </div>
        <div className="tapeCont ">
          <div className="tapeR">
            <div className="p96 seldomFont movTitle ">
              start to message! start to message! start to message! start to
              message! start to message! start to message!
            </div>
          </div>
        </div>

        <div className="tapeCont ">
          <div className="tape">
            <div className="p96 seldomFont movTitle ">
              start to message! start to message! start to message! start to
              message! start to message! start to message!
            </div>
          </div>
        </div>
        <div className="tapeCont ">
          <div className="tapeR">
            <div className="p96 seldomFont movTitle ">
              start to message! start to message! start to message! start to
              message! start to message! start to message!
            </div>
          </div>
        </div>

        <div className="tapeCont ">
          <div className="tape">
            <div className="p96 seldomFont movTitle ">
              start to message! start to message! start to message! start to
              message! start to message! start to message!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
