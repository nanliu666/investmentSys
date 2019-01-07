import {
  get,
  post
} from './http'
// 单元信息接口
const baseHead = `WebService/MobileMerchants/`
export const GetUnitinfoAll = p => post(`${baseHead}Unitinfo.asmx/GetUnitinfoAll`, p); //获取当前用户所有单元信息
export const GetCompanyies = p => post(`${baseHead}Unitinfo.asmx/GetCompanyies`, p); //获取当前用户所有公司信息
export const GetPropertys = p => post(`${baseHead}Unitinfo.asmx/GetPropertys`, p); //获取当前用户项目信息
export const GetPropertyAreas = p => post(`${baseHead}Unitinfo.asmx/GetPropertyAreas`, p); //获取当前用户所有分区信息
export const GetBlocks = p => post(`${baseHead}Unitinfo.asmx/GetBlocks`, p); //获取当前用户所有楼栋信息
export const GetUnitByBlock = p => post(`${baseHead}Unitinfo.asmx/GetUnitByBlock`, p); //获取当前用户所有楼栋信息

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

// 合同信息模块接口
export const GetContractMgmt = p => post(`${baseHead}ContractMgmt.asmx/GetContractMgmt`, p); //获取合同列表信息
export const GetContractMgmtDetail = p => post(`${baseHead}ContractMgmt.asmx/GetContractMgmtDetail`, p); //获取合同详情


// 预定信息接口
export const GetReserveMgmt = p => post(`${baseHead}ReserveMgmt.asmx/GetReserveMgmt`, p); //获取预定列表信息
export const GetReserveMgmtDetail = p => post(`${baseHead}ReserveMgmt.asmx/GetReserveMgmtDetail`, p); //获取预定详情信息
export const EditReserveMgmt = p => post(`${baseHead}ReserveMgmt.asmx/EditReserveMgmt`, p); //新增，修改预定信息
export const DeleteReserveMgmt = p => post(`${baseHead}ReserveMgmt.asmx/DeleteReserveMgmt`, p); //删除预定信息
export const VoidReserveMgmt = p => post(`${baseHead}ReserveMgmt.asmx/VoidReserveMgmt`, p); //预定作废
export const GetUserInfo = p => post(`${baseHead}ReserveMgmt.asmx/GetUserInfo`, p); //获取加签用户信息

// 预览下载  //这个接口不一样！！
export const DocumentLibrary = p => get(`DocumentLibrary/Download.ashx`, p)
