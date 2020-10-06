import {ITransportData} from '@/interfaces/iTransportData';
export default class TransportData implements ITransportData {
    line: ITransportData;
    city!: string;
    journeyDateTime!: string;
    lineTypeName!: string;
    name!: string;
    towards!: string;    
    realTimeInfo!: {
        newDepPoint: string;
        depTimeDeviation: string;
        depDeviationAffect: string;
    }

    constructor(line: ITransportData) {
        this.line = line;
        this.parse();
    }

    private parse(): void {
        if (this.line) {

            const cityMatches = this.line?.towards?.match(/^([^\s])+/);
            this.city = cityMatches ? cityMatches[0] : '';

            this.name = this.line.name ? this.line.name : '';

            this.journeyDateTime = this.line.journeyDateTime ? 
                (new Date(this.line.journeyDateTime))
                    .toLocaleTimeString('se-SE', { hour: 'numeric', hour12: false, minute: 'numeric' }) : '';

            this.lineTypeName = this.line.lineTypeName ? this.line.lineTypeName : '';

            this.towards = this.line.towards ?  this.line.towards : '';

            this.realTimeInfo = {
                newDepPoint : this.line.realTimeInfo?.newDepPoint ? this.line.realTimeInfo?.newDepPoint : '',
                depTimeDeviation : this.line.realTimeInfo?.depTimeDeviation ? this.line.realTimeInfo?.depTimeDeviation : '',
                depDeviationAffect : this.line.realTimeInfo?.depDeviationAffect ? this.line.realTimeInfo?.depDeviationAffect : '',
            };
        }
    }
}