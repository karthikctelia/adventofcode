import { seeds, seedToSoil, 
    soiltoFertilizer, fertilizerToWater, 
    waterToLight, lightToTemperature,
    temperatureToHumidity, humidityToLocation,
 } from './day5Data.js';

function getSeedLocation() {
    let itemRange = [];
    for(let i=0; i < seeds.length; i++){
        const soilRange = findItemRange(parseInt(seeds[i]), seedToSoil);
        const soil  = findMappedItem(parseInt(seeds[i]), findItemRange(parseInt(seeds[i]), seedToSoil));
        const fertilizerRange = soil ? findItemRange(parseInt(soil), soiltoFertilizer) : '';
        const fertilizer = soil ? findMappedItem(parseInt(soil), findItemRange(parseInt(soil), soiltoFertilizer)) : '';
        const water = fertilizer ? findMappedItem(parseInt(fertilizer), findItemRange(parseInt(fertilizer), fertilizerToWater)): '';
        const light = water ? findMappedItem(parseInt(water), findItemRange(parseInt(water), waterToLight)): '';
        const temperature = light ? findMappedItem(parseInt(light), findItemRange(parseInt(light), lightToTemperature)): '';
        const humidity = temperature ? findMappedItem(parseInt(temperature), findItemRange(parseInt(temperature), temperatureToHumidity)): '';
        const location = humidity ? findMappedItem(parseInt(humidity), findItemRange(parseInt(humidity), humidityToLocation)): '';
        itemRange.push({
            seed: seeds[i],
            soilRange,
            soil,
            fertilizerRange,
            fertilizer,
            water,
            light,
            temperature,
            humidity,
            location
        });
    }
    return itemRange.sort(function(a, b) {
        return a.location - b.location
    });
}

function rangeSplitter(selectedRange){
    const [srcStart, destStart, rangeLength]  = selectedRange.split(' ');
    return {
        srcStart: parseInt(srcStart), 
        destStart: parseInt(destStart), 
        rangeLength: parseInt(rangeLength) 
    }
}

function findItemRange(item, range) {
    let selectedRange = '';
    let selectedRanges = [];
    for(let i=0; i < range.length; i++) {
        const {srcStart, rangeLength}  = rangeSplitter(range[i]);
        if(item >= srcStart && item <= srcStart+rangeLength){
            selectedRange = range[i];
            break;
        }
        continue;
    }
    return selectedRange;
}

function findMappedItem(item, selectedRange){
    const {srcStart, destStart} = rangeSplitter(selectedRange);
    return destStart + (item - srcStart);
}

console.log(getSeedLocation());