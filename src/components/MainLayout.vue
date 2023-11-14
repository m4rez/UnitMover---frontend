<template>
  <div>
    <header>
      <div class="py-4 text-center"
            style="background-image: linear-gradient(to left bottom, rgba(189, 195, 199, .75), rgba(44, 62, 80, .75)); background-size: 100%;">
            <button @click="unitMoverRedirect" class="btn btn-primary back-to-portfolio-button" 
            type="button">
            ← Back to Portfolio
    </button>
        <div class="container">
          <div class="row">
            <div class="mx-auto col-md-6">
              <h1>Unit Mover</h1>
              <p class="mb-3">Insert units you want to move</p>
              <div class="form-inline d-flex justify-content-center">
                <div class="input-group">
                  <input class="form-control" v-model="sno" placeholder="Units" type="text">
                  <div class="input-group-append">
                    <button @click="getUnits" class="btn btn-primary" type="button">
                      Find
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main-body :units="units" @units-updated="updateUnits" />
  </div>
</template>
<script>
import UnitService from '@/service/UnitService.js'
import MainBody from '@/components/MainBody.vue';

export default {
  components: {
    MainBody
  },
  name: 'MainLayout',
  data() {
    return {
      sno: "",
      units: []
    }
  },
  methods: {
    getUnits() {
      UnitService.getUnits(this.sno)
        .then(response => {
          console.log(response.data)
          this.units = response.data; // Uloží odpověď do proměnné units
        })
    },
    updateUnits(updatedUnits) {
      this.units = updatedUnits; // Aktualizace units v nadřazené komponentě na základě události
    },
    unitMoverRedirect(){
      window.location.href = 'https://portfolio-zezula.website/projekty';
    }
  }
}
</script>
<style>
.back-to-portfolio-button {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>