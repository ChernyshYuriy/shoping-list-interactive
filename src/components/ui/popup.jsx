import { useSelector } from "react-redux";
import StylesElem from "../../css/popup.module.css";

function Popup(props) {
  const popupData = useSelector((state) => state.appConfig.popup);
  return (
    <div>
      {!!popupData.visibility ? (
        <div className={StylesElem["popup-container"]}>
          <div className={StylesElem.popup}>
            {popupData.header.isVisible ? (
              <header className={StylesElem.header}>
                popupData.header.Title
              </header>
            ) : null}
            {props.children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Popup;
