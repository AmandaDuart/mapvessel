import axios from 'axios';
export const Host = process.env.REACT_APP_API_HOST;
const PYHOST = process.env.REACT_APP_PYTHON_API_HOST;

const HttpReq = async (url, method = 'GET', token, data) => {
    const headers = { Accept: 'application/json' };

    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    try {
        const res = await axios({
            url,
            method: method,
            headers,
            data,
        });
        return res;
    } catch (ex) {
        return {
            status: -500,
            error: 'Connection failed, please try again after check your connection.',
            errorDetail: ex,
        };
    }
};

const HttpGet = async (url, token) => {
    return await HttpReq(url, 'GET', token);
};

const HttpPost = async (url, token, data) => {
    return await HttpReq(url, 'POST', token, data);
};

const HttpDel = async (url, token, data) => {
  return await HttpReq(url, "DELETE", token, data);
};

export const Api = {
    getModel: async () => {
        const res = await HttpGet(PYHOST + 'api/model_info/');

        if (res && res.status == 200) {
            return res.data;
        } else {
            return {
                status: 500,
                error: 'Failed to get models.' + res.error,
            };
        }
    },

    login: async (email, password) => {
        const url = Host + 'user/auth/login';
        const data = {
            user: {
                email,
                password,
            },
        };
        const res = await HttpPost(url, null, data);

        if (res.data) {
            return res.data;
        } else {
            return null;
        }
    },

    register: async (username, email, pwd) => {
        const url = Host + 'user/auth/register';

        const data = {
            user: {
                username,
                pwd,
                email,
            },
        };
        const res = await HttpPost(url, null, data);

        if (res.data) {
            return res.data;
        } else {
            return {
                status: 400,
                message: 'Request failed, please check your connection.',
            };
        }
    },

    tokenCheck: async (token) => {
        const url = Host + 'user/auth/token/check';
        const res = await HttpPost(url, token);

        if (res.data && res.data.status === 200) {
            return res.data.user;
        } else {
            return null;
        }
    },

    forgotPwd: async (email) => {
        const url = Host + 'user/auth/forget';
        const data = {
            email,
        };
        const res = await HttpPost(url, null, data);

        if (res.data && res.data.accepted && res.data.accepted.includes(email)) {
            return true;
        } else {
            return false;
        }
    },

    resetPwd: async (code, pwd) => {
        const url = Host + 'auth/reset';
        const data = {
            code,
            pwd,
        };
        const res = await HttpPost(url, null, data);

        if (res && res.data && res.data.status !== 200) {
            return null;
        } else {
            return res.data;
        }
    },

    uploadVideo: async (token, file, title, description) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('video_title', title);
        formData.append('video_desc', description);

        const url = Host + 'asset/upload';
        const res = await HttpPost(url, token, formData);

        if (res && res.data) {
            return res.data;
        } else {
            return {
                status: 500,
                error: 'failed to upload video , please try again.',
            };
        }
    },

    uploadVideoIPCam: async (token, file, title, description, user, pwd) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('video_title', title);
        formData.append('video_desc', description);
        formData.append('camera_user', user);
        formData.append('camera_pwd', pwd);

        const json = {
            file,
            video_title: title,
            video_desc: description,
            camera_user: user,
            camera_pwd: pwd,
        }

        const url = Host + 'asset/upload_ip_cam';
        const res = await HttpPost(url, token, json);

        if (res && res.data) {
            return res.data;
        } else {
            return {
                status: 500,
                error: 'failed to upload video , please try again.',
            };
        }
    },

    getVideoAssets: async (token) => {
        const url = Host + 'asset/all?assetType=video,stream';

        try {
            const res = await HttpGet(url, token);
            if (res && res.data) {
                return res.data;
            } else {
                return {
                    status: 500,
                    error: 'Failed to get video sources, please try again.',
                };
            }
        } catch (ex) {
            return {
                status: 500,
                error: 'Failed to get video sources. ' + ex.message,
            };
        }
    },

    removeAsset: async (token, id) => {
        const url = Host + 'asset/remove/' + id;

        try {
            const res = await HttpDel(url, token);
            if (res && res.data) {
                return res.data;
            } else {
                return {
                    status: 500,
                    error: 'Failed to get video sources, please try again.',
                };
            }
        } catch (ex) {
            return {
                status: 500,
                error: 'Failed to get video sources. ' + ex.message,
            };
        }
    },

    

};
