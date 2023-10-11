import { formatJSON, parseJSON,jsonJoinRemak } from "./helper";

export const jsonLeft = {
  modelJson: {
    strategyName: "南京高德竞价",
    updatedBy: "sys11",
    cityCode: "320100",
    strategyUnitParamList: [
      {
        strategyUnitName: "策略名称",
        strategyUnitType: 3,
        strategyRemark: "--",
        strategyUnitCode: "",
      },
    ],
    extra: {
      accountId: "426e0af597a74bff882feb1aea6e3797",
    },
    strategyType: 2,
  },
  modelId: "41f279d8b1fb41a6af1179d1d0f15003",
  moduleName: "marketing-web-api",
  modelDesc: {
    apiModelValue: "冒泡策略树1",
    propertyMap: {
      cityCode: "策略适配城市(多个英文逗号,拼接)",
      strategyName: "策略名称",
      "strategyUnitParamList.strategyUnitName": "属性name",
      "strategyUnitParamList.strategyRemark": "备注",
      "strategyUnitParamList.strategyPriority": "策略优先级",
      uuid: "策略uuid",
      strategyType: "策略类型",
      strategyUnitParamList: "策略单元名称",
    },
  },
};
export const jsonRight = {
  modelJson: {
    // "<span data-remarks='注释1'>strategyName</span>": "南京高德竞价2", // 注释1
    strategyName: "南京高德竞价2",
    updatedBy: "sys11",
    testJSON:
      '[{"sceneType":"222","sceneUser":[{"model":2,"value":"1"},{"model":2,"value":"1"}]},{"sceneTime":[{"model":1,"value":[]},{"model":2},{"model":3},{"model":4}],"sceneType":"1"},{"sceneLocation":[{"model":1,"type":4,"value":[{"address":"南京市苏源大道19号江宁九龙湖国际企业总部园","circle":"118.811221,31.911858;500","lat":"31.911858","lng":"118.811221","shortAddress":"江宁九龙湖国际企业总部园"},{"address":"南京市玉兰路98号南京南站","circle":"118.798039,31.96875;500","lat":"31.96875","lng":"118.798039","shortAddress":"南京南站"},{"address":"南京市空港南路南京禄口国际机场","circle":"118.871181,31.731634;1523","lat":"31.731634","lng":"118.871181","shortAddress":"南京禄口国际机场"},{"address":"南京市新街口汉中路89号金鹰国际广场(新街口店)","circle":"118.779772,32.041429;500","lat":"32.041429","lng":"118.779772","shortAddress":"金鹰国际广场(新街口店)"},{"address":"南京市汤山街道圣湖路8号江苏园博园","circle":"119.012382,32.075695;500","lat":"32.075695","lng":"119.012382","shortAddress":"江苏园博园"},{"address":"南京市中山东路189号(大行宫地铁站1号口步行140米)南京图书馆","circle":"118.795711,32.04195;500","lat":"32.04195","lng":"118.795711","shortAddress":"南京图书馆"},{"address":"南京市双龙大道1698号(百家湖地铁站1号口步行130米)景枫中心","circle":"118.820177,31.929911;500","lat":"31.929911","lng":"118.820177","shortAddress":"景枫中心"},{"address":"南京市(在建)9号线;1号线;3号线南京站(地铁站)","circle":"118.796509,32.089322;500","lat":"32.089322","lng":"118.796509","shortAddress":"南京站(地铁站)"},{"address":"南京市栖霞街道广月路8号银茂控股(集团)有限公司工业园","circle":"118.913454,32.127272;500","lat":"32.127272","lng":"118.913454","shortAddress":"银茂控股(集团)有限公司工业园"},{"address":"南京市雨合路与行知路交叉口西南140米南京江北新区研创园","circle":"118.605826,32.023179;500","lat":"32.023179","lng":"118.605826","shortAddress":"南京江北新区研创园"},{"address":"南京市玉兰路98号南京南站F3层南京南站B候车区","circle":"118.798535,31.968921;500","lat":"31.968921","lng":"118.798535","shortAddress":"南京南站B候车区"},{"address":"南京市天文台路与天文路交叉口东160米紫金山登山道(入口)","circle":"118.825022,32.058446;500","lat":"32.058446","lng":"118.825022","shortAddress":"紫金山登山道(入口)"},{"address":"上海市申达一路1号上海虹桥国际机场2号航站楼","circle":"121.328608,31.194205;1263","lat":"31.194205","lng":"121.328608","shortAddress":"上海虹桥国际机场2号航站楼"},{"address":"上海市迎宾大道6000号上海浦东国际机场","circle":"121.808682,31.142267;3021","lat":"31.142267","lng":"121.808682","shortAddress":"上海浦东国际机场"}]},{"model":2,"type":4,"value":[{"address":"南京市天文台路与天文路交叉口东160米紫金山登山道(入口)","circle":"118.825022,32.058446;500","lat":"32.058446","lng":"118.825022","shortAddress":"紫金山登山道(入口)"}]}],"sceneType":"2"},{"sceneAmount":[{"model":1,"value":"{}"},{"model":2,"value":"{}"},{"model":3,"value":"{}"}],"sceneType":"3"},{"sceneRegion":[{"model":1,"value":"1"},{"model":2},{"model":3}],"sceneType":"12"},{"sceneFrequency":[{"model":1,"value":{"status":"1"}},{"model":2,"value":{"limit":1,"status":"0"}}],"sceneType":"14"},{"carPoolStrategy":[{"model":1,"value":"1"},{"model":2,"value":""}],"sceneConditionType":"0","sceneType":"23"},{"sceneCity":{"model":0},"sceneType":"4"},{"scenePersonalQuota":[{"model":0,"value":"1"},{"model":1}],"sceneType":"13"},{"sceneRoute":[{"model":1,"value":"1"},{"model":2}],"sceneType":"5"},{"sceneType":"10","sceneVehicle":[{"bizType":4,"expandBizLine":"6","value":"1","vehicleLevel":1,"vehicleName":"快享"},{"bizType":15,"expandBizLine":"18","value":"1","vehicleLevel":1,"vehicleName":"阳光经济型"},{"bizType":6,"expandBizLine":"6","value":"1","vehicleLevel":10,"vehicleName":"惠享"},{"bizType":2,"expandBizLine":"6","value":"1","vehicleLevel":2,"vehicleName":"舒适型"},{"bizType":0,"expandBizLine":"11","value":"1","vehicleLevel":0,"vehicleName":"特享"},{"bizType":0,"expandBizLine":"17","value":"1","vehicleLevel":0,"vehicleName":"企业用车速享"},{"bizType":0,"expandBizLine":"13","value":"1","vehicleLevel":0,"vehicleName":"企业拼车"}]},{"sceneRemark":[{"model":1,"value":2},{"model":2}],"sceneType":"7"},{"sceneApproval":[{"model":2,"value":[{"grade":"1","status":"0"},{"grade":"2","status":"0"}]}],"sceneType":"8"},{"scenePersonalPay":{"model":1},"sceneType":"9"}]',
    cityCode: "320100",
    strategyUnitParamList: [
      {
        strategyUnitName: "策略名称1",
        strategyUnitType: 3,
        strategyRemark: "--",
        strategyUnitCode: "",
      },
    ],
    extra: {
      accountId: "426e0af597a74bff882feb1aea6e3797",
    },
    strategyType: 2,
    // "strategyName":"高德智慧投竞价111","updatedBy":"2","cityCode":"320100","strategyUnitParamList":[{"strategyUnitName":"策略名称","strategyUnitType":3,"strategyRemark":"--","patternRuleContent":[],"rewardInventory":-1,"strategyPriority":1,"rewardParam":{"keepDiscount":0,"diamondStep":1,"couponType":1,"couponParam":{"floatingProportion":20,"highestMoney":20,"money":0,"discount":12},"assembleName":"策略类型：智慧投</br>平均补贴率：12%</br>最大折扣金额：20元</br>浮动比例：20%","expectRank":-2},"strategyUnitCode":""}],"extra":{"accountId":"426e0af597a74bff882feb1aea6e3797"},"operationType":"BUBBLING_STRATEGY_CREATE","emulateFlag":0,"strategyStatus":1,"strategyDesc":"","strategyExpect":"","strategyType":2
  },
  modelId: "41f279d8b1fb41a6af1179d1d0f15003",
  moduleName: "marketing-web-api",
  modelDesc: {
    apiModelValue: "冒泡策略树1",
    propertyMap: {
      cityCode: "策略适配城市(多个英文逗号,拼接)",
      strategyName: "策略名称",
      "strategyUnitParamList.strategyUnitName": "属性name",
      "strategyUnitParamList.strategyRemark": "备注",
      "strategyUnitParamList.strategyPriority": "策略优先级",
      uuid: "策略uuid",
      strategyType: "策略类型",
      strategyUnitParamList: "策略单元名称",
    },
  },
};

const leftJsonJoinRemark = jsonJoinRemak(jsonLeft.modelJson,jsonLeft.modelDesc.propertyMap)
const rightJsonJoinRemark = jsonJoinRemak(jsonRight.modelJson,jsonRight.modelDesc.propertyMap)

export const parseJSONData1 = parseJSON(leftJsonJoinRemark);

export const parseJSONData2 = parseJSON(rightJsonJoinRemark);

console.log("parseJSONData2", parseJSONData2);
