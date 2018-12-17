import { get, post } from './http'
export const apiUnitALL = p => post('Unitinfo.asmx/GetUnitinfoAll', p);
export const GetBizOpportunity = p => post('BizOpportunity.asmx/GetBizOpportunity', p); //获取商机信息
export const GetBizOpportunityDetail = p => post('BizOpportunity.asmx/GetBizOpportunityDetail', p); //获取商机详情信息
