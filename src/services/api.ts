import axios, { AxiosError } from 'axios';

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

interface AllRecords {
    limit: number;
    offset: number;
}

interface PublishedStatus {
    record_id: number;
    published: boolean;
}

const BASE_URL = "http://larek.itatmisis.ru:12347";

const ApiService = {
    async createSite(data: CreateSite) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/websites/create`, data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async createSubPage(data: CreateSubPage) {
        try {
            const response = await axios
            .post(`${BASE_URL}/api/v1/pages/create`, data)
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async getWebsiteById(data: number) {
        const response = await axios.get(`${BASE_URL}/api/v1/websites/${data}`);
        return response;
    },
    async getAllPagesBySiteId(data: number){
        const response = await axios.get(`${BASE_URL}/api/v1/pages/by_website/${data}`)
        return response;
    },
    async getPageById(data: number) {
        const response = await axios.get(`${BASE_URL}/api/v1/pages/${data}`);
        return response;
    },
    async checkSiteUrl(data: CreateSite) {
        const response = await axios.post(`${BASE_URL}/api/v1/websites/check_url`, data);
        return response;
    },
    async checkPageUrl(data: CreateSite) {
        const response = await axios.post(`${BASE_URL}/api/v1/pages/check_url`, data);
        return response;
    },
    async getAllSites(): Promise<RecordDto[]> {
        const response = await axios.get(`${BASE_URL}/api/v1/websites/all`);
        let result = await response;
        return result.data;
    },

    //old
    async createRecord(data: VideoFormData) {
        // let status = "video added";
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${getToken()}`
        //     }
        // }
        // console.log(getToken());
        const response = await axios
            .post(`${BASE_URL}/api/v1/record/create`, data)
        let result = await response;
        console.log(result);
        console.log(result.data.id);
        return result;
    },

    async createArticle(data: CreateArticleData) {
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${getToken()}`
        //     }
        // }
        const response = await axios
            .post(`${BASE_URL}/api/v1/article/${data.record_id}`, { body: data.body })
        let result = await response;
        return result;
    },



    async setPublishedStatus(data: PublishedStatus) {
        // let status = "video added";
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${getToken()}`
        //     }
        // }
        // console.log(getToken());
        const response = await axios
            .post(`${BASE_URL}/api/v1/record/${data.record_id}/published_status?published=${data.published}`, null)
        let result = await response;
        return result;
    },

    async getArticle(data: number) {
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${getToken()}`
        //     }
        // }
        const response = await axios.get(`${BASE_URL}/api/v1/article/${data}/main`);
        return response;
    },

    async getRecordByArticleId(data: number) {
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${getToken()}`
        //     }
        // }
        const response = await axios.get(`${BASE_URL}/api/v1/record/by_article/${data}`);
        return response;
    },

    async getRecordByRecordId(data: number) {
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${getToken()}`
        //     }
        // }
        const response = await axios.get(`${BASE_URL}/api/v1/record/${data}`);
        return response;
    },

    async getAllRecords(data: AllRecords): Promise<RecordDto[]> {
        const response = await axios.get(`${BASE_URL}/api/v1/websites/all`);
        let result = await response;
        return result.data;
    },

};
export default ApiService;
