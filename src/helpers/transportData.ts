import {ITransportData} from '@/interfaces/iTransportData';
import moment from "moment";
export default class TransportData implements ITransportData {
    _line: ITransportData;
    City!: string;
    JourneyDateTime!: string;
    LineTypeName!: string;
    Name!: string;
    Towards!: string;    
    RealTimeInfo!: {
        NewDepPoint: string;
        DepTimeDeviation: string;
        DepDeviationAffect: string;
    }

    constructor(line: ITransportData) {
        this._line = line;
        this.parse();
    }

    private parse(): void {
        if (this._line) {

            const cityMatches = this._line?.Towards?.match(/^([^\s])+/);
            this.City = cityMatches ? cityMatches[0] : '';

            this.Name = this._line.Name ? this._line.Name : '';

            this.JourneyDateTime = this._line.JourneyDateTime ? 
                (new Date(this._line.JourneyDateTime))
                    .toLocaleTimeString('se-SE', { hour: 'numeric', hour12: false, minute: 'numeric' }) : '';

            this.LineTypeName = this._line.LineTypeName ? this._line.LineTypeName : '';

            this.Towards = this._line.Towards ?  this._line.Towards : '';

            this.RealTimeInfo = {
                NewDepPoint : this._line.RealTimeInfo?.NewDepPoint ? this._line.RealTimeInfo?.NewDepPoint : '',
                DepTimeDeviation : this._line.RealTimeInfo?.DepTimeDeviation ? this._line.RealTimeInfo?.DepTimeDeviation : '',
                DepDeviationAffect : this._line.RealTimeInfo?.DepDeviationAffect ? this._line.RealTimeInfo?.DepDeviationAffect : '',
            };

        }
    }

}