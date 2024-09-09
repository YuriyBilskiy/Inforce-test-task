import React from "react"
import { Provider } from "react-redux"
import { store } from "../store/store"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { App } from "../App"
import { ProductList } from "../components/ProductList/ProductList"
import { ProductView } from "../components/ProductView/ProductView"

export const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/product-list' element={<ProductList />} />
          <Route path='/product-view' element={<ProductView />} />
          <Route path='*' element={<h1>Not found page</h1>} />
        </Routes>
      </Router>
    </Provider>
  )
}
