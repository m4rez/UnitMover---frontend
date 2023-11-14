import axios from 'axios';

const UNIT_API_BASE_URL = 'https://portfolio-zezula.website'//'http://localhost:8082''https://markuvtest.website'

class UnitService{
    getUnits(sno){
        return axios.get(`${UNIT_API_BASE_URL}/getunits`,{ params: { sno } });
    }
    moveUnit(unit){
        return axios.post(`${UNIT_API_BASE_URL}/moveunit`, unit);
    }
    moveUnits(units){
        return axios.post(`${UNIT_API_BASE_URL}/moveunits`, units)
    }
}

export default new UnitService()

