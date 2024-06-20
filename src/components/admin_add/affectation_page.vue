<template>
    <div class="all" style="height: 150px; background-color: red; width: 100%;">

        <button style="border: none; width: 100%; height: 150px; background-color: #007A5E; color: white;" type="button"
            class="btn custom-modal-btn" data-bs-toggle="modal" data-bs-target="#don" @click="showModal2">
            Ajouter une affecctation <i style="color: white;" class="fa fa-plus"></i>
        </button>
    </div>
    <div v-if="modalVisible2" class="modals2">
        <div class="details2 animate__animated animate__fadeInDown">

            <div class="close" @click="hideModal">
                <i class="fa fa-window-close"></i>
            </div>
            <div style="width: 100%; padding: 10px;">
                <h2 style="margin: 0; color: #007A5E; padding: 0;">Ajouter une affecctation</h2>
            </div>
            <form @submit.prevent="createAffectation">
                <div class="inp-field">
                    <label for="">Matricule :</label>
                    <input type="text" id="id_perso" v-model="id_perso" required><br>
                </div>
                <div class="inp-field">
                    <label for="nom_concerne">Choisir l'acte :</label>
                    <select name="" id="id_acte" v-model="selectedActeNumber" @change="updateSelectedActe">
                        <option v-for="acte in actes" :value="acte.numero" :key="acte.numero">
                            {{ acte.titre }}
                        </option>
                    </select>
                    <select style="display: none;" name="" id="id_acte" v-model="selectedActeSignatureDate">
                        <option v-for="acte in actes" :value="acte.signature_date" :key="acte.numero">
                            {{ acte.numero }}
                        </option>
                    </select>
                    <select style="display: none;" name="" id="id_acte" v-model="selectedActeCategorie">
                        <option v-for="acte in actes" :value="acte.categorie" :key="acte.numero">
                            {{ formatDate(acte.signature_date) }}
                        </option>
                    </select>
                </div>
                <div class="inp-field">
                    <label for="nom_concerne">Ancienne structure :</label>
                    <select name="" id="id_fsactuel" v-model="id_fsactuel">
                        <option v-for="formation_sanitair in formation_sanitaire" :value="formation_sanitair.libelle"
                            :key="formation_sanitair.libelle">
                            {{ formation_sanitair.libelle }}
                        </option>
                    </select>
                </div>

                <div class="inp-field">
                    <label for="nom_concerne">Nouvelle structure :</label>
                    <select name="" id="id_fsnouvelle" v-model="id_fsnouvelle">
                        <option v-for="formation_sanitair in formation_sanitaire" :value="formation_sanitair.libelle"
                            :key="formation_sanitair.libelle">
                            {{ formation_sanitair.libelle }}
                        </option>
                    </select>
                </div>
                <div class="inp-field">
                    <label for="">Poste :</label>
                    <input type="text" id="poste" v-model="poste" required><br>
                </div>
                <button class="sub_butt" type="submit">Créer l'affectation</button>
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
            id_perso: '',
            selectedActe: '',
            id_fsactuel: '',
            id_fsnouvelle: '',
            selectedActeNumber: null,
            selectedActeSignatureDate: null,
            selectedActeCategorie: null,
            actes: [],
            formation_sanitaire: [],
            create_at: '',
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',
            selectedActeData: null

        };
    },
    mounted() {
        this.getActes();
        this.getStructure();
        this.getAffectation();
    },
    watch: {
        selectedActeData(newValue) {
            // Ici, vous ne transmettez que les données que vous voulez envoyer
            this.envoyerDonnees(newValue);
        }
    },

    methods: {
        updateSelectedActe() {
            const selectedActe = this.actes.find(acte => acte.numero === this.selectedActeNumber);
            this.selectedActeSignatureDate = selectedActe.signature_date;
            this.selectedActeCategorie = selectedActe.categorie;
        },
        envoyerDonnees(donnees) {
            // Ici, vous devez ajouter la logique pour envoyer les données
            console.log('Envoi des données :', donnees);
        },
        hideModal() {
            this.modalVisible = false;
            this.modalVisible2 = false;
            this.success = false;
            this.error = false;
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
        showModal(acte) {
            this.selectedActe = acte;
            this.modalVisible = true;
        },
        showModal2() {
            this.modalVisible2 = true;
        },
        async createAffectation() {
            try {
                const response = await axios.post('http://localhost:3000/lieu_service', {
                    id_perso: this.id_perso,
                    poste: this.poste,
                    id_acte: this.selectedActeNumber,
                    date_signatureacte: this.selectedActeSignatureDate,
                    categorie_acte: this.selectedActeCategorie,
                    id_fsactuel: this.id_fsactuel,
                    id_fsnouvelle: this.id_fsnouvelle,
                });
                this.hideModal();
                this.success = true;
                this.successMessage = response.data.message;
                this.id_perso = '';
                this.id_acte = '';
                this.id_fsactuel = '';
                this.id_fsnouvelle = '';
                this.poste = '';
            } catch (error) {
                this.hideModal();
                this.error = true;
                this.errorMessage = error.response.data.message;
            }
        },
        async getAffectation() {
            try {
                const response = await axios.get('http://localhost:3000/lieu_service'); // Appeler l'API GET
                this.lieu_service = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des lieu_service :', error);
            }
        },
        async getStructure() {
            try {
                const response = await axios.get('http://localhost:3000/formation_sanitaire'); // Appeler l'API GET
                this.formation_sanitaire = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des structures :', error);
            }
        },
        async getActes() {
            try {
                const response = await axios.get('http://localhost:3000/actes');
                const actes = response.data; // Utilisez response.data pour obtenir les données de la réponse
                this.actes = actes;
            } catch (error) {
                console.error('Erreur lors de la récupération des actes:', error);
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
  width: 86.95%;
  top: 0%;
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

.bout button {
  width: 100%;
  font-size: 20px;
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