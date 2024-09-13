<template>
    <div class="personnel_list">
        <div class="tete">
            <a class="titre1" href="">Liste du personnel</a>
            <div style="width: 30%; display: flex; justify-content: space-between;">
                <button style="border: none; color: #0B9777; font-size: 18px;" type="button"
                    class="btn custom-modal-btn" data-bs-toggle="modal" data-bs-target="#don" @click="showModal1">
                    Ajouter
                    <i style="font-size: 18px;" class="fa fa-plus" aria-hidden="true"></i>
                </button>
                <button style="border: none; color: #0B9777; font-size: 18px;" type="button"
                    class="btn custom-modal-btn" data-bs-toggle="modal" data-bs-target="#don" @click="showModal3">
                    Importer
                    <i style="font-size: 18px;" class="fas fa-file-import" aria-hidden="true"></i>
                </button>
                <button style="border: none; color: #0B9777; font-size: 18px;" type="button"
                    class="btn custom-modal-btn" data-bs-toggle="modal" data-bs-target="#don" @click="exporterEnExcel">
                    Exporter
                    <i style="font-size: 18px;" class="fas fa-file-export" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <table style="width: 100%; text-align: center;">
            <thead>
                <tr>
                    <th></th>
                    <th><label for="" class="attr">Nom & Prenom</label></th>
                    <th><label for="" class="attr">Matricule</label></th>
                    <th><label for="" class="attr">Profession</label></th>
                    <th><label for="" class="attr">Services</label></th>
                    <th><label for="" class="attr">Actions</label></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-row" v-for="(personnel, index) in personnels" :key="personnel.matricule">
                    <td>{{ index + 1 }}</td>
                    <td>{{ personnel.nom_prenom }}</td>
                    <td>{{ personnel.matricule }}</td>
                    <td>{{ personnel.profession }}</td>
                    <td>{{ personnel.lieu_service }}</td>
                    <td>
                        <button style="border: none; color: #007A5E;" type="button" class="btn custom-modal-btn"
                            data-bs-toggle="modal" data-bs-target="#don" @click="showModal2(personnel)">
                            <i style="font-size: 18px;" class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="modalVisible1" class="modals">
        <div class="details animate__animated animate__fadeInDown formEm">
            <div class="close" @click="hideModal">
                <i class="fa fa-window-close"></i>
            </div>
            <h1 style="color: #0B9777; text-align: center">Ajouter un employe <span style="color: black;">{{
                selectedPersonnel.matricule }}</span></h1>
            <form @submit.prevent="createEmploye">
                <div class="inp-field">
                    <label for="nom_auteur">matricule :</label>
                    <input type="text" id="matricule" v-model="matricule" required><br>
                </div>
                <div class="inp-field">
                    <label for="nom_auteur">Nom & prenom :</label>
                    <input type="text" id="nom_prenom" v-model="nom_prenom" required><br>
                </div>
                <div class="inp-field">
                    <label for="nom_auteur">Date de naissance :</label>
                    <input type="date" id="date_naissance" v-model="date_naissance" required><br>
                </div>
                <div class="inp-field">
                    <label for="nom_auteur">Lieu de naissance :</label>
                    <input type="text" id="lieu_naissance" v-model="lieu_naissance" required><br>
                </div>
                <div class="inp-field">
                    <div style="width: 48%;">
                        <label for="nom_auteur">Pays de naissance :</label>
                        <input type="text" id="pays_naissance" v-model="pays_naissance" class="pays_naissance" required>
                    </div>

                    <div style="width: 48%; display: flex;">
                        <label for="nom_auteur">Sexe :</label>
                        <select style=" width: 90%; border-radius: 5px; height: 28px;" name="sexe" v-model="sexe"
                            required>
                            <option value="f">F</option>
                            <option value="m">M</option>
                        </select>
                    </div>

                </div>
                <div class="inp-field">
                    <label for="nom_auteur">Profession :</label>
                    <input type="text" id="profession" v-model="profession" required><br>
                </div>
                <div class="inp-field">
                    <label for="nom_auteur">Spécialisation :</label>
                    <input type="text" id="spécialisation" v-model="spécialisation" required><br>
                </div>
                <div class="inp-field">
                    <label for="nom_auteur">Pays de formation:</label>
                    <input type="text" id="pays_formation" v-model="pays_formation" required><br>
                </div>
                <div class="inp-field">
                    <label for="nom_auteur">Durée de la spécialisation :</label>
                    <input type="text" id="durée_spécialisation" v-model="durée_spécialisation" required><br>
                </div>
                <div class="inp-field">
                    <label for="nom_auteur">Lieu de service :</label>
                    <!-- <input type="text" id="lieu_service" v-model="lieu_service" required><br> -->

                    <select style=" width: 94%; border-radius: 5px; height: 28px;" name="lieu_service" id="lieu_service"
                        v-model="lieu_service" class="">
                        <option v-for=" structure in formation_sanitaire" :value="structure.libelle"
                            :key="structure.id">{{ structure.libelle }}</option>
                    </select>

                    <!-- <input type="text" id="lieu_service" v-model="lieu_service" required><br> -->
                    <div style="width: 95%; display: flex; justify-content: space-between;">
                        <button class="sub_butt" type="submit">Enregistrer l'employé</button>
                        <button class="sub_butt" style="background-color: red;" @click="hideModal">Annuler</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
    <div v-if="ShowPopup1" class="popup modals">
        <div class="popup-content">
            <h2 style="color: #007A5E; width: 500px; height: 100px; margin: 15% auto;">Employe enregistré avec success
                <br><button class="btnOk" @click="gotoPersonnelPage()">Ok</button>
            </h2>

        </div>
    </div>
    <div v-if="modalVisible2" class="modals">
        <div class="details animate__animated animate__fadeInDown">
            <div class="close" @click="hideModal">
                <i class="fa fa-window-close"></i>
            </div>
            <h1 style="color: #007A5E; text-align: center">Fiche de suivie de l'employe N° <span
                    style="color: black;">{{ selectedPersonnel.matricule }}</span></h1>
            <div class="text detail_perso">
                <h2 style="color: #007A5E;">Informations</h2>
                <div class="list_detail">
                    <label>Nom & prenom:</label>
                    <h3>{{ selectedPersonnel.nom_prenom }}</h3>
                </div>
                <div class="list_detail">
                    <label>Date de naissance:</label>
                    <h3>{{ selectedPersonnel.date_naissance }}</h3>
                </div>
                <div class="list_detail">
                    <label>Lieu de naissance:</label>
                    <h3>{{ selectedPersonnel.lieu_naissance }}</h3>
                </div>
                <div class="list_detail">
                    <label>Sexe:</label>
                    <h3>{{ selectedPersonnel.sexe }}</h3>
                </div>
                <div class="list_detail">
                    <label>profession:</label>
                    <h3>{{ selectedPersonnel.profession }}</h3>
                </div>
                <div class="list_detail">
                    <label>spécialisation:</label>
                    <h3>{{ selectedPersonnel.specialisation }}</h3>
                </div>
                <button class="detailler"><router-link class="s_detailler"
                        :to="'/PersonnelDetails/' + selectedPersonnel.matricule">Plus de details</router-link></button>
            </div>

        </div>
    </div>
    <div v-if="modalVisible3" class="modals">
        <div class="details animate__animated animate__fadeInDown">
            <div class="close" @click="hideModal">
                <i class="fa fa-window-close"></i>
            </div>
            <form style="margin: auto;" @submit.prevent="uploadFile">
                <input type="file" id="excelFile" ref="fileInput" accept=".xlsx" />
                <button type="submit">Importer</button>
            </form>
            <div>{{ message }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';

export default {
    components: {},
    data() {
        return {
            modalVisible1: false,
            modalVisible2: false,
            modalVisible3: false,
            ShowPopup1: false,
            showDetails: false,
            loggedIn: false,
            personnels: [],
            formation_sanitaire: [],
            loading: false,
            lieuService: [],
            selectedPersonnel: {},
            selectedAffectations: [],
            selectedFormations: [],
            message: '',
        };
    },
    async mounted() {
        this.getPersonnel();
        this.getStructure();
    },
    methods: {
        async fetchLieuService(id_perso) {
            try {
                await axios.get(`https://minsante-6405bf7b686a.herokuapp.com/lieu_service/${id_perso}`).then(
                    res => {
                        console.log('résultat', res.data);
                    }
                )

            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        async fetchFormation(id_perso) {
            try {
                await axios.get(`https://minsante-6405bf7b686a.herokuapp.com/mise_stage/${id_perso}`).then(
                    res => {
                        console.log('résultat', res.data);
                    }
                )

            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        goToPersonnelDetails(matricule) {
            this.$router.push({ name: 'PersonnelDetails', params: { matricule } })
        },
        async createEmploye() {
            try {
                const response = await axios.post('https://minsante-6405bf7b686a.herokuapp.com/personnel', {
                    matricule: this.matricule,
                    nom_prenom: this.nom_prenom,
                    date_naissance: this.date_naissance,
                    lieu_naissance: this.lieu_naissance,
                    pays_naissance: this.pays_naissance,
                    sexe: this.sexe,
                    profession: this.profession,
                    specialisation: this.specialisation,
                    pays_formation: this.pays_formation,
                    duree_specialisation: this.duree_specialisation,
                    lieu_service: this.lieu_service
                });
                this.success = true;
                this.hideModal();
                this.showSuccessMessage();
                this.successMessage = response.data.message;
            } catch (error) {
                this.error = true;
                this.errorMessage = error.response.data.message;
            }
        },
        showSuccessMessage() {

            this.ShowPopup1 = true;
        },
        deleteSuccessMessage() {
            this.ShowPopup1 = false;
        },
        gotoPersonnelPage() {
            this.deleteSuccessMessage();
        },
        async getPersonnel() {
            try {
                const response = await axios.get('https://minsante-6405bf7b686a.herokuapp.com/personnel');
                this.personnels = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des personnel :', error);
            }
        },
        async exporterEnExcel() {
            try {
                // Créer un classeur Excel
                const workbook = XLSX.utils.book_new()

                // Créer une feuille de calcul
                const worksheet = XLSX.utils.json_to_sheet(this.personnels)
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Personnel')

                // Générer le fichier Excel
                XLSX.writeFile(workbook, 'personnels.xlsx')
            } catch (erreur) {
                console.error('Erreur lors de l\'export en Excel :', erreur)
            }
        },
        async getStructure() {
            try {
                const response = await axios.get('https://minsante-6405bf7b686a.herokuapp.com/formation_sanitaire'); // Appeler l'API GET
                this.formation_sanitaire = response.data;
                console.log(this.formation_sanitaire);
            } catch (error) {
                console.error('Erreur lors de la récupération des structures :', error);
            }
        },
        hideModal() {
            this.modalVisible1 = false;
            this.modalVisible2 = false;
            this.modalVisible3 = false;
        },
        async showModal2(personnel) {
            this.selectedPersonnel = personnel;
            try {
                await axios.get(`https://minsante-6405bf7b686a.herokuapp.com/mise_stage/` + personnel.matricule).then(
                    res => {
                        this.selectedFormations = res.data
                        console.log('pp', this.selectedFormations);

                    }
                )
                await axios.get(`https://minsante-6405bf7b686a.herokuapp.com/lieu_service/` + personnel.matricule).then(
                    res => {
                        this.selectedAffectations = res.data
                        console.log('pp', this.selectedAffectations);

                    }
                )

            } catch (error) {
                console.error(error);
                throw error;
            }
            this.modalVisible2 = true;
        },
        showModal3() {
            this.modalVisible3 = true;
        },
        showModal1() {
            this.modalVisible1 = true;
        },

        uploadFile() {
            const formData = new FormData();
            formData.append('excelFile', this.$refs.fileInput.files[0]);

            fetch('https://minsante-6405bf7b686a.herokuapp.com/import', {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Erreur lors de l\'importation des données.');
                    }
                })
                .then((data) => {
                    this.message = data;
                })
                .catch((error) => {
                    this.message = error.message;
                });
        },
    },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

table {
    border-collapse: collapse;
    margin-top: 30px;
}

table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

table tr:last-child td {
    border-bottom: none;
}

table th {
    background-color: #0B9777;
    padding: 10px;
    color: white;
}

.detailler {
    width: 100%;
    background-color: transparent;
    margin: auto;
    border: none;
    padding-top: 50px
}

.s_detailler {
    text-decoration: none;
    color: white;
    font-weight: bold;
    margin: auto;
    background-color: #0B9777;
    border-radius: 5px;
    width: 100%;
    padding: 10px 20px;
    font-size: 25px;
}

.list_detail label {
    width: 30% !important;
    text-align: right;
}

.list_detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5%;
}

.detail_perso h3 {
    width: 67% !important;
    margin: 0 !important;
    padding: 0 !important;
}

.detail_perso {
    width: 100%;
}

.popup-content {
    border-radius: 10px;
    background-color: white;
    width: 500px;
    margin: 15% auto;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
}

.btnOk {
    color: white;
    background-color: #007A5E;
    width: 90px;
    height: 30px;
    border: none;
    text-align: center;
    align-items: center;

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

.close {
    text-align: end;
}

.close i {
    color: rgba(255, 0, 0, 0.945);
    font-size: 25px;
}

.details {
    background-color: white;
    width: 40%;
    margin: auto;
    margin-top: 15px;
    padding: 25px 25px;
    border-radius: 5px;
}

.actions {
    width: 50%;
    margin: auto;
    margin-top: 10%;
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

body {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.05);
    font-family: Monda;

}

.personnel_list {
    width: 95%;
    margin: auto;
    margin-top: 30px;

}

.personnel_list .tete {
    border: 1px solid #007A5E;
    width: 96%;
    display: flex;
    justify-content: space-between;
    padding: 10px 2%;
    border-radius: 5px;
}

.danger {
    color: rgb(247, 13, 13) !important;
}

.personnel_list .titre1 {
    font-size: 25px;
    font-weight: bold;
    color: #0B9777;
    text-decoration: none;
}

.personnel_list .outil {
    width: 30%;
    margin: auto;
    margin-left: 50%;
    display: flex;
    justify-content: space-between;
}

.personnel_list .option {
    font-size: 19px;
}

.intitule {
    width: 100%;
    display: flex;
    margin-top: 20px;
}

.objets {
    margin-top: 10px;
    width: 100%;
    display: flex;
    text-decoration: none;
    color: #202020;
}

.objets .attr {
    font-size: 16px;
    width: 20%;
    font-weight: 200;
}

.attr {
    font-size: 20px;
    font-weight: bold;
    width: 25%;
}

.stat {
    font-style: italic;
    color: #007A5E;
}

.stat2 {
    font-style: italic;
    color: rgb(243, 21, 21);
}

.intitule .attr {
    font-size: 20px;
    font-weight: bold;
    width: 20%;
}

.s_menu {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

.s_menu .contex {
    width: 23%;
    height: 150px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

h4 {
    color: #202020;
    font-size: 13px;
}

.container {
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: auto;
    font-family: Monda;
    background-color: rgba(0, 0, 0, 0.05);
}

label {
    width: 30%;
}

.span {
    font-weight: bold;
}

.ext {
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-left: 2%;
    padding: 10px 20px !important;
    display: flex;
}

.side_barre {
    width: 15%;
    background-color: #007A5E;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    height: 100vh;

}

.side_barre i {
    color: white !important;
    margin: 0 10px;
    font-size: 20px;
}

.side_barre h3 {
    color: white !important;
    width: 100px;
    text-align: left;
    margin: 0 10px;
    font-family: Monda;
}

.extra {
    width: 100%;
    height: 100vh;
    /* Hauteur fixe du conteneur */
    overflow-y: auto;
    margin: auto !important;
}

.page {
    background-color: transparent;
    width: 100%;
}

h3 {
    color: #202020;
}

p {
    color: rgba(0, 0, 0, 0.2);
    font-size: 12px;
}

/*Scroll bar css*/
.container::-webkit-scrollbar {
    width: 0.1em;
    /* Largeur de la barre de défilement */
}

.extra::-webkit-scrollbar {
    width: 0.1em;
    /* Largeur de la barre de défilement */
}

.extra::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Couleur de la poignée de défilement */
}

.notif label {
    width: 30% !important;
}

.notif span {
    width: 70% !important;
}

.dev_butt {
    justify-content: space-between;
    display: flex;
    width: 30%;
    margin-right: 2%;
}

.dev_butt button {
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #202020ab;
    width: 48%;
    height: 30px;
}

button.active {
    background-color: rgba(0, 0, 0, 0.1);
    color: #202020ab;
}

.container::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Couleur de la poignée de défilement */
}

/*nav barre*/
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.men {
    display: inline;
    margin-right: 10px;
}

.dMois li:hover {
    background: transparent !important;

}

.dMois li {
    transition: all 0.3s;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

}

li:hover {
    cursor: pointer;
}

.head {
    width: 37.5%;
    position: fixed;
    top: 7px;
    background-color: #ffffff;
    z-index: 9999;
}

.headt button {
    color: rgba(255, 0, 0, 0.678);
    font-size: 20px;
    border: none;
}

.headt {
    background-color: transparent;
    width: 100%;
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;
}

.butt {
    border: none;
    background: none;
    cursor: pointer;
    width: 80%;
    margin: 40px auto;
    padding: 8px 1px;

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

.loading-indicator2::after {
    content: "";
    display: inline-block;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    border: 3px solid #06283D;
    border-top-color: #007A5E;
    border-bottom-color: #007A5E;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-indicator2 {
    display: flex;
    justify-content: center;
    height: 100px;
}

.cont {
    width: 100%;
}

.cont1 {
    width: 100%;
    display: block;
    flex-wrap: nowrap;
    background-color: #202020;
    overflow: hidden;
}

.cont2 {
    width: 100%;
    background-color: white;
    padding: 15px 0;
}

.cont2 label {
    font-size: 25px;
    font-weight: bold;
    width: 30%;
    text-align: right;
    color: #202020;
}

.cont2 textarea {
    width: 60%;
    height: 25px;
    border: 1px solid #202020a9;
}

.cont2 .btn {
    width: 30%;
    height: 30px;
    border: none;
    background-color: #007A5E;
    color: white;
    font-size: 18px;
}

form div {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

form {
    width: 100%;
    padding: 10px;
}

/* .formEm{
    height: 50%!important;
} */

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
    width: 48%;
    background-color: #0B9777;
    border: none;
    border-radius: 5px;
    padding: 10px 0;
    right: 0%;

}

.res_butt {
    font-size: large;
    font-weight: bold;
    color: white;
    width: 38%;
    background-color: #ff0000;
    border: none;
    border-radius: 5px;
    padding: 10px 0;
    margin-right: 129px;
}

.profil {
    display: flex;
}

.profil h1 {
    font-size: 22px;

}

.name {
    margin: auto 15px;
}

.pList {
    margin-top: 50px;
}

.list {
    display: block;
}

.list li {
    display: flex;
    margin-top: 25px;
    width: 100%;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.list li span {
    font-size: 18px;
    margin: auto 10px;
    color: #202020b7 !important;
}
</style>