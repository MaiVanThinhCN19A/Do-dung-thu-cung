import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import productApi from 'api/productApi';
import iconHotPromotion from 'assets/img/icon-hot-promotion.svg';
import Skeleton from 'react-loading-skeleton';
import { useInView } from 'react-intersection-observer';

function HotPromotion() {
  const [hotPromoList, setHotPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const mouted = useRef(true);
  const isLoaded = useRef(false);
  const [ref, inView] = useInView({
    threshold: 0,
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  // console.log(hotPromoList)

  useEffect(() => {
   
    mouted.current = true;
    
    if (!isLoaded.current && inView) {
      (async () => {
        setLoading(true);
        try {
          const  data  = await productApi.getHotPromo();
          console.log(data)
           if (mouted.current) setHotPromoList(data.slice(0, 9));
        } catch (error) {
           console.log(error.message);
        }
        setLoading(false);
      })();
      isLoaded.current = true;
    }
    return () => {
      mouted.current = false;
    };
  }, [inView]);

  return (
    <section ref={ref} className='hot-promotion'>
      <div className='container'>
        <div className='hot-promotion__content'>
          <div className='hot-promotion__top'>
            <div className='hot-promotion__title'>
              <img src={iconHotPromotion} alt='' />
              <span>Khuyễn Mãi Hot</span>
            </div>
            <Link to='/product?sort-by-sale=true' className='see-all'>
              Xem tất cả &nbsp; &gt;
            </Link>
          </div>
          {loading ? (
            <Skeleton
              className='skeleton'
              containerClassName='slide-skeleton'
              count={3}
            />
          ) : (
            <Slider {...settings} className='hot-promotion__list'>
              {hotPromoList?.map((item) => (
                <Link
                  key={item.id}
                  className='hot-promotion__item'
                  to={`/product/${item.id}`}
                >
                  <img
                 style={{ height: '283px', objectFit: 'cover' }}
                    src={item?.image}
                    alt='123'
                  />
                </Link>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}

export default HotPromotion;
