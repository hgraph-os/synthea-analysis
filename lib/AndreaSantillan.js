

import Andrea7_Santillán790_befab5de from '../data/Andrea7_Santillán790_befab5de-4562-37da-07d3-1a2b188b679a.json';

oCJoogbuqpJj35CLv
cDorXDxLqbHb334Cs
x6Xoj2pQ9A9sk23Dv
QbHQ2kYLJuRHoLZgx
BpBd6hkRaPjPNDr62





AndreaSantillan = {
    mostRecentVitals(){
        let result = [];

        let recentVital
        if(Array.isArray(Andrea7_Santillán790_befab5de.entry)){
            Andrea7_Santillán790_befab5de.entry.forEach(function(record){
                if(get(record, 'resource.resourceType') === "Observation"){

                }
            })
        }

        result.push

        return result;
    }
}

export default AndreaSantillan;