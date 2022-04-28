import { t } from "i18next";
import React, { Component } from "react";
import Styles from "../../css/search.module.css";
class SearchByLater extends Component {
  state = {
    message: "",
  };

  constructor(props) {
    super(props);
    this.searchLaterInput = React.createRef();
  }

  onSearch(e) {
    e.preventDefault();
    const searchPhrase = this.searchLaterInput.current.value;
    const findProductTitle =
      searchPhrase.length > 1
        ? this.props.productList.find((item) =>
            item.title.toLowerCase().includes(searchPhrase.toLowerCase())
          ) || {title : searchPhrase[0].toLowerCase(),
          message: 'Can find only first later'}
        : {title : searchPhrase};
    // const searchBlock = document.querySelector(
    //   `[data-id="${findProductTitle.title.toLowerCase() || searchPhrase}"]`
    // );
    const searchBlock = document.querySelector(
      '[data-id="' + findProductTitle.title.toLowerCase() + '"]'
    );
    console.log(findProductTitle, searchPhrase, searchBlock);

    if (findProductTitle !== null && !!searchBlock) {
      document.getElementsByTagName("html")[0].scrollTop =
        searchBlock.offsetTop + 5;
        console.log(findProductTitle.message !== undefined && findProductTitle.title.length === 1, findProductTitle.message);
        if (findProductTitle.message !== undefined && findProductTitle.title.length === 1) {
          this.setState({ message: findProductTitle.message });
        }else{
          this.setState({ message: "" });
        }
        const classSearch = searchBlock.className
        searchBlock.className = `${Styles["active-search"]} ${classSearch} `;
        setTimeout(() => {
          searchBlock.className = `${Styles['active-search-stop']} ${Styles["active-search"]} ${classSearch} `;
        }, 5000);
        setTimeout(() => {
          searchBlock.className = classSearch;
        }, 6000);

    } else if (!!searchBlock) {
      document.getElementsByTagName("html")[0].scrollTop =
        searchBlock.offsetTop + 10;

      this.setState({ message: "" });

      searchBlock.className.add = Styles["active-search"];

      setTimeout(() => {
        searchBlock.className.remove = Styles["active-search"];
      }, 3000);
    } else {
      this.setState({ message: "value_not_founded" });
    }
    // console.log(searchBlock, "searchBlock");
    // console.log(document.getElementsByTagName("html")[0].scrollTop, "window");
    // console.log(document.getElementsByTagName("html")[0].scrollTop, "window");
  }

  // // // onSearch(e) {
  // // //   e.preventDefault();
  // // //   console.log(this.props.productList, 'productList');
  // // //   const searchPhrase = this.searchLaterInput.current.value;
  // // //   const findProductTitle = this.props.productList.find(item => item.title.toLowerCase().includes(searchPhrase.toLowerCase())) || null
  // // //   console.log(findProductTitle.title, 'findProductTitle', document.querySelector(`[data-id=${findProductTitle.title.toLowerCase()}`));
  // // //   const searchBlock = document.querySelector(`[data-id=${findProductTitle.title.toLowerCase()}`);
  // // //   if (!!searchBlock) {
  // // //     document.getElementsByTagName("html")[0].scrollTop =
  // // //       searchBlock.offsetTop + 10;

  // // //     this.setState({ message: "" });

  // // //     searchBlock.className = "active-later";

  // // //     setTimeout(() => {
  // // //       searchBlock.className = "";
  // // //     }, 3000);
  // // //   } else {
  // // //     this.setState({ message: "value_not_founded" });
  // // //   }
  // // //   // console.log(searchBlock, "searchBlock");
  // // //   // console.log(document.getElementsByTagName("html")[0].scrollTop, "window");
  // // //   // console.log(document.getElementsByTagName("html")[0].scrollTop, "window");
  // // // }

  render() {
    return (
      <div className={Styles.search}>
        <div>
          <label className={Styles.label} htmlFor="searchLaterInput">
            {/* {t("Search by first latter")} */}
            {t("Search")}
          </label>
        </div>
        <form className={Styles["form"]} onSubmit={(e) => this.onSearch(e)}>
          <input
            className={Styles.input}
            id="searchLaterInput"
            ref={this.searchLaterInput}
            type="text"
          />
          <button className={Styles.btn}>{t("Search")}</button>
        </form>
        <span className={Styles.error}>{t(this.state.message)}</span>
      </div>
    );
  }
}

export default SearchByLater;
