import React, { useState } from 'react';
interface ProductState {
    name: string;
    price: string;
    type: string;
}

interface ProductContextInterface {
    product: ProductState, 
    updateProdData: (name: string, value: string) => void,
    clearState: () => void
}

interface Props {
    children: any
}

const ProductContext = React.createContext<ProductContextInterface | null>(null); 

const Product: React.FC<Props> = ({ children }) => {
    const [product, setProduct] = useState<ProductState>({ name: '', price: '', type: '' }) 

    const updateProdData = (name: string, value: string) => { 
        setProduct({ ...product, [name]: value })
    }

    const clearState = () => {
        setProduct({ name: '', price: '', type: '' })
    }
    return (

        <ProductContext.Provider value={{ product, updateProdData, clearState }}>
            {children}
        </ProductContext.Provider>

    )

}

export const UseProductContext = () => {
    const appContext = React.useContext(ProductContext);
    return appContext
};



export default Product