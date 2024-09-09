import './App.css'
import { ProductList } from './components/ProductList/ProductList'

export const  App:React.FC = () => {

  return (
    <div className="app">
      <div className='container'>
     <ProductList />
    </div>
    </div>
  )
}
