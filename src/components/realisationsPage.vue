<template>
  <div style="width: 100%;">
      <div class="select">
      </div>
      <div class="in_select">
          <ul>
              <li v-for="affectate in affectation" :key="affectate.id">
                  <div>
                    <h2>personnel N: {{ affectate.id_perso }}</h2>
                  </div>
                  <i @click="showModal2(affectate)" style="padding: 30px; background-color: #007A5E;" class="fa fa-plus"></i>
              </li>
          </ul>
      </div>
  </div>
  <div v-if="modalVisible2" class="modals">
      <div class="details animate__animated animate__fadeInDown">
          <div class="close" @click="hideModal">
              <i class="fa fa-window-close"></i>
          </div>
          <h1 style="color: #007A5E; text-align: center">Fiche d'affectation <span
                  style="color: black;">{{ selectedAffectate.id_perso }}</span></h1>
          <div class="text detail_perso">
              <h2 style="color: #007A5E;">Informations</h2>
              <div class="list_detail">
                  <label>portant de la {{ selectedAffectate.categorie_acte }} N:</label>
                  <h3>{{ selectedAffectate.id_acte }}</h3>
              </div>
              <div class="list_detail">
                  <label>Signe le:</label>
                  <h3>{{formatDate( selectedAffectate.date_signatureacte )}}</h3>
              </div>
              <div class="list_detail">
                  <label>le personnel portant le matricule N:</label>
                  <h3>{{ selectedAffectate.id_perso }}</h3>
              </div>
              <div class="list_detail">
                  <label>Est affecté de:</label>
                  <h3>{{ selectedAffectate.id_fsactuel }}</h3>
              </div>
              <div class="list_detail">
                  <label>pour:</label>
                  <h3>{{ selectedAffectate.id_fsnouvelle }}</h3>
              </div>
              <div class="list_detail">
                  <label>Occupant le poste de:</label>
                  <h3>{{ selectedAffectate.poste }}</h3>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  components: {
  },
  data() {
      return {
          affectation: [],
          modalVisible2: false,
      };
  },
  mounted() {
      this.getAffectation()
  },
  methods: {
    formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
      hideModal() {
          this.modalVisible = false;
          this.modalVisible2 = false;
          this.modalVisible3 = false;
      },
      showModal() {
          this.modalVisible = true;
      },
      showModal3() {
          this.modalVisible3 = true;
      },
      async showModal2(affectate) {
          this.selectedAffectate = affectate;
          try {
              await axios.get(`http://localhost:3000/lieu_service/` + affectate.id_perso).then(
                  res => {
                      this.selectedTransfert = res.data;
                      console.log({bonjour: this.selectedAffectate});

                  }
              )
          } catch (error) {
              console.error(error);
              throw error;
          }
          this.modalVisible2 = true;
      },
      toggleDetails() {
          this.showDetails = !this.showDetails;
      },
      async getAffectation() {
          try {
              const response = await axios.get('http://localhost:3000/lieu_service'); // Appeler l'API GET
              this.affectation = response.data;
              console.log({ bonjour: this.affectation });
          } catch (error) {
              console.error('Erreur lors de la récupération des affectations :', error);
          }
      },
  }
};
</script>
<style scoped>
  
.in_select {
  width: 55%;
  margin: auto;
  margin-top: 50px;
}
.close i {
  color: rgba(255, 0, 0, 0.945);
  font-size: 25px;
}
.close {
  text-align: end;
}
.details {
  background-color: white;
  width: 40%;
  margin: auto;
  margin-top: 15px;
  padding: 25px 25px;
  border-radius: 5px;
}
.in_select ul {
  width: 100%;
}
.detail_perso h3 {
  width: 67% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.list_detail label {
  width: 45% !important;
  text-align: right;
  padding-right: 10px;
}

.list_detail {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5%;
}

.detail_perso {
  width: 100%;
}

.modals {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  top: 0%;
  left: 0%;
  height: 100vh;
  /* 
  margin: 0 13%; */
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

</style>