import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { cartDiscountSelector, cartTotalSelector } from '../selector';
import userApi from 'api/userApi';
import { useDispatch } from 'react-redux';
import { paymentSuccess } from '../cartSlice';
import withLoading from 'components/HOC/withLoading';

function CartTotal({ showLoading, hideLoading }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = useRouteMatch();
  const history = useHistory();
  const price = useSelector(cartTotalSelector);

  const discount = useSelector(cartDiscountSelector);
  console.log("discount",discount)
  const user = useSelector((state) => state.user.current);
  const cart = useSelector((state) => state.cart.cartItems);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (location.pathname === '/cart/confirm') setIsConfirm(true);
    else setIsConfirm(false);

    if (location.pathname === '/cart/success') setIsSuccess(true);
    else setIsSuccess(false);
  }, [location.pathname]);

  const handleClick = async () => {
    if (!isConfirm) {
      history.push(`${path.url}/confirm`);
      setIsConfirm(true);
      return;
    }

    // Delete Cart
    if (
      user &&
      user.addressId !== null &&
      user.addressId !== undefined &&
      cart
    ) {
      const cartTotal = cart.map((item) => {
        const i = { ...item };
        if (i.priceAfterDiscount) delete i.priceAfterDiscount;
        if (i.idProduct) {
          i.id = i.idProduct;
          delete i.idProduct;
        }
        return i;
      });console.log("cartTotal",cartTotal)
      const dataSend = {
        total: price,
        payment_method: 'Cash on Delivery',
        status: 1,
        address_id: user.addressId,
        products: [...cartTotal],
        
      };
      showLoading();
      try {
        const rs = await userApi.order(dataSend);
        console.log("datasend",dataSend)
        if (rs.status === 200) {
          const action = paymentSuccess();
          dispatch(action);
          toast.success('?????t h??ng th??nh c??ng!');
          history.replace(`${path.url}/success`, rs.data.id);
        }
      } catch (error) {
        console.log(error);
      }
      hideLoading();
    } else {
      toast.error('Vui l??ng c???p nh???t th??ng tin ?????t h??ng');
    }
  };

  return (
    <>
      {isSuccess || isConfirm || (
        <div className='discount__code'>
          <h2>M?? Gi???m Gi??</h2>
          <form action=''>
            <input type='text' placeholder='Nh???p m?? gi???m gi??....' />
            <button>??P D???NG</button>
          </form>
        </div>
      )}

      <div className='checkout'>
        <p>
          <span>T???m T??nh:</span>
          <span>
            {price &&
              (price + (discount || 0)).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
          </span>
        </p>
        <p>
          <span>Gi???m Gi??:</span>{' '}
          <span>
            {discount &&
              discount.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
          </span>
        </p>
        <p>
          <span>Th??nh Ti???n:</span>{' '}
          <span>
            {price &&
              price.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
          </span>
        </p>
        <span>(???? bao g???m VAT n???u c??)</span>
      </div>

      {isSuccess || (
        <>
          <button onClick={handleClick}>
            {!isConfirm ? 'TI???N H??NH ?????T H??NG' : 'X??C NH???N THANH TO??N'}
          </button>
          <button
            className='back'
            onClick={() => {
              history.goBack();
            }}
          >
            QUAY L???I
          </button>
        </>
      )}
    </>
  );
}

export default withLoading(CartTotal);
