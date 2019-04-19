import {
  USER_ID
} from '../../utils/config/config.js'
import Api from '/../../utils/config/api.js'
import regeneratorRuntime from '../../utils/runtime.js'
import Dialog from '../../dist/dialog/dialog'

let waterCalendar
Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    selectedDay: '',
    showDateSheet: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime() - 31536000000,
    maxDate: new Date().getTime() + 31536000000,
    cardNum: 0,
    waterCalendar: [],
    waterBtnText: '去浇水',
    waterBtnDisable: true
  },
  async onShow() {
    Api.getPatchCard().then(res => {
      this.setData({
        cardNum: res.data.data.cardNum
      })
    })
    const res = await Api.waterRecord()
    const waterRecords = res.data.data.waterRecords || []
    waterCalendar = waterRecords.map(item => item.date)

    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let today = year + '-' + ('' + month).padStart(2, 0) + '-' + ('' + now.getDate()).padStart(2, 0)

    this.dateInit()
    this.setData({
      year: year,
      month: month,
      selectedDay: today,
      isToday: today,
      waterBtnDisable: waterCalendar.includes(today)
    })
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月第一天对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let endWeek = new Date(year + ',' + (month + 1) + ',' + dayNums).getDay(); //目标月最后一天对应的星期
    let today = +new Date()
    let obj = {};
    let isToday
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    for (let i = 1; i <= dayNums; i++) {
      isToday = year + '-' + ('' + (month + 1)).padStart(2, 0) + '-' + ('' + i).padStart(2, 0)
      obj = {
        isToday: isToday,
        dateNum: i,
        weight: 5,
        disable: +new Date(year, month, i, 23, 23, 59) < today,
        watering: waterCalendar.includes(isToday)
      }
      dateArr.push(obj);
    }
    if (startWeek !== 0) { // 如果目标月不是从周日开始
      let lastDayNums = new Date(year, month, 0).getDate(); // 获取上一个月有多少天

      for (let i = 0; i < startWeek; i++) {
        isToday = year + '-' + ('' + month).padStart(2, 0) + '-' + ('' + lastDayNums).padStart(2, 0)
        dateArr.unshift({
          isToday: isToday, // TODO 上一年
          dateNum: lastDayNums--,
          weight: 5,
          disable: true,
          watering: waterCalendar.includes(isToday)
        })
      }
    }
    if (endWeek !== 6) { // 如果目标月不是以周六结束
      let j = 0
      for (let i = endWeek; i < 6; i++) {
        let afterNextMonth = (nextMonth + 1) > 11 ? 1 : (nextMonth + 1);
        isToday = year + '-' + ('' + afterNextMonth).padStart(2, 0) + '-' + ('' + ++j).padStart(2, 0)
        dateArr.push({
          isToday: isToday, // TODO 上一年
          dateNum: j,
          weight: 5,
          disable: true,
          watering: waterCalendar.includes(isToday)
        })
      }
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  /**
   * 上月切换
   */
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  toFeedSheep() {
    if (this.data.waterBtnText === '去浇水') {
      wx.switchTab({
        url: "/pages/index/index"
      })
    } else {
      Dialog.confirm({
        title: '',
        message: '是否消耗一张补浇水卡进行补浇水'
      }).then(() => {
        console.log('quer')
        // on confirm
      }).catch(() => {
        console.log('quxiao')
        // on cancel
      });
    }
  },
  openDateSheet() {
    this.setData({
      showDateSheet: true
    })
  },
  confirmDate(e) {
    const date = new Date(e.detail)
    const year = date.getFullYear()
    const month = date.getMonth()
    this.closeDateSheet()
    this.setData({
      year,
      month: month + 1
    })
    this.dateInit(year, month)
  },
  closeDateSheet() {
    this.setData({
      showDateSheet: false
    })
  },
  clickDay(e) {
    var obj = e.currentTarget.dataset.item
    var date = obj.isToday
    var year = Number(date.substr(0, 4))
    var month = Number(date.substr(5, 2))
    var day = Number(date.substr(8))

    var data
    if (year !== this.data.year || month !== this.month) {
      data = {
        year,
        month,
        selectedDay: date
      }
      this.dateInit(year, month - 1);
    } else {
      data = {
        selectedDay: date
      }
    }
    if (obj.watering) {
      data.waterBtnText = '已浇水'
      data.waterBtnDisable = true
    } else if (this.data.isToday === date){
      data.waterBtnText = '去浇水'
      data.waterBtnDisable = false
    } else if (new Date(date) > new Date()) {
      data.waterBtnText = '未开始'
      data.waterBtnDisable = true
    } else {
      data.waterBtnDisable = false
      data.waterBtnText = '去补水'
    }

    this.setData(data)
  },
  onShareAppMessage() {
    return {
      path: "/pages/index/index?user_id=" + wx.getStorageSync(USER_ID)
    }
  }
})