import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { ProductCard , Filter} from '../../components';


import './catpage.css';

const settings = {
    
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
      responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
      
    };

const CatPage = ({image,anwa3Lebs,products,pagee}) => {

  const price = useRef();


  const data = ["Quick view" , "Add to Bag"];

  // My states ============================================ My states //

        const[filteredProducts,setFilteredProducts] = useState(products);
        const[filters,setFilters] = useState([]);
        const[category,setCategory] = useState(pagee);
        const[mainFilters,setMainFilters] = useState({
          brand:[],
          size:[],
          category:"",
          price:Infinity
        })

        const[menuToogle,setMenuToggle] = useState(false); 
        const[brand,setBrand] = useState(true);
        const[size,setSize] = useState(true);
        const[alertMess,setAlert] = useState("");

  // End of states ========================================= End of states //

  useEffect(() => {
    setFilteredProducts(products);
  },[]);

  //filter products function

  const filterProducts = () => {
    let myFilteredProducts = products.filter(product => product.price <= mainFilters.price)
    
    if(mainFilters.brand.length){
      myFilteredProducts = myFilteredProducts.filter(product => mainFilters.brand.includes(product.brand));
    }
    if(mainFilters.category !== "All"){
      myFilteredProducts = myFilteredProducts.filter(product => 
        mainFilters.category.toUpperCase() === product.section.name.toUpperCase());
    }

    setFilteredProducts(myFilteredProducts);
  }
  
  // add new filter or remove it from filters array 
  const handleFilters = (event,type) => {

        console.log("type   " + type);
        const item = event.target.value;
        let newCheckedItems;

        if (filters.includes(item)) {
          newCheckedItems = filters.filter((i) => i !== item);

        } else {
          newCheckedItems = [...filters, item];
        }

        setFilters(newCheckedItems);

        if(type === "brand"){
          if (mainFilters.brand.includes(item)) {
            mainFilters.brand = mainFilters.brand.filter((i) => i !== item);
  
            } else {
              mainFilters.brand = [...mainFilters.brand, item];
            }
        }
        else{
          if (mainFilters.size.includes(item)) {
            mainFilters.size = mainFilters.size.filter((i) => i !== item);
  
            } else {
              mainFilters.size = [...mainFilters.size, item];
            }
        }

        filterProducts();
        console.log(mainFilters.brand);
        console.log(mainFilters.size);
  }


  // add max price or update it 
  const handlePriceFilter = (se3r) => {
    
        if(se3r !== ''){
          setAlert("");
          const newSe3r = parseInt(se3r);
          console.log(typeof newSe3r);
          let newCheckedItems;

          // yms7 kol elnumbers wi yrg3 elnot numbers 
          newCheckedItems = filters.filter(element => isNaN(element));

          newCheckedItems = [...newCheckedItems, newSe3r];

          setFilters(newCheckedItems);
          mainFilters.price = se3r;
          
          filterProducts();

        }
        else{
          setAlert("This field is empty !")
        }
    
  }

  //change the category of products
  const handleCategory = (newCat) => {
      
      if(newCat === 'All'){
        setCategory(pagee);
        mainFilters.category = "All";
      }
      else{
        setCategory(newCat);
        mainFilters.category = newCat;
      }
      filterProducts();
  }

  return (
    <div className='e-commerce-catpage'>

      <div className="image-container">
        <img src={image} alt="image"/>
      </div>

      <div className="anwa3lebs-container">
        <Slider {...settings}>
            {anwa3Lebs.map((no3,index) => 
                            (<div className='slider-item' id='sli-itm' key={index} 
                                  onClick={() => handleCategory(no3)}>
                                {no3}
                              </div>
                           ))
            }
        </Slider>
      </div>

      <div className="catpage-maindiv">

      <div className="filters">

          <div className="selected-filters">
                <h3>Selected Filters</h3>
                <div className="applied">
                    {filters.length === 0?<p>No filters applied</p>:
                    filters.map((filter, index) => (<div key={index} id="filter-applied">{filter}</div>))}
                </div>   
          </div>
        
        <Filter brand={brand} 
                setBrand={setBrand} size={size} 
                setSize={setSize} price={price} 
                handleFilters={handleFilters} handlePriceFilter={handlePriceFilter}
                alertMess={alertMess}
        />
         </div>

        <div className="filter-mob-menu">

          <div className="filter-toogle-menu" onClick={() => setMenuToggle(!menuToogle)}>
            Filter
          </div>

          {
            menuToogle && <Filter brand={brand} 
                                  setBrand={setBrand} size={size} 
                                  setSize={setSize} price={price} 
                                  handleFilters={handleFilters} 
                                  handlePriceFilter={handlePriceFilter}
                                  alertMess={alertMess}
                          />
          }
        </div>

        <div className="showing-products">

            <h1>All {category}</h1>

            <div className="products-div">
                {filteredProducts.length ? filteredProducts.map((product) => 
                   <div id="prod-itm" key={product.id}>
                   <ProductCard imageUrl={product.image} data={data} 
                   prodName={product.name} prodPrice={product.price}/>
                  </div>):
                  <div>Nothing to show</div>
                }
                
            </div>

        </div>

      </div>
    </div>
  )
}

export default CatPage;
