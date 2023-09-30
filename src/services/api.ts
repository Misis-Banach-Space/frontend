import axios from "axios";

interface SettingFromData {
    annotation_length: number;
    article_length: number;
    screenshot_timing: number;
    start_timecode: string;
    end_timecode: string;
}

interface VideoFormData {
    settings: SettingFromData;
    video_link: string;
}

interface CreateArticleData {
    body: string;
    record_id: number;
}

interface CreateSite {
    url: string;
}
interface CreateSubPage {
    url: string;
}

interface UserCreate {
    email: string;
    fio: string;
    password: string;
}

interface UserLogin {
    email: string;
    password: string;
}

interface RecordDto {
    id: number;
    title: string;
    video_link: string;
    annotation_length: number;
    article_length: number;
    start_timecode: string;
    end_timecode: string;
    preview_picture: string;
    published: boolean;
    screenshot_timing: number;
}

let token;

interface AllRecords {
    limit: number;
    offset: number;
}

interface PublishedStatus {
    record_id: number;
    published: boolean;
}

function getToken() {
    const token = localStorage.getItem("token");
    if (token) {
        return token;
    }
    else {
        setAuthorization(false);
    }
}


function setToken(token: string) {
    console.log(token);
    setAuthorization(true);
    return localStorage.setItem("token", token);
}
function setAuthorization(isAuthorized: boolean) {
    localStorage.setItem('isAuthorized', JSON.stringify(isAuthorized));
}

const BASE_URL = "http://95.140.147.162:9999";

const ApiService = {
    async createSite(data: CreateSite) {
        const response = await axios
            .post(`${BASE_URL}/api/v1/websites/create`, data)
        let result = await response;
        return result;
    },
    async createSubPage(data: CreateSubPage) {
        const response = await axios
            .post(`${BASE_URL}/api/v1/pages/create`, data)
        let result = await response;
        return result;
    },

    async createRecord(data: VideoFormData) {
        // let status = "video added";
        let config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        console.log(getToken());
        const response = await axios
            .post(`${BASE_URL}/api/v1/record/create`, data, config)
        let result = await response;
        console.log(result);
        console.log(result.data.id);
        return result;
    },

    async createArticle(data: CreateArticleData) {
        let config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        const response = await axios
            .post(`${BASE_URL}/api/v1/article/${data.record_id}`, { body: data.body }, config)
        let result = await response;
        return result;
    },



    async setPublishedStatus(data: PublishedStatus) {
        // let status = "video added";
        let config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        console.log(getToken());
        const response = await axios
            .post(`${BASE_URL}/api/v1/record/${data.record_id}/published_status?published=${data.published}`, null, config)
        let result = await response;
        return result;
    },

    async getArticle(data: number) {
        let config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        const response = await axios.get(`${BASE_URL}/api/v1/article/${data}/main`, config);
        return response;
    },

    async getRecordByArticleId(data: number) {
        let config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        const response = await axios.get(`${BASE_URL}/api/v1/record/by_article/${data}`, config);
        return response;
    },

    async getRecordByRecordId(data: number) {
        let config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        const response = await axios.get(`${BASE_URL}/api/v1/record/${data}`, config);
        return response;
    },

    async getAllRecords(data: AllRecords): Promise<RecordDto[]> {
        let config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: data
        }
        const response = await axios.get(`${BASE_URL}/api/v1/record/all`, config);
        let result = await response;
        return result.data;
    },

    async getPublishedRecords(data: AllRecords): Promise<RecordDto[]> {
        let config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: data
        }
        const response = await axios.get(`${BASE_URL}/api/v1/record/published`, config);
        let result = await response;

        return result.data;
    },

    async createUser(data: UserCreate) {
        const response = await axios
            .post(`${BASE_URL}/auth/user/create`, data)

        let result = await response;
        token = result.data.token;
        setToken(token);
        setAuthorization(true);
        return result;
    },

    async loginUser(data: UserLogin) {
        let status = "authorized";
        let config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        const response = await axios
            .post(`${BASE_URL}/auth/user/login`, data, config)

        let result = await response;
        token = result.data.token;
        setToken(token);
        setAuthorization(true);
        return status;
    },
};
export default ApiService;
