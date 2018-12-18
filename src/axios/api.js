import { get, post } from './http'
export const apiUnitALL = p => post('Unitinfo.asmx/GetUnitinfoAll', p);
export const GetBizOpportunity = p => post('BizOpportunity.asmx/GetBizOpportunity', p); //获取商机信息
export const GetBizOpportunityDetail = p => post('BizOpportunity.asmx/GetBizOpportunityDetail', p); //获取商机详情信息
export const EditBizOpportunity = p => post('BizOpportunity.asmx/EditBizOpportunity', p); //新增，修改商机信息
export const DeleteBizOpportunity = p => post('BizOpportunity.asmx/DeleteBizOpportunity', p); //删除商机信息
export const GetBizopprtunityDropdown = p => post('BizOpportunity.asmx/GetBizopprtunityDropdown', p); //删除商机信息
