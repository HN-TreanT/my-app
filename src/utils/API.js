import axios from "axios"
import { serverConfig } from "../constants/serverConfig"
import Auth from "./auth"

async function getAuthToken () {
    return window.localStorage.getItem("access_token") ?? ""
}

const API = axios.create({
    baseURL: serverConfig.server,
    headers: {
        'content-type': 'application/json',
    },

})

API.interceptors.request.use(async (config) => {
    config.headers = {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${await getAuthToken()}`
    }
    return { ...config }
})

API.interceptors.response.use(async (response) => {
    if (response && response.data) {
        return response.data
    }
    return response
},async (error) => {
    const status = error.response ? error.response.status : null
    const originalConfig = error.config
    // Access Token was expired
    if (status === 401) {
        return  Auth.refreshToken().then(async res => {
            error.config.headers['Authorization'] = `Bearer ${await getAuthToken()}`
            return API(error.config)
        })
    }
    if (status === 408) {
        window.localStorage.clear()
        window.location.href = '/login'
    }
    return Promise.reject(error)
})


export default API