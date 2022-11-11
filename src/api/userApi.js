const { default: axiosClient } = require('./axiosClient');
const userApi = {
  register (data) {
    const url = '/user/register';
    return axiosClient.post(url, data);
  },
  login (data) {
    const url = 'user/login'; 
    
    return axiosClient.post(url, data);
   
  },
  getProfile () {
    const url = '/user/user-profile';
    return axiosClient.get(url);
  },
  updateProfile (data) {
    const url = '/user/change-profile';
    return axiosClient.patch(url, data);
  },
  addFavorites(data) {
    const url = '/favorite';
    console.log("addFavorites",data)
    return axiosClient.post(url, data);
  },
  getFavorites(params) {
    console.log("favorites",params)
    const url = '/favorite/favoriteUser';
    return axiosClient.get(url, { params: params });
  },
  getIsFavoriteProduct (id) {
    const url = '/favorite/is-favorite';
    return axiosClient.post(url, {
      product_id: id
    });
  },
  deteleFavoriteProduct (id) {
    const url = `/favorite/${id}`;
    return axiosClient.delete(url);
  },
  refeshToken () {
    const url = '/user/refresh';
    return axiosClient.post(url);
  },
  getAddress() {
    const url = '/user/user-profile?with=address';
    return axiosClient.get(url);
  },
  changeAddress(data) {
    const url = '/user/change-address';
    return axiosClient.patch(url, data);
  },
  order(data) {
    console.log("order",data)
    const url = '/user/orders';
    return axiosClient.post(url, data);
  },
  getOrders(params) {
    const url = '/user/orders';
    return axiosClient.get(url, {params : params});
  }
};

export default userApi;


