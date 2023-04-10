// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL:"https://1f85-117-217-127-105.ngrok-free.app/api/v1",
  // baseURL:"https://e099-117-217-127-105.in.ngrok.io/api/v1",
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
