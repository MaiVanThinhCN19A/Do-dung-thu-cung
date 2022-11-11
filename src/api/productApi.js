const { default: axiosClient } = require('./axiosClient');
const productApi = {
    getBanners () {
    const url = '/banners';
    return axiosClient.get(url);
  },
  getHotPromo () {
    const url = '/product/sale';
    return axiosClient.get(url);
  },
  getHotProduct () {
    const url = '/product/promo';
    return axiosClient.get(url);
  },
  getProductList ( params) {
    const url = '/product';
    return axiosClient.get(url, { params: { ...params , perPage: 5} });

  },
  getProductByID (id) {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
