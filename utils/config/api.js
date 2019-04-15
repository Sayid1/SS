import MyHttp from './request.js';
import {
  myStore
} from '../tools/store';

//所有的请求
const ALL_API = {
  getOpenId: {
    method: 'POST',
    url: 'getOpenId'
  },
  generatePayQrCode: {
    method: 'POST',
    url: 'generateQrCode'
  },
  getTimes: {
    method: 'POST',
    url: 'getTimes'
  },
  submitForm: {
    method: 'POST',
    url: 'submitForm'
  },
  updateVersion: {
    method: 'POST',
    url: 'updateVersion'
  },
}

const Api = new MyHttp({}, ALL_API);
export default Api;