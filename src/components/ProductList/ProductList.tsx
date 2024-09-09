import { useState } from "react"
import { AddOpenModal } from "../AddOpenModal/AddOpenModal"
import { ProductItem } from "../ProductItem/ProductItem"

export const ProductList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sortOption, setSortOption] = useState("alphabetically")

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {isOpen ? (
        <AddOpenModal handleClose={handleClose} />
      ) : (
        <>
          <h1 className='product_list'>Product list:</h1>
          <button className='product_list-button' onClick={handleOpen}>
            Add Product
          </button>
          <select value={sortOption} onChange={handleSortChange}>
            <option value='alphabetically'>Alphabetical</option>
            <option value='byCount'>Count</option>
          </select>

          <ProductItem sortOption={sortOption} />
        </>
      )}
    </>
  )
}
