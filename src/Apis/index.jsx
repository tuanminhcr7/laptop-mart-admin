import axios from "axios"
import Cookies from "js-cookie";
import qs from 'qs';

const domain = "http://localhost:3000/api/v1";

const Api = {

    // Users
    login(payload) {
        return axios.post(`${domain}/users/auth/login`, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },
    profile() {
        return axios.get(`${domain}/users/profile`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            }
        });
    },
    userList(params) {
        return axios.get(`${domain}/users?${qs.stringify(params)}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            }
        });
    },
    userDetail(id) {
        return axios.get(`${domain}/users/${id}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            }
        });
    },
    userUpdate(id, payload) {
        return axios.patch(`${domain}/users/${id}`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            }
        });
    },

    // Products
    productList(params) {
        return axios.get(`${domain}/products?${qs.stringify(params)}`);
    },
    productCreate(payload) {
        return axios.post(`${domain}/products`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
    productShow(id) {
        return axios.get(`${domain}/products/${id}`);
    },
    productEdit(id, payload) {
        return axios.patch(`${domain}/products/${id}`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        });
    },
    productDelete(id) {
        return axios.delete(`${domain}/products/${id}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        });
    },
    productUploadImages(payload) {
        return axios.post(`${domain}/products/upload/images`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    // Product Variant
    productVariantList(productId, params) {
        return axios.get(`${domain}/products/${productId}/product-variants?${qs.stringify(params)}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        });
    },
    productVariantShow(productId, productVariantId) {
        return axios.get(`${domain}/products/${productId}/product-variants/${productVariantId}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        });
    },
    productVariantsCreate(productId, payload) {
        return axios.post(`${domain}/products/${productId}/product-variants`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
    productVariantsUpdate(productId, variantId, payload) {
        return axios.patch(`${domain}/products/${productId}/product-variants/${variantId}`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
    productVariantsDelete(productId, variantId) {
        return axios.delete(`${domain}/products/${productId}/product-variants/${variantId}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },

    // Orders
    orderList(params) {
        return axios.get(`${domain}/orders?${qs.stringify(params)}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        });
    },
    orderShow(id) {
        return axios.get(`${domain}/orders/${id}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        });
    },

    // Stock Entries
    stockEntriesList(params) {
        return axios.get(`${domain}/products/stock-entries?${qs.stringify(params)}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
    stockEntriesListProduct(productId, params) {
        return axios.get(`${domain}/products/${productId}/stock-entries?${qs.stringify(params)}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
    stockEntriesShow(productId, stockEntryId) {
        return axios.get(`${domain}/products/${productId}/stock-entries/${stockEntryId}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
    stockEntriesCreate(productId, payload) {
        return axios.post(`${domain}/products/${productId}/stock-entries`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
    stockEntriesUpdate(productId, stockEntryId, payload) {
        return axios.patch(`${domain}/products/${productId}/stock-entries/${stockEntryId}`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
    stockEntriesDelete(productId, stockEntryId) {
        return axios.delete(`${domain}/products/${productId}/stock-entries/${stockEntryId}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },

    // Master Data
    masterData() {
        return axios.get(`${domain}/products/master-data`);
    },

    // Shipping
    shippingShow(orderId) {
        return axios.get(`${domain}/shippings/${orderId}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
    shippingUpdate(orderId, payload) {
        return axios.patch(`${domain}/shippings/${orderId}`, payload, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    },
}

export default Api