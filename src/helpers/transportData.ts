import {ITransportData} from '@/interfaces/iTransportData';
import moment from "moment";
export default class TransportData implements ITransportData {
    _line!: any = {};
    City!: string;
    Name!: string;
    JourneyTime!: string;
    LineTypeName!: string;
    Towards!: string;
    NewDepPoint!: string;
    DepTimeDeviation!: string;
    DepDeviationAffect!: string;

    constructor(line: {}) {
        this._line = line;
        this.parse();
    };

    private parse(): void {
        this.City = this._line.Towards.match(/^([^\s])+/)[0];
        this.Name= this._line.Name,
        this.JourneyTime = (new Date(this._line.JourneyDateTime)).toLocaleTimeString('se-SE', { hour: 'numeric', hour12: false, minute: 'numeric' }),
        this.LineTypeName = this._line.LineTypeName;
        this.Towards = this._line.Towards,
        this.NewDepPoint = this._line.RealTimeInfo ? this._line.RealTimeInfo.NewDepPoint : '';
        this.DepTimeDeviation =  this._line.RealTimeInfo ? this._line.RealTimeInfo.DepTimeDeviation : '';
        this.DepDeviationAffect = this._line.Real;
    }

}