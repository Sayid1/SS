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
  //提交form id
  submitForm: {
    method: 'POST',
    url: 'submitForm'
  },
  //是否要补水
  isNeededPatchWater: {
    method: 'POST',
    url: 'isNeededPatchWater'
  },
  //今天是否浇水
  isWaterToday: {
    method: 'POST',
    url: 'isWaterToday'
  },
  //任务完成提交状态
  finish: {
    method: 'POST',
    url: 'finish'
  },
  //补水卡的数量
  getPatchCard: {
    method: 'POST',
    url: 'getPatchCard'
  },
  //邀请的好友列表
  inviteList: {
    method: 'POST',
    url: 'inviteList'
  },
}

const Api = new MyHttp({}, ALL_API);
export default Api;