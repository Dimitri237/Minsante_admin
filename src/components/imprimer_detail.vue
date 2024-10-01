<template>
    <div class="container">
        <side_bar />
        <div class="total">
            <div class="heaths">
                <div></div>
                <div
                    style=" width: 50%; display: flex; justify-content: space-between;">
                    <button @click="showModal2" style="background-color: rgb(0, 122, 94);">Affecter</button>
                    <button style="background-color: red;" @click="deletePersonnel">Supprimer</button>
                </div>
            </div>
            <div style="width: 100%; display: flex; justify-content: space-between;">
                <div class="personnel">
                    <h1>Détails du personnel</h1>
                    <div v-if="personnel">
                        <div class="personnel-details">
                            <div class="detail">
                                <label>Matricule :</label>
                                <span>{{ personnel.matricule }}</span>
                            </div>
                            <div class="detail">
                                <label>Nom et prénom :</label>
                                <span>{{ personnel.nom_prenom }}</span>
                            </div>
                            <div class="detail">
                                <label>Date de naissance :</label>
                                <span>{{ formatDate(personnel.date_naissance) }}</span>
                            </div>
                            <div class="detail">
                                <label>Lieu de naissance :</label>
                                <span>{{ personnel.lieu_naissance }}</span>
                            </div>
                            <div class="detail">
                                <label>Sexe :</label>
                                <span>{{ personnel.sexe }}</span>
                            </div>
                            <div class="detail">
                                <label>Profession :</label>
                                <span>{{ personnel.profession }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>Chargement des informations...</p>
                    </div>
                </div>
                <div class="affectation">
                    <h1>Mouvements</h1>
                    <div class="lieu-service-item" v-for="lieu in lieuService" :key="lieu.id">
                        <div class="list_detail">
                            <label>inclus dans l'acte N°:</label>
                            <span>{{ lieu.id_acte }}</span>
                        </div>
                        <div class="list_detail">
                            <label>Affecte de:</label>
                            <span>{{ lieu.id_fsactuel }}</span>
                        </div>
                        <div class="list_detail">
                            <label>Pour:</label>
                            <span>{{ lieu.id_fsnouvelle }}</span>
                        </div>
                        <div class="list_detail">
                            <label>Le:</label>
                            <span>{{ formatDate(lieu.create_at) }}</span>
                        </div>
                    </div>
                </div>
                <div class="formation">
                    <h1>Formations</h1>
                    <div>
                        <div class="lieu-service-item" v-for="miseStage in miseStages" :key="miseStage.id">
                            <div class="list_detail">
                                <label>Admis en stage le:</label>
                                <span>{{ formatDate(miseStage.create_at) }}</span>
                            </div>
                            <div class="list_detail">
                                <label>A:</label>
                                <span>{{ miseStage.id_fs }}</span>
                            </div>
                            <div class="list_detail">
                                <label>Telephone:</label>
                                <span>{{ miseStage.telephone }}</span>
                            </div>
                            <div class="list_detail">
                                <label>Situation matrimoniale:</label>
                                <span>{{ miseStage.situation_matri }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                    <input type="text" id="id_perso" v-model="id_perso" disabled required><br>
                </div>
                <div class="inp-field">
                    <label for="nom_concerne">Choisir l'acte :</label>
                    <select name="" id="id_acte" v-model="id_acte">
                        <option v-for="acte in actes" :value="acte.numero" :key="acte.numero">
                            {{ acte.titre }}
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
                <button class="sub_butt" type="submit">Créer l'affectation</button>
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
import side_bar from './includ/SideBar.vue';
export default {
    data() {
        return {
            personnel: null,
            lieuService: null,
            miseStages: null,
            modalVisible: false,
            modalVisible2: false,
            loading: false,
            loading2: false,
            id_perso: localStorage.getItem('matricule'),
            id_acte: '',
            id_fsactuel: '',
            id_fsnouvelle: '',
            actes: [],
            formation_sanitaire: [],
            create_at: '',
            success: false,
            successMessage: '',
            error: false,
            errorMessage: ''
        }
    },
    components: {
        side_bar,
    },
    created() {
        this.loadPersonnelDetails();
        this.loadLieuService();
        this.loadFormation();
    },
    mounted() {
        this.getActes();
        this.getStructure();
    },
    methods: {
        loadPersonnelDetails() {
            const matricule = this.$route.params.matricule;
            axios.get(`https://minsante-api-636b67309a26.herokuapp.com/personnel/${matricule}`)
                .then(response => {
                    this.personnel = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des informations du personnel :', error);
                });
        },
        async createAffectation() {
            try {
                const response = await axios.post('https://minsante-api-636b67309a26.herokuapp.com/lieu_service', {
                    id_perso: this.id_perso,
                    id_acte: this.id_acte,
                    id_fsactuel: this.id_fsactuel,
                    id_fsnouvelle: this.id_fsnouvelle,
                });
                this.success = true;
                this.successMessage = response.data.message;
                this.id_perso = '';
                this.id_acte = '';
                this.id_fsactuel = '';
                this.id_fsnouvelle = '';
            } catch (error) {
                this.error = true;
                this.errorMessage = error.response.data.message;
            }
        },
        loadLieuService() {
            const matricule = this.$route.params.matricule;
            axios.get(`https://minsante-api-636b67309a26.herokuapp.com/lieu_service/${matricule}`)
                .then(response => {
                    this.lieuService = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des informations du lieu de service :', error);
                });
        },
        loadFormation() {
            const matricule = this.$route.params.matricule;
            axios.get(`https://minsante-api-636b67309a26.herokuapp.com/mise_stage/${matricule}`)
                .then(response => {
                    this.miseStages = response.data;
                    console.log(this.miseStages);
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des informations des mise en stage :', error);
                });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
        async deletePersonnel() {
            try {
                const matricule = localStorage.getItem('matricule');
                const response = await axios.delete(`https://minsante-api-636b67309a26.herokuapp.com/personnel/${matricule}`);
                console.log(response.data);
                this.personnels = this.personnels.filter(personnel => personnel.matricule !== matricule);
                this.$router.push('/acceuilPage');
            } catch (error) {
                console.error(error);
            }
        },
        hideModal() {
            this.modalVisible = false;
            this.modalVisible2 = false;
        },
        showModal(acte) {
            this.selectedActe = acte;
            this.modalVisible = true;
        },
        showModal2() {
            this.modalVisible2 = true;
        },
        async getStructure() {
            try {
                const response = await axios.get('https://minsante-api-636b67309a26.herokuapp.com/formation_sanitaire'); // Appeler l'API GET
                this.formation_sanitaire = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des structures :', error);
            }
        },
        async getActes() {
            try {
                const response = await axios.get('https://minsante-api-636b67309a26.herokuapp.com/actes');
                const actes = response.data; // Utilisez response.data pour obtenir les données de la réponse
                this.actes = actes;
            } catch (error) {
                console.error('Erreur lors de la récupération des actes:', error);
            }
        },
    }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

.total {
    display: block;
    width: 80%;
    margin: 0 auto;
}

.container {
    width: 100%;
    font-family: Monda;
    margin: 0;
    display: flex;
}

.container h1 {
    background-color: rgb(0, 122, 94);
    padding: 10px 0;
    color: white;
    text-align: center;
}

.personnel-details {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
}

.detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
}

.detail label {
    font-weight: bold;
}

.lieu-service-item {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
}

.list_detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.list_detail label {
    font-weight: bold;
}

.affectation,
.personnel,
.formation {
    width: 32%;
}

.heaths {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.heaths button {
    margin: 0;
    font-size: 20px;
    width: 30%;
    padding: 10px 0;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    color: white;
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

.details2 {
    background-color: white;
    width: 30%;
    margin: 2% 33%;
    padding: 25px 25px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.close {
    text-align: end;
}

.close i {
    color: rgba(255, 0, 0, 0.945);
    font-size: 25px;
    margin-top: 8px;
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
    outline: none;
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
</style>