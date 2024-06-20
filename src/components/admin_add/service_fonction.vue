<template>
     <div class="all" style="height: 150px; background-color: red; width: 100%;">

            <div class="btn" style="border: none; width: 100%; height: 150px; background-color: #007A5E; color: white;">
            <button style="border: none; padding: 10px 10px; background-color: #007A5E; color: white;" type="button"
            class="btn custom-modal-btn" data-bs-toggle="modal" data-bs-target="#don" @click="showModal2">
            Ajouter un service <i style="color: white;" class="fa fa-plus"></i>
          </button>
        </div>
      </div>
   
    <div v-if="modalVisible2" class="modals2">
      <div class="details2 animate__animated animate__fadeInDown">
  
        <div class="close" @click="hideModal">
          <i class="fa fa-window-close"></i>
        </div>
        <div style="width: 100%; padding: 10px;">
          <h2 style="margin: 0; color: #007A5E; padding: 0;">Créer un nouveau type</h2>
        </div>
        <form @submit.prevent="createService">
          <div class="inp-field">
            <label for="nom_auteur">Nom du service :</label>
            <input type="text" id="libelle" v-model="libelle" required><br>
  
          </div>
          <button class="sub_butt" type="submit">Créer le service</button>
        </form>
        <div v-if="success">
          <p>{{ successMessage }}</p>
        </div>
        <div v-if="error">
          <p>{{ errorMessage }}</p>
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
        success: false,
        successMessage: '',
        error: false,
        errorMessage: ''
      };
    },
    mounted() {
      this.getService();
    },
    methods: {
      hideModal() {
        this.modalVisible = false;
        this.modalVisible2 = false;
      },
  
      showModal(realisation) {
        this.selectedRealisation = realisation;
        this.modalVisible = true;
      },
      showModal2() {
        this.modalVisible2 = true;
      },
      
      async createService() {
        try {
          const response = await axios.post('http://localhost:3000/service_fonction', {
            libelle: this.libelle
          });
          this.success = true;
          this.successMessage = response.data.message;
          this.libelle = '';
        } catch (error) {
          this.error = true;
          this.errorMessage = error.response.data.message;
        }
      },
      
      async getService() {
        try {
          const response = await axios.get('http://localhost:3000/service_fonction'); // Appeler l'API GET
          this.service_fonction = response.data;
          console.log(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des services :', error);
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
  form .inp-field textarea {
    width: 94%;
    font-size: large;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
  
  form .inp-field input {
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
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    outline: 0;
    box-shadow: none;
    border: 0 !important;
    background: #007A5E;
    width: 50% !;
    background-image: none;
    flex: 1;
    padding: 0 .5em;
    color: #fff;
    cursor: pointer;
    font-size: 1em;
    font-family: 'Open Sans', sans-serif;
  }
  
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
  .bout button{
    width: 100%;
    font-size: 20px;
  }
  .btn{
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