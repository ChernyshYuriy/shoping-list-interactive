import Styles from "../../css/productListEdit.module.css";
import Checkbox from "./../ui/checkbox";
import { t } from "i18next";

function NotSelectedProduct(props) {
  const product = props.product;
  return (
    <div className={Styles["product"]} data-id={product.title.toLowerCase()}>
      <div className="row">
        {props.config.showCheckbox ? (
          <div
            className={Styles["checkbox-container"]}
            onClick={() => props.changeStatusProduct(product.id)}
          >
            <Checkbox status={product.status} />
          </div>
        ) : null}
        <div>
          <div id={product.title} className={Styles["product-title"]}>
            {product.title}
          </div>
          {product.desc ? (
            <div className={Styles["product-description"]}>
              {t("desc")}: {product.desc}
            </div>
          ) : null}
          {product.extraParams !== undefined
            ? product.extraParams.map((parameter) => {
                return (
                  <div key={parameter.id} className={Styles["product-description"]}>
                    <span>{parameter.key}</span> 
                    {parameter.value ? ": " : null}
                    <span>{parameter.value}</span>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      {props.config.showProductActions ? (
        <div className={Styles["product-btn-group"]}>
          <button
            className="btn btn-edit btn-edit--shopping-list"
            onClick={() => props.setEditingProduct(product)}
          >
            {t("Edit")}
          </button>
          <button
            className="btn btn-delete btn-delete--shopping-list"
            onClick={() => props.deleteProduct(product.id)}
          >
            {t("Delete")}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default NotSelectedProduct;
