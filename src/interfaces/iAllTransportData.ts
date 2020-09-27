import {ITransportData} from '@/interfaces/iTransportData';
export default interface IAllTransportData {
    
    Departures: {
        City: string;
        Lines: ITransportData[]
    }[];
}
