import {ITransportData} from '@/interfaces/iTransportData';
import TransportData from '@/helpers/transportData';
import moment from "moment";
import _ from "lodash";
import IAllTransportData from '@/interfaces/iAllTransportData';
export default class AllTransportData implements IAllTransportData {
    _lines: Array<ITransportData>;
    Departures!: {
        City: string;
        Lines: ITransportData[];
    }[];

    constructor(lines: Array<ITransportData>) {
        this._lines = lines;
        this.parse();
    };

    private parse(): void {
        const parsedAndFiltered = _(this._lines)
            /* .filter( (l) => {
                const transportIsInCorrectDirection = /(Malmö|Lund)/g.test(l.Towards);
                return transportIsInCorrectDirection;
            }) */
            .map((l) => {
                return new TransportData(l)
            })            
            .orderBy(['JourneyDateTime'],['asc'])
            .groupBy(l => l.City)
            .map( (value, prop) => {
               return {
                    City: prop,
                    Lines: value
                }
            })
            .value();
        this.Departures = parsedAndFiltered;
    }
}
