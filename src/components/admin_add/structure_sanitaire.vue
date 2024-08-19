<template>
  <div class="all " style="height: 150px; background-color: red; width: 100%;">

    <div class="btn" style="border: none; width: 100%; height: 150px; background-color: #007A5E; color: white;">
      <button style="border: none; padding: 10px 10px; background-color: #007A5E; color: white;" type="button"
        class="btn custom-modal-btn" data-bs-toggle="modal" data-bs-target="#don" @click="showModal2">
        Ajouter une structure <i style="color: white;" class="fa fa-plus"></i>
      </button>
    </div>
  </div>
  <div v-if="modalVisible2" class="modals2">
    <div class="details2 animate__animated animate__fadeInDown">

      <div class="close" @click="hideModal">
        <i class="fa fa-window-close"></i>
      </div>
      <div style="width: 100%; padding: 10px;">
        <h2 style="margin: 0; color: #007A5E; padding: 0;">Créer une structure sanitaire </h2>
      </div>
      <form @submit.prevent="createStructure">
        <div class="inp-field">
          <label for="nom_auteur">Nom de la structure :</label>
          <input type="text" id="libelle" v-model="libelle" required><br>
        </div>
        <div class="inp-field">
          <label for="">Type:</label><br>
          <select name="" id="" v-model="id_type">
            <option v-for="type_fe in type_fs" :value="type_fe.id" :key="type_fe.id">
              {{ type_fe.libelle }}</option>
          </select>
        </div>
        <div class="inp-field">
          <label for="">Localisation:</label><br>
          <select name="" id="" v-model="id_adress">
            <option v-for="ville in villes" :value="ville.id" :key="ville.id">
              {{ ville.libelle }}</option>
          </select>
        </div>
        <div class="inp-field">
          <label for="">Region:</label><br>
          <select name="" id="" v-model="region">
            <option v-for="region in regions" :value="region.libelle" :key="region.id">
              {{ region.libelle }}</option>
          </select>
        </div>
        <div class="inp-field">
          <label for="nom_auteur">District :</label>
          <input type="text" id="district" v-model="district" required><br>

        </div>
        <div style="width: 95%; display: flex; justify-content: space-between;">
          <button class="sub_butt" type="submit">Créer la structure</button>
          <button class="sub_butt" style="background-color: red;" @click="hideModal">Annuler</button>
        </div>
      </form>
    </div>
  </div>
  <div v-if="success" class="modals2">
    <div class="popup-content">
      <div class="close" @click="hideModal">
        <i class="fa fa-window-close"></i>
      </div>
      <div>
        <p class="successMes">{{ successMessage }}</p>
      </div>
    </div>

    <div v-if="error" class="modals2">
      <div class="popup-content">
        <div class="close" @click="hideModal">
          <i class="fa fa-window-close"></i>
        </div>
        <div>
          <p class="errorMes">{{ errorMessage }}</p>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import axios from 'axios';
export default {

  data() {
    return {
      modalVisible: false,
      modalVisible2: false,
      loading: false,
      loading2: false,
      libelle: '',
      id_type: '',
      id_adress: '',
      success: false,
      successMessage: '',
      error: false,
      errorMessage: ''
    };
  },
  mounted() {
    this.getStructure();
    this.getTypefs();
    this.getAdress();
    this.getRegion();
  },
  methods: {
    hideModal() {
      this.modalVisible = false;
      this.modalVisible2 = false;
      this.success = false;
      this.error = false;
    },

    showModal(realisation) {
      this.selectedRealisation = realisation;
      this.modalVisible = true;
    },
    showModal2() {
      this.modalVisible2 = true;
    },

    async createStructure() {
      try {
        const response = await axios.post('https://minsante-6405bf7b686a.herokuapp.com/formation_sanitaire', {
          libelle: this.libelle,
          id_type: this.id_type,
          id_adress: this.id_adress,
          region: this.region,
          district: this.district,
        });
        this.hideModal();
        this.success = true;
        this.successMessage = response.data.message;
        this.libelle = '';
        this.id_type = '';
        this.id_adress = '';
        this.region = '';
        this.district = '';
      } catch (error) {
        this.hideModal();
        this.error = true;
        this.errorMessage = error.response.data.message;
      }
    },
    async getAdress() {
      try {
        const response = await axios.get('https://minsante-6405bf7b686a.herokuapp.com/adress'); // Appeler l'API GET
        this.villes = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des adress :', error);
      }
    },
    async getTypefs() {
      try {
        const response = await axios.get('https://minsante-6405bf7b686a.herokuapp.com/type_fs'); // Appeler l'API GET
        this.type_fs = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des type_fs :', error);
      }
    },
    async getRegion() {
      try {
        const response = await axios.get('https://minsante-6405bf7b686a.herokuapp.com/region'); // Appeler l'API GET
        this.regions = response.data;
        console.log({ toutou: this.regions });
      } catch (error) {
        console.error('Erreur lors de la récupération des regions :', error);
      }
    },
    async getStructure() {
      try {
        const response = await axios.get('https://minsante-6405bf7b686a.herokuapp.com/formation_sanitaire'); // Appeler l'API GET
        this.formation_sanitaire = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des structures :', error);
      }
    },
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

.modals {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  top: 0%;
  height: 100vh;
  /* 
    margin: 0 13%; */
}

.modals2 {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    width: 100%;
    top: 0%;
    left: 0%;
    height: 100vh;
    /* 
    margin: 0 13%; */
}

.popup-content {
  border-radius: 10px;
  background-color: white;
  width: 500px;
  margin: 15% auto;
  padding-top: 0px;
  padding-bottom: 12px;
  text-align: center;
}

.successMes {
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
  color: #007A5E;
  font-weight: bold;
}

.errorMes {
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
  color: red;
  font-weight: bold;
}

.popup-content i {
  margin-right: 9px;
}


form {
  width: 100%;
  padding: 10px;
}

form .inp-field {
  width: 100%;
  margin-bottom: 20px;
}

form .inp-field label {
  width: 100% !important;
  font-size: large;
  font-weight: 600;
  margin-bottom: 7px;
}

form .inp-field input,
form .inp-field textarea,
form .inp-field select {
  width: 94%;
  font-size: large;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}

form .inp-field input,
form .inp-field select {
  height: 25px;
}

.sub_butt {
  font-size: large;
  font-weight: bold;
  color: white;
  width: 50%;
  background-color: #007A5E;
  border: none;
  border-radius: 5px;
  padding: 10px 0;
}

.close {
  text-align: end;
}

.close i {
  color: rgba(255, 0, 0, 0.945);
  font-size: 25px;
  margin-top: 8px;
}

.details {
  background-color: white;
  width: 40%;
  margin: 10% 23%;
  padding: 25px 25px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

}

.details2 {
  background-color: white;
  width: 30%;
  margin: 7% 33%;
  padding: 25px 25px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.actions {
  width: 50%;
  margin: auto;
  justify-content: space-between;
  display: flex;
}

.actions .action {
  width: 47%;
  font-size: large;
  font-weight: 700;
  padding: 10px 0;
  border: none;
  color: white;
  border-radius: 5px;
}

.action:nth-child(1) {
  background-color: #007A5E;
}

.action:nth-child(2) {
  background-color: rgba(255, 0, 0, 0.815);
}

/*nav barre*/
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  margin-top: 150px;
}

.loading-indicator::after {
  content: "";
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #202020;
  border-top-color: #007A5E;
  border-bottom-color: #007A5E;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/*drop*/

select::-ms-expand {
  display: none;
}

.select {
  position: relative;
  display: flex;
  width: 55%;
  margin: auto;
  height: 3em;
  line-height: 3;
  background: #5c6664;
  overflow: hidden;
  border-radius: .25em;
}

.in_select,
.bout {
  width: 20%;
  margin-top: 55px;
  height: 50px;
}

.btn {
  width: 100%;
  font-size: 20px;
  margin: 15% auto;
}

.in_select ul {
  width: 100%;
}

.in_select ul li {
  width: 98%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 25px;
  padding-left: 2%;
  display: flex;
  justify-content: space-between;
}

.in_select ul button {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: white;
}

.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 1em;
  background: #2b2e2e;
  cursor: pointer;
  pointer-events: none;
  transition: .25s all ease;
}

.select:hover::after {
  color: #23b499;
}
</style>