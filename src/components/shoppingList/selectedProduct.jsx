import Checkbox from './../ui/checkbox';
import Styles from "../../css/productListEdit.module.css";
import { t } from 'i18next';

function SelectedProduct(props) {
    const product = props.product
    return(
        <div
        className={`${Styles.product} ${Styles["product--selected"]}`}
        key={product.id}
      >
        {props.showCheckbox ? (
          <div className="row">
            <div
              className={Styles["checkbox-container"]}
              onClick={() => props.changeStatusProduct(product.id)}
            >
              <Checkbox
                status={product.status}
                alternativeColor={true}
              />
            </div>
            <span>
              <div className={Styles["product-title"]}>
                {product.title}
              </div>
              {product.desc ? (
                <div className={Styles["product-description"]}>
                  {t("desc")}: {product.desc}
                </div>
              ) : null}
            </span>
          </div>
        ) : null}
      </div>
    )
}

export default SelectedProduct;