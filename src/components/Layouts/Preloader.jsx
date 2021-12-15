// import StylesElem from "../../css/Preloader.module.css";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import StylesElem from "../../css/PreloaderCircle.module.css";


// import MeetupsContext from "../../store/meetUpsState";
function Preloader({ t }) {
  const loadingConfig = useSelector(state => state.appConfig.loading)
  //   // const AllMeetups = useContext(MeetupsContext);
  return (
    <div>
      {!!loadingConfig.status ? (
      <div className={StylesElem["preloader-body"]}>
        <div className={StylesElem["animation-container"]}>
          {/* <div className={StylesElem["circle-body"]}></div> */}
          <div className={StylesElem.circleMain}></div>
          <div className={StylesElem.circleOne}></div>
          <div className={StylesElem.circleTwo}></div>
          <div className={StylesElem.circleThree}></div>
          {/* <div className={StylesElem["main-point"]}/>
          <div className={StylesElem["server-point"]}></div>
          <div className={`${StylesElem["data-point"]} ${StylesElem["data-point-one"]}`}/>
          <div className={`${StylesElem["data-point"]} ${StylesElem["data-point-two"]}`}/>
          <div className={`${StylesElem["data-point"]} ${StylesElem["data-point-tree"]}`}/> */}
        </div>
        <div className={StylesElem["preloader"]}>
        {t(loadingConfig.message)}
        </div>
      </div>
      ) : null}
    </div>
  );
}

export default withNamespaces()(Preloader);

// import React, { Component } from "react";
// import { connect, useSelector } from "react-redux";

// class Preloader extends Component {
//   render() {
//     return (
//       <div>
//         {/* {!!AllMeetups.loaded.status ? ( */}
//         <div className={StylesElem["preloader-body"]}>
//           <div className={StylesElem["animation-container"]}>
//             {/* <div className={StylesElem["circle-body"]}></div> */}
//             <div className={StylesElem.circleMain}></div>
//             <div className={StylesElem.circleOne}></div>
//             <div className={StylesElem.circleTwo}></div>
//             <div className={StylesElem.circleThree}></div>
//             {/* <div className={StylesElem["main-point"]}/>
//                  <div className={StylesElem["server-point"]}></div>
//                  <div className={`${StylesElem["data-point"]} ${StylesElem["data-point-one"]}`}/>
//                  <div className={`${StylesElem["data-point"]} ${StylesElem["data-point-two"]}`}/>
//                  <div className={`${StylesElem["data-point"]} ${StylesElem["data-point-tree"]}`}/> */}
//           </div>
//           <div className={StylesElem["preloader"]}>
//             {/* {AllMeetups.loaded.preloaderText} */}
//           </div>
//         </div>
//         {/* ) : null} */}
//       </div>
//     );
//   }
// }
// const mapStateToProps = state => ({
//   loading: state.appConfig.loading
// })

// export default connect(mapStateToProps)(Preloader);
