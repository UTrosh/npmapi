const axios = require('axios');

class NPMAPI {
    constructor(apiurl, mail, password) {
        this.mail = mail;
        this.password = password;
        this.apiurl = apiurl;
        this.token = null;
        this.refreshTokenInterval = 6 * 60 * 60 * 1000;
    }

    /**
     * @returns {Promise<string>} Token - Resolve with the token if successful, reject with an error if failed
     */
    login() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${this.apiurl}/tokens`, {
                    identity: this.mail,
                    secret: this.password
                });
                this.token = response.data.token;

                this.refreshTokenInterval = setInterval(async () => {
                    try {
                        await this.refreshToken();
                    } catch (e) {
                        console.error('NPMAPI: Error refreshing token:', e.message);
                    }
                }, this.refreshTokenInterval);

                resolve(this.token);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @returns {Promise<string>} Token - Resolve with the refreshed token if successful, reject with an error if failed
     */
    refresh() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${this.apiurl}/tokens`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
                this.token = response.data.token;
                resolve(this.token);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @returns {string} Token - Return the current token
     */
    getToken() {
        return this.token;
    }

    /**
     * @param {string} id - Id of proxy
     * @returns {Promise<number>} - Resolve with 200 if successful, reject with an error if failed
     */
    delProxy(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.delete(`${this.apiurl}/nginx/proxy-hosts/${id}`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
                resolve(200);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @returns {Promise<Array>} - Resolve with the response of proxy list if successful, reject with an error if failed
     */
    getProxy() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${this.apiurl}/nginx/proxy-hosts`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param {Object} proxyConfig - Object of proxy configuration
     * @returns {Promise<Object>} - Resolve with the response data if successful, reject with an error if failed
     */
    newProxy(proxyConfig) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${this.apiurl}/nginx/proxy-hosts`, proxyConfig, {headers: {Authorization: `Bearer ${this.getToken()}`}});
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param {string} id - Id of proxy
     * @returns {Promise<number>} - Resolve with 200 if successful, reject with an error if failed
     */
    delStream(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.delete(`${this.apiurl}/nginx/streams/${id}`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
                resolve(200);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @param {Object} streamConfig - Object of stream configuration
     * @returns {Promise<Object>} - Resolve with the response data if successful, reject with an error if failed
     */
    newStream(streamConfig) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${this.apiurl}/nginx/streams`, streamConfig, {headers: {Authorization: `Bearer ${this.getToken()}`}});
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * @returns {Promise<Array>} - Resolve with the response of proxy list if successful, reject with an error if failed
     */
    getStream() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${this.apiurl}/nginx/streams`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }
    
    stopTokenRefresh() {
        clearInterval(this.refreshTokenInterval);
    }
}

module.exports = {
    NPMAPI
};
