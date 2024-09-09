import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { removeProduct, setProductDetails } from "../../features/Product/productSlice";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { sortProducts } from "../../functions/sortFunctions";
import { useNavigate } from "react-router";

type Props = {
  sortOption: string,
};

export const ProductItem: React.FC<Props> = ({ sortOption }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const navigate = useNavigate()

  
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch<AppDispatch>();

  const handleProductClick = (id: string) => {
    dispatch(setProductDetails(id))
    navigate(`/product-view`);
  };

  const handleRemoveClick = (productId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedProductId(productId);
    setIsOpenModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductId) {
      dispatch(removeProduct(selectedProductId));
    }
    setIsOpenModal(false);
    setSelectedProductId(null)
  };

  const handleCancelDelete = () => {
    setIsOpenModal(false);
  };

  const sortedProducts = sortProducts(products, sortOption);

  return (
    <>
      <ul>
        {sortedProducts.map(product => (
          <li key={product.id} onClick={() => handleProductClick(product.id)}>
            <h3>{product.name}</h3>
            <p>Count: {product.count}</p>
            <p>Weight: {product.weight}</p>
            <p>Size: {product.size.width} x {product.size.height}</p>
            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100px' }} />
            <button onClick={(e) => handleRemoveClick(product.id, e)}>Delete item</button>
          </li>
          
        ))}
      </ul>

      {isOpenModal && (
        <ConfirmationModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </>
  );
};
