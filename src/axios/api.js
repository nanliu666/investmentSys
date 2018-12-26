import {
  get,
  post
} from './http'
// 单元信息接口
export const GetUnitinfoAll = p => post('Unitinfo.asmx/GetUnitinfoAll', p); //获取当前用户所有单元信息
export const GetCompanyies = p => post('Unitinfo.asmx/GetCompanyies', p); //获取当前用户所有公司信息
export const GetPropertys = p => post('Unitinfo.asmx/GetPropertys', p); //获取当前用户所有项目信息
export const GetPropertyAreas = p => post('Unitinfo.asmx/GetPropertyAreas', p); //获取当前用户所有分区信息
export const GetBlocks = p => post('Unitinfo.asmx/GetBlocks', p); //获取当前用户所有楼栋信息
export const GetUnitByBlock = p => post('Unitinfo.asmx/GetUnitByBlock', p); //获取当前用户所有楼栋信息

// 商机信息接口
export const GetBizOpportunity = p => post('BizOpportunity.asmx/GetBizOpportunity', p); //获取商机信息
export const GetBizOpportunityDetail = p => post('BizOpportunity.asmx/GetBizOpportunityDetail', p); //获取商机详情信息
export const EditBizOpportunity = p => post('BizOpportunity.asmx/EditBizOpportunity', p); //新增，修改商机信息
export const DeleteBizOpportunity = p => post('BizOpportunity.asmx/DeleteBizOpportunity', p); //删除商机信息
export const GetBizopprtunityDropdown = p => post('BizOpportunity.asmx/GetBizopprtunityDropdown', p); //获取商机下拉列表

// 商机业务操作接口
export const BizProspecttransfer = p => post('BizOpportunity.asmx/BizProspecttransfer', p); //移交商机信息
export const DropProspecttransfer = p => post('BizOpportunity.asmx/DropProspecttransfer', p); //流失商机信息
export const GetAgentsDropdown = p => post('BizOpportunity.asmx/GetAgentsDropdown', p); //获取业务员信息（下拉）
export const GetFailtypeDropdown = p => post('BizOpportunity.asmx/GetFailtypeDropdown', p); //获取流失原因信息（下拉）
export const EditFollowUp = p => post('BizOpportunity.asmx/EditFollowUp', p); //新增、修改跟踪信息
export const DeleteFollowup = p => post('BizOpportunity.asmx/DeleteFollowup', p); //删除商机信息   ？？为什么有两个删除
export const GetFollowUp = p => post('BizOpportunity.asmx/GetFollowUp', p); //获取跟踪信息
export const GetFollowupDropdown = p => post('BizOpportunity.asmx/GetFollowupDropdown', p); //获取跟踪信息下拉框
export const GetFollowUpDetail = p => post('BizOpportunity.asmx/GetFollowUpDetail', p); //获取跟踪详情信息

// 客户信息模块接口
export const GetCustomer = p => post('CustomerMgmt.asmx/GetCustomer', p); //获取客户信息
export const GetCustomerDetail = p => post('CustomerMgmt.asmx/GetCustomerDetail', p); //获取客户详细信息
export const EditCustomer = p => post('CustomerMgmt.asmx/EditCustomer', p); //新增修改客户信息
export const DeleteCustomer = p => post('CustomerMgmt.asmx/DeleteCustomer', p); //新增修改客户信息

// 合同信息模块接口
export const GetContractMgmt = p => post('ContractMgmt.asmx/GetContractMgmt', p); //获取合同列表信息
export const GetContractMgmtDetail = p => post('ContractMgmt.asmx/GetContractMgmtDetail', p); //获取合同详情
