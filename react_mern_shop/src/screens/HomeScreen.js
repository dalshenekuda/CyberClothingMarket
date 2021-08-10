import React, {useEffect, useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  let sliders=[]
    sliders.push('/images/slider1.jpg')
    sliders.push('/images/slider2.jpg')
    sliders.push('/images/slider3.jpg')
    sliders.push('/images/slider4.jpg')

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div className='text-center'>
      <h2 className='qqq'>Exclusive fashion</h2>

      {/*{loadingSellers ? (*/}
      {/*  <LoadingBox></LoadingBox>*/}
      {/*) : errorSellers ? (*/}
      {/*  <MessageBox variant="danger">{errorSellers}</MessageBox>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}*/}

          <Carousel emulateTouch ={true} showArrows={true} infiniteLoop={true} interval={5000}
                    autoPlay={true} showThumbs={false} transitionTime={2000} stopOnHover={false}
                    showStatus={false}>
            {sliders.map((slider) => (
                <div>
                  <img src={slider} alt={"Slider"} />
              </div>
            ))}
          </Carousel>
          
        {/*</>*/}
      {/*)}*/}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}


          <div className="row center top">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
