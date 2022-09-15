export interface Defect
{
    "QCRID": string,
    "QCRID_LINENUM": string,
    "ERRORID": string,
    "ERRORGROUPID": string,
    "LINENUM": number,
    "BU_ACTION_DESC": string,
    "DATAAREAID": number,
    "QCRREPAIRINSTRUCTIONSTR": number,
    "TRANSFERRED": number,
    "CROSSSTARTINCL": number,
    "CROSSENDINCL": number,
    "LGTHSTARTINCL": number,
    "LGTHENDINCL": number,
    "CROSSEND": number,
    "CROSSSTART": number,
    "LGTHEND": number,
    "LGTHSTART": number,
    "WRINKLERATIO": number,
    "BUSHINGS": number,
    "BONDLINEDEFECT_DESC": string,
    "QCRREPAIRINSTRUCTION": number,
    "LENGTHWISESTART": number,
    "CROSSWISESTART": number,
    "LENGTHWISESTART_DESC": string,
    "CROSSWISESTART_DESC": string,
    "ROOTGEOMETRY": number,
    "CROSSGENAREA": number,
    "CROSSGENAREA_DESC": string,
    "POSBUSH": string,
    "QCRPRODTRANSID": string,
    "QCRINTERNALEXTERNAL_DESC": string,
    "FACTORY": number,
    "LOCATIONID": string,
    "INVENTSERIALID": string,
    "DATE_":string,
    "DATE_YEARPART": number,
    "DATE_MONTHPART": number,
    "BLADECOMPONENT": string,
    "COMPONENTTYPE": string,
    "MOULDID": string,
    "ERRORLEVEL": string,
    "ARMTYPE":string,
    "QCRERRORFOUND": string,
    "QCRERRORFOUND_DESC": string,
    "INSPECTION_METHOD_DESC": string,
    "STATUS": number,
    "LGTHSTART_DIM_DESC": string,
    "LGTHSTART_DIM_KEY": number,
    "FACTORYID": number,
    "NEW_SERIALID": string,
    "LOCALRESPONSIBLELVL2": string,
    "FWDEFECT_Desc": string,
    "EMPLOYEE": string,
    "LGTHSTART_DIM_1M_DESC": string,
    "LGTHSTART_DIM_1M_KEY": number,
    "TOTAL_NUMBEROFGLASSLAYERS": number,
    "REINSPECTEDNAME": string
}

export interface DefectsList
{
    defects: Defect[]
}
export interface DefectDTO
{
    defect: Defect
}
