<template>
    <v-card>
        <v-card-title class="headline">
        Buss från Dalby bsstn
        </v-card-title>

        <article 
            v-for="(departure, index) in departures"
            :key="index">

            <v-card-subtitle>
                {{departure.city}}
            </v-card-subtitle>
            
                <v-simple-table dense fixed-header class="departures">
                    <template>
                    <thead>
                        <tr>
                            <th>
                                tid
                            </th>
                            <th>
                                linje
                            </th>
                            <th>
                                mot
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="line in departure.lines"
                            :key="line.journeyDateTime"
                            >
                            <td>{{ line.journeyTime }}</td>
                            <td>{{ line.name }}</td>
                            <td>{{ line.towards }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
        </article>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="this.close"
            >
                Stäng
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';


import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { namespace } from 'vuex-class';

import AllTransportData from '@/helpers/allTransportData';
import IAllTransportData from '@/interfaces/iAllTransportData';
import IDeparture from '@/interfaces/iDeparture';

const TransportData = namespace('TransportData');
@Component({
    components: {
    },
})
export default class KommandoranFooterTransportDetails extends Vue {
    @TransportData.Getter
    private currentTransportData!: IAllTransportData;
    
    public get transportData(): IAllTransportData {
        return this.currentTransportData;
    }

    public get departures(): IDeparture[] | null {
        if (this.currentTransportData) {
            return this.currentTransportData.Departures;
        }
        return null;
    }

    public close(): void {
        this.$emit('close');
    }
    
}

</script>

<style scope>
    .departures {
        max-width: 50%;
    }
    

</style>