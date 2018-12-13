import { get, post } from './http'
export const apiUnitALL = p => post('Unitinfo.asmx/GetUnitinfoAll', p);
