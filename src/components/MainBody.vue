<template>
    <div class="py-5 ml-5 pl-5">
        <div class="container">
            <div class="row align-items-center ">
                <div class="col-md-2 border text-center bg-light">
                    <div class="column-header">
                        Unit
                        <span v-if="sortedColumn === 'Unit'" :class="sorted ? 'triangle-up' : 'triangle-down'" @click="sortTableBy('Unit')"></span> 
                        <span v-else class="triangle-down" @click="sortTableBy('Unit')"></span>
                    </div>
                </div>
                <div class="col-md-2 border text-center bg-light">
                    <div class="column-header">
                        Current Station
                        <span v-if="sortedColumn === 'CurrentStation'" :class="sorted ? 'triangle-up' : 'triangle-down'" @click="sortTableBy('CurrentStation')"></span>
                        <span v-else class="triangle-down" @click="sortTableBy('CurrentStation')"></span>
                    </div>
                </div>
                <div class="col-md-2 border text-center bg-light">
                    <div class="column-header">
                        Created
                        <span v-if="sortedColumn === 'Created'" :class="sorted ? 'triangle-up' : 'triangle-down'" @click="sortTableBy('Created')"></span>
                        <span v-else class="triangle-down" @click="sortTableBy('Created')"></span>
                    </div>
                </div>
                <div class="col-md-2 border text-center bg-light">
                    <div class="column-header">
                        Updated
                        <span v-if="sortedColumn === 'Updated'" :class="sorted ? 'triangle-up' : 'triangle-down'" @click="sortTableBy('Updated')"></span>
                        <span v-else class="triangle-down" @click="sortTableBy('Updated')"></span>
                    </div>
                </div>
                <div class="col-md-1 border text-center bg-light">Select</div>
                <div class="col-md-1 text-center"> 
                    <div>
                        <button @click="moveUnits(units)" class="btn btn-primary btn-sm" type="submit">Move All</button>
                    </div>
                </div>
            </div>
            <div class="row align-items-center mt-2" v-for = "unit in this.sortedUnits" :key="unit.id">
                <div class="col-md-2 text-center">{{ unit.snoDTO.sno }}</div>
                <div class="col-md-2 text-center">{{ unit.snoDTO.wc }}</div>
                <div class="col-md-2 text-center">{{ unit.snoDTO.cdt }}</div>
                <div class="col-md-2 text-center">{{ unit.snoDTO.udt }}</div>
                <div class="col-md-1 text-center">
                    <select id="myDropdown" name="station" v-model="selectedOption">
                        <option v-for = "station in unit.stationsArray" :key="station.id"> 
                            {{ station }}
                        </option>
                    </select>
                </div>
                <div class="col-md-1 text-center">
                        <button @click="moveUnit(unit,selectedOption)" class="btn btn-primary btn-sm" type="submit">Move</button>
                </div>
            </div>
        </div>
</div>
</template>

<script>
import UnitService from '@/service/UnitService';

export default {
    name: 'MainBody',
        data(){
            return{
                unit: null,
                sortedUnits: this.units,
                sorted: false,
                sortedColumn: 'Unit',
            }
        },
    props: {
        units: {
            type: Array,
            required: true
        }
    },
    watch: {
        units: {
          handler(newUnits) {
            this.sortedUnits = [...newUnits];
          },
        },
    },
    methods:{
        moveUnit(unit,selectedOption){
            this.unit=unit;
            this.unit.snoDTO.wc = selectedOption;
            UnitService.moveUnit(this.unit).then((response) => {
                const indexOfUpdatedUnit = this.sortedUnits.findIndex((item) => item.snoDTO.sno === response.data.snoDTO.sno);
                this.sortedUnits[indexOfUpdatedUnit] = response.data;
            })
        },
        moveUnits(units){
            UnitService.moveUnits(units).then((response) => {
                this.$emit('units-updated', response.data)
                })
        },
        sortTableBy(option){

            if (option === this.sortedColumn) {
                this.sorted = !this.sorted; 
            } else {
                this.sorted = false; 
            }

            this.sortedColumn = option;     

            if (option == "Unit"){
                this.sortByAttribute("sno")
            }
            else if(option == "CurrentStation"){
                this.sortByAttribute("wc")
            }
            else if(option == "Created"){
                this.sortByAttribute("cdt")
            }
            else if(option == "Updated"){
                this.sortByAttribute("udt")
            }
        },
        sortByAttribute(attribute){
            if (!this.sorted){
                this.sortedUnits.sort((valueA,valueB) =>  valueA.snoDTO[attribute].localeCompare(valueB.snoDTO[attribute]));
            }
            else{
                this.sortedUnits.sort((valueA,valueB) =>  valueB.snoDTO[attribute].localeCompare(valueA.snoDTO[attribute]));
            }
        }        
    },
};
</script>

<style scoped>

.column-header {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.triangle-up {
  margin-left: 8px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 6px solid black; 
}

.triangle-down {
  margin-left: 8px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid black; 
}

.triangle-up:hover {
  border-bottom: 6px solid rgb(187, 187, 209); 
}

.triangle-down:hover {
  border-top: 6px solid rgb(198, 198, 219);
}
</style>