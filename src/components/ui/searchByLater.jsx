import { t } from "i18next";
import React, { Component } from "react";
import Styles from "../../css/search.module.css";
class SearchByLater extends Component {
  state = {
    message: "",
  };

  onSearch(e) {
    e.preventDefault();
    const later = document.getElementById("searchLaterInput").value;
    const searchBlock = document.getElementById(`#${later.toLowerCase()}`);
    if (!!searchBlock) {
      document.getElementsByTagName("html")[0].scrollTop =
        searchBlock.offsetTop + 10;

      this.setState({ message: "" });

      searchBlock.className = "active-later";

      setTimeout(() => {
        searchBlock.className = "";
      }, 3000);
    } else {
      this.setState({ message: "value_not_founded" });
    }
    // console.log(searchBlock, "searchBlock");
    // console.log(document.getElementsByTagName("html")[0].scrollTop, "window");
    // console.log(document.getElementsByTagName("html")[0].scrollTop, "window");
  }

  render() {
    return (
      <div className={Styles.search}>
        <div>
          <label className={Styles.label} htmlFor="searchLaterInput">{t("Search by first latter")}</label>
        </div>
        <form className={Styles["form"]} onSubmit={(e) => this.onSearch(e)}>
          <input className={Styles.input} id="searchLaterInput" type="text" />
          <button className={Styles.btn}>{t("Search")}</button>
        </form>
        <span className={Styles.error}>{t(this.state.message)}</span>
      </div>
    );
  }
}

export default SearchByLater;
