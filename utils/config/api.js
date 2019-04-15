import MyHttp from './request.js';
import {
  myStore
} from '../tools/store';

//所有的请求
const ALL_API = {
  //登陆授权
  getOpenId: {
    method: 'POST',
    url: 'getOpenId'
  },
  submitForm: {
    method: 'POST',
    url: 'submitForm'
  },

}

const Api = new MyHttp({}, ALL_API);
export default Api;