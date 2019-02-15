import {
  get,
  post
} from './http'
import axios from "axios"

// 单元信息接口
const baseHead = `http://gz.ifca.com.cn:9999/ydzs/WebService/MobileMerchants/`
const platformHead = ` http://gz.ifca.com.cn:9999/RMSApp6.0/api/`
const workFlowHead = ` http://gz.ifca.com.cn:9999/ydzs/`
const mapHead = `http://demo.ifca.com.cn/ifca_rms2843/` //平面图
export const GetUnitinfoAll = p => post(`${baseHead}Unitinfo.asmx/GetUnitinfoAll`, p); //获取当前用户所有单元信息
export const GetCompanyies = p => post(`${baseHead}Unitinfo.asmx/GetCompanyies`, p); //获取当前用户所有公司信息
export const GetPropertys = p => post(`${baseHead}Unitinfo.asmx/GetPropertys`, p); //获取当前用户项目信息
export const GetPropertyAreas = p => post(`${baseHead}Unitinfo.asmx/GetPropertyAreas`, p); //获取当前用户所有分区信息
export const GetBlocks = p => post(`${baseHead}Unitinfo.asmx/GetBlocks`, p); //获取当前用户所有楼栋信息
export const GetUnitByBlockCompanyProject = p => post(`${baseHead}Unitinfo.asmx/GetUnitByBlockCompanyProject`, p); //获取当前用户所有楼栋信息

// 商机信息接口
export const GetBizOpportunity = p => post(`${baseHead}BizOpportunity.asmx/GetBizOpportunity`, p); //获取商机信息
export const GetBizOpportunityDetail = p => post(`${baseHead}BizOpportunity.asmx/GetBizOpportunityDetail`, p); //获取商机详情信息
export const EditBizOpportunity = p => post(`${baseHead}BizOpportunity.asmx/EditBizOpportunity`, p); //新增，修改商机信息
export const DeleteBizOpportunity = p => post(`${baseHead}BizOpportunity.asmx/DeleteBizOpportunity`, p); //删除商机信息
export const GetBizopprtunityDropdown = p => post(`${baseHead}BizOpportunity.asmx/GetBizopprtunityDropdown`, p); //获取商机下拉列表

// 商机业务操作接口
export const BizProspecttransfer = p => post(`${baseHead}BizOpportunity.asmx/BizProspecttransfer`, p); //移交商机信息
export const DropProspecttransfer = p => post(`${baseHead}BizOpportunity.asmx/DropProspecttransfer`, p); //流失商机信息
export const GetAgentsDropdown = p => post(`${baseHead}BizOpportunity.asmx/GetAgentsDropdown`, p); //获取业务员信息（下拉）
export const GetFailtypeDropdown = p => post(`${baseHead}BizOpportunity.asmx/GetFailtypeDropdown`, p); //获取流失原因信息（下拉）
export const EditFollowUp = p => post(`${baseHead}BizOpportunity.asmx/EditFollowUp`, p); //新增、修改跟踪信息
export const DeleteFollowup = p => post(`${baseHead}BizOpportunity.asmx/DeleteFollowup`, p); //删除商机信息   ？？为什么有两个删除
export const GetFollowUp = p => post(`${baseHead}BizOpportunity.asmx/GetFollowUp`, p); //获取跟踪信息
export const GetFollowupDropdown = p => post(`${baseHead}BizOpportunity.asmx/GetFollowupDropdown`, p); //获取跟踪信息下拉框
export const GetFollowUpDetail = p => post(`${baseHead}BizOpportunity.asmx/GetFollowUpDetail`, p); //获取跟踪详情信息

// 客户信息模块接口
export const GetCustomer = p => post(`${baseHead}CustomerMgmt.asmx/GetCustomer`, p); //获取客户信息
export const GetCustomerDetail = p => post(`${baseHead}CustomerMgmt.asmx/GetCustomerDetail`, p); //获取客户详细信息
export const EditCustomer = p => post(`${baseHead}CustomerMgmt.asmx/EditCustomer`, p); //新增修改客户信息
export const DeleteCustomer = p => post(`${baseHead}CustomerMgmt.asmx/DeleteCustomer`, p); //新增修改客户信息
export const GetCustomerDropdown = p => post(`${baseHead}CustomerMgmt.asmx/GetCustomerDropdown`, p); //获取联系人下拉

// 合同信息模块接口
export const GetContractMgmt = p => post(`${baseHead}ContractMgmt.asmx/GetContractMgmt`, p); //获取合同列表信息
export const GetContractMgmtDetail = p => post(`${baseHead}ContractMgmt.asmx/GetContractMgmtDetail`, p); //获取合同详情


// 预定信息接口
export const GetReserveMgmt = p => post(`${baseHead}ReserveMgmt.asmx/GetReserveMgmt`, p); //获取预定列表信息
export const GetReserveMgmtDetail = p => post(`${baseHead}ReserveMgmt.asmx/GetReserveMgmtDetail`, p); //获取预定详情信息
export const EditReserveMgmt = p => post(`${baseHead}ReserveMgmt.asmx/EditReserveMgmt`, p); //新增，修改预定信息
export const DeleteReserveMgmt = p => post(`${baseHead}ReserveMgmt.asmx/DeleteReserveMgmt`, p); //删除预定信息
export const VoidReserveMgmt = p => post(`${baseHead}ReserveMgmt.asmx/VoidReserveMgmt`, p); //预定作废

// 首页信息接口
export const GetAgentDefaultPageNEW = p => post(`${baseHead}DefaultPage.asmx/GetAgentDefaultPageNEW`, p); //获取业务员首页统计数据
export const GetAgentDefaultPageChartNEW = p => post(`${baseHead}DefaultPage.asmx/GetAgentDefaultPageChartNEW`, p); //获取业务员首页图表统计数据

// 工作流接口
export const GetToDoDetail = p => post(`${baseHead}Workflow.asmx/GetToDoDetail`, p); //获取工作流详情信息
export const GetToDoHistory = p => post(`${baseHead}Workflow.asmx/GetToDoHistory`, p); //获取工作流历史信息
export const GetToDoFile = p => post(`${baseHead}Workflow.asmx/GetToDoFile`, p); //获取工作流附件
export const GetToDoFlows = p => post(`${baseHead}Workflow.asmx/GetToDoFlows`, p); //获取工作流流程状态

// 工作流业务操作接口
export const ActionApprove = p => post(`${baseHead}Workflow.asmx/ActionApprove`, p); //审批
export const ActionSubmit = p => post(`${baseHead}Workflow.asmx/ActionSubmit`, p); //提交
export const RejectAction = p => post(`${baseHead}Workflow.asmx/RejectAction`, p); //驳回
export const AddFlow = p => post(`${baseHead}Workflow.asmx/AddFlow`, p); //加签
export const GetUserInfo = p => post(`${baseHead}ReserveMgmt.asmx/GetUserInfo`, p); //获取加签用户信息
export const GetSubmitWorkflows = p => post(`${baseHead}Workflow.asmx/GetSubmitWorkflows`, p); //获取加签列表

//加签组织架构
export const GetUserId = p => post(`${workFlowHead}Workflow/Api/WFServices.asmx/GetUserId`, p); //获取加签用户信息



//平面图接口
export const GetBlockList = p => post(`${mapHead}PlanLayout/WebService/MapBusiness.asmx/GetBlockList
`, p)


// 消息通知接口接口
export const GetUserMessage = p => post(`${baseHead}Message.asmx/GetUserMessage`, p); //获取当前用户消息通知
export const GetUserMessageTotal = p => post(`${baseHead}Message.asmx/GetUserMessageTotal`, p); //获取当前用户消息通知总数

//以下为GET请求
// 预览下载
export const DocumentLibrary = p => get(`DocumentLibrary/Download.ashx`, p)

// 待办列表
export const getTodoList = p => get(`${platformHead}Message/getTodoList`, p)
