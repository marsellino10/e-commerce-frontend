import React from 'react'
import {BiPlusMedical } from 'react-icons/bi'
import {FaMinus} from 'react-icons/fa';

const Filter = ({brand,setBrand,size,setSize,price,handleFilters,handlePriceFilter,alertMess}) => {
    
  return (
    
            
            <div className="filters-cards">
                <div className="filter-card">
                    <div className="accord" onClick={() => setBrand(!brand)}>
                        <p>Brand</p>
                        {brand? <FaMinus /> : <BiPlusMedical />}
                    </div>
                    {brand && <div className="brand-checkboxes">
                        <div className="brand-checkbox">
                            <input type="checkbox" id="adidas" name="adidas" value="adidas" 
                                    onChange={(e) => handleFilters(e,"brand")} />
                            <label for="adidas">Adidas</label>
                        </div>
                        <div className="brand-checkbox">
                            <input type="checkbox" id="nike" name="nike" value="nike"
                            onChange={(e) => handleFilters(e,"brand")}/>
                            <label for="nike">Nike</label>
                        </div>
                        <div className="brand-checkbox">
                            <input type="checkbox" id="candle" name="candle" value="candle"
                            onChange={(e) => handleFilters(e,"brand")} />
                            <label for="candle">Candle</label>
                        </div>
                    
                    </div>}
                </div>
                <div className="filter-card">
                    <div className="accord" onClick={() => setSize(!size)}>
                        <p>Size</p>
                        {size? <FaMinus /> : <BiPlusMedical />}
                    </div>
                    {size && <div className="brand-checkboxes">
                        <div className="brand-checkbox">
                            <input type="checkbox" id="small" name="small" value="small"
                            onChange={(e) => handleFilters(e,"size")} />
                            <label for="small">Small</label>
                        </div>
                        <div className="brand-checkbox">
                            <input type="checkbox" id="medium" name="medium" value="medium"
                            onChange={(e) => handleFilters(e,"size")} />
                            <label for="medium">Medium</label>
                        </div>
                        <div className="brand-checkbox">
                            <input type="checkbox" id="large" name="large" value="large"
                            onChange={(e) => handleFilters(e,"size")} />
                            <label for="large">Large</label>
                        </div>
                    
                    </div>}
                </div>
                <div className="price-filter">
                  <input type="number" placeholder='Max Price $' ref={price}/>
                  <button onClick={() => handlePriceFilter(price.current.value)}>Update Price</button>
                  <div color='danger'>{alertMess}</div>
                </div> 
            </div>
       
  )
}

export default Filter;
