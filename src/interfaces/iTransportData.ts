export interface ITransportData {
    City: string;
    Name: string;
    JourneyDateTime: string;
    LineTypeName: string;
    Towards: string;
    RealTimeInfo: {
        NewDepPoint: string;
        DepTimeDeviation: string;
        DepDeviationAffect: string;
    }
}
