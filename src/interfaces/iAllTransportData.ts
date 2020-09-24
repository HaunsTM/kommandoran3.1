import {ITransportData} from '@/interfaces/iTransportData';
export interface IAllTransportData {
    
    Departures: {
        City: string;
        Lines: ITransportData[]
    }[];
}
