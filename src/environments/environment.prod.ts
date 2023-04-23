export const environment = {
  production: true,
  // baseURL:"https://beea-117-217-127-105.in.ngrok.io/api/v1",
  baseURL:"http://localhost:8080/api/v1",
  // baseURL:"https://7a12-117-217-127-105.ngrok-free.app/api/v1",

  registerURL:"/customer/register",
  loginURL:"/customer/login",
  userDetailsURL:'/customer/customer-details',
  changePasswordURL:'/customer/changePassword',
  addAddressURL:'/customer/add-customer-address',
  updateUserDetail:'/customer/update-customer',
  categoriesURL:'/category/get-all-categories',
  deleteAddressURL:'/customer/delete-customer-address',
  updateAddressURL:'/customer/update-customer-address',
  encryptionURL:'/encryption',
  productByCategoryIdURL:'/product/get-product-by-category-id',
  productByIdURL:'/product/get-product-by-id',
  addOrderURL:'/order/add-order',
  getOrdersURL:'/customer/get-customer-all-orders',
  getOrderDetailByIdURL:'/order/get-order-by-id',
  getAllProductsURL:'/product/get-all-products'






};
