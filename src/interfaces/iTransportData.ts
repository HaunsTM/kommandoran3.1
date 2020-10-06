export interface ITransportData {
    city: string;
    name: string;
    journeyDateTime: string;
    lineTypeName: string;
    towards: string;
    realTimeInfo: {
        newDepPoint: string;
        depTimeDeviation: string;
        depDeviationAffect: string;
    }
}
