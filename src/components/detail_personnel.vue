<template>
    <div class="container">
        <side_bar />
        <div class="total2">
            <section ref="detailsContainer" class="total">
            <div class="heaths">
                <div></div>
                <div style=" width: 50%; display: flex; justify-content: space-between;">
                    <button @click="showModal2" style="background-color: rgb(0, 122, 94);">Affecter</button>
                    <button @click="generatePdf" style="background-color: rgb(0, 122, 94);">Imprimer</button>
                    <button style="background-color: red;" @click="deletePersonnel">Supprimer</button>
                </div>
            </div>
            <div class="Imprimable" id="imprimer_moi" style="margin-top: 30px!important; width: 100%; display: block;">
                <h1 class="tete" style="color:rgb(0, 122, 94); background-color: white;  width: 100%; margin: auto;">
                    Fiche du personnel</h1>
                <div class="personnel1">
                    <h1 class="title">Détails du personnel</h1>
                    <div v-if="personnel">
                        <div class="personnel-details">
                            <div class="call1">
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
                            </div>
                            <div class="call2">
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
                    </div>
                    <div v-else>
                        <p>Chargement des informations...</p>
                    </div>
                </div>
                <div class="affectation1">
                    <h1 class="title">Etats de service</h1>
                    <table style="width: 100%; text-align: center;">
                        <thead class="tabH">
                            <tr>
                                <th></th>
                                <th><label for="" class="attr">Numéro Acte</label></th>
                                <th><label for="" class="attr">Date Signature</label></th>
                                <th><label for="" class="attr">Type Acte</label></th>
                                <th><label for="" class="attr">Structure</label></th>
                                <th><label for="" class="attr">Fonction</label></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-row" v-for="(lieu, index) in lieuService" :key="lieu.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ lieu.id_acte }}</td>
                                <td>{{ formatDate(lieu.date_signatureacte) }}</td>
                                <td>{{ lieu.categorie_acte }}</td>
                                <td>{{ lieu.id_fsnouvelle }}</td>
                                <td>{{ lieu.poste }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="formation1">
                    <h1 class="title">Formations</h1>
                    <table style="width: 100%; text-align: center;">
                        <thead class="tabH">
                            <tr>
                                <th></th>
                                <th><label for="" class="attr">Numéro Acte</label></th>
                                <th><label for="" class="attr">Date Signature</label></th>
                                <th><label for="" class="attr">Structure</label></th>
                                <th><label for="" class="attr">Fonction</label></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-row" v-for="(miseStage, index) in miseStages" :key="miseStage.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ miseStage.id_acte }}</td>
                                <td>{{ formatDate(miseStage.date_signatureacte) }}</td>
                                <td>{{ miseStage.lieu_stage }}</td>
                                <td>{{ miseStage.poste }}</td>
                                


                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
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
import html2pdf from 'html2pdf.js'
export default {
    data() {
        return {
            personnel: null,
            lieuService: [],
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

        generatePdf() {
            let elementToPrint = document.getElementById('imprimer_moi');

            // Créez un nouveau document HTML avec l'en-tête et le contenu
            let newDoc = document.implementation.createHTMLDocument('');
            let header = newDoc.createElement('div');
            header.innerHTML = `
  <div style="font-family: sans-serif; text-align: center; width: 100%; font-size: 17px; font-weight: bold; margin-bottom: 20px; display: flex; justify-content: space-between; ">
    <div>
        <h1 style="text-align: center; font-size: 15px; font-weight: bold;">REPUBLIQUE DU CAMEROUN</h1>
        <p style="font-size: 12px; color: rgba(0, 0, 0, 0.7);">Paix-Travail-Patrie</p>
        <h1 style="text-align: center; font-size: 15px; font-weight: bold;">MINISTERE DE LA SANTE PUBLIQUE</h1>
    </div>
    <div>
        <h1 style="text-align: center; font-size: 15px; font-weight: bold;">REPUBLIC OF CAMEROON</h1>
        <p style="font-size: 12px; color: rgba(0, 0, 0, 0.7);">Peace-Work-Fatherland</p>
        <h1 style="text-align: center; font-size: 15px; font-weight: bold;">MINISTRY OF PUBLIC HEALTH</h1>
    </div>
  </div>
`;
            newDoc.body.appendChild(header);
            // Ou vous pouvez cacher des éléments que vous ne souhaitez pas inclure dans le PDF
            let elementsToHide = elementToPrint.querySelectorAll('.hide-in-pdf');
            elementsToHide.forEach(element => {
                element.style.display = 'none';
            });
            let titre = elementToPrint.querySelectorAll('.title');
            titre.forEach(element => {
                element.style.fontSize = '20px';
                element.style.padding = '5px 0';
                element.style.color = 'black';
                // element.style.backgroundColor = '';
                element.style.textAlign = 'center';

            });
            let attr = elementToPrint.querySelectorAll('.attr');
            attr.forEach(element => {
                element.style.fontSize = '17px';
                element.style.padding = '5px';
            });
            let tabH = elementToPrint.querySelectorAll('.tabH');
            tabH.forEach(element => {
                element.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            });
            let formation1 = elementToPrint.querySelectorAll('.formation1');
            formation1.forEach(element => {
                element.style.marginTop = '45px';
            });
            let affectation1 = elementToPrint.querySelectorAll('.affectation1');
            affectation1.forEach(element => {
                element.style.marginTop = '45px';
            });
            let tet = elementToPrint.querySelectorAll('.tete');
            tet.forEach(element => {
                element.style.color = 'rgba(0, 0, 0, 1)';
                element.style.textAlign = 'center';
            });

            newDoc.body.appendChild(elementToPrint.cloneNode(true));

            let footer = newDoc.createElement('div');
  footer.setAttribute('style', ' left: 0; margin-top: 30%; border-top: 2px solid rgba(0, 0, 0, 0.6); right: 0; font-family: sans-serif; text-align: center; width: 100%; margin-bottom: 15px;');
  footer.innerHTML = `
    <p style="font-size: 18px; font-weight: bold;">OBSDRHMINSANTE</p>
  `;
  newDoc.body.appendChild(footer);
            // Maintenant, générez le PDF
            html2pdf(newDoc.body, {
                margin: 15,
                filename: 'Fiche du personnel',
                image: {
                    type: 'jpeg',
                    quality: 2
                },
                html2canvas: {
                    scale: 2
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                }
            });
        },
        loadPersonnelDetails() {
            const matricule = this.$route.params.matricule;
            axios.get(`http://localhost:3000/personnel/${matricule}`)
                .then(response => {
                    this.personnel = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des informations du personnel :', error);
                });
        },
        updateSelectedActe() {
            const selectedActe = this.actes.find(acte => acte.numero === this.selectedActeNumber);
            this.selectedActeSignatureDate = selectedActe.signature_date;
            this.selectedActeCategorie = selectedActe.categorie;
        },
        envoyerDonnees(donnees) {
            // Ici, vous devez ajouter la logique pour envoyer les données
            console.log('Envoi des données :', donnees);
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
                this.modalVisible2 = false;
                this.success = true;
                this.successMessage = response.data.message;
                this.id_perso = '';
                this.id_acte = '';
                this.id_fsactuel = '';
                this.id_fsnouvelle = '';
                this.poste = '';
            } catch (error) {
                this.modalVisible2 = false;
                this.error = true;
                this.errorMessage = error.response.data.message;
            }
        },
        loadLieuService() {
            const matricule = this.$route.params.matricule;
            axios.get(`http://localhost:3000/lieu_service/${matricule}`)
                .then(response => {
                    this.lieuService = response.data;
                    console.log({bonjour:this.lieuService});
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des informations du lieu de service :', error);
                });
        },
        loadFormation() {
            const matricule = this.$route.params.matricule;
            axios.get(`http://localhost:3000/approbation_stage/${matricule}`)
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
                const response = await axios.delete(`http://localhost:3000/personnel/${matricule}`);
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
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

.total2 {
    display: block;
    width: 70%;
    margin-left: 22.5%;
}

.container {
    width: 100%;
    font-family: Monda;
    margin: 0;
    display: flex;
}

thead {
    border: 1px solid rgba(0, 0, 0, 0.3);
}

.container h1 {
    background-color: rgb(0, 122, 94);
    padding: 10px 0;
    color: white;
    text-align: center;

}

.personnel-details {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.call1,
.call2 {
    width: 40%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
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

.attr {
    font-size: 20px;
    font-weight: bold;
    width: 25%;
}

table {
    border-collapse: collapse;
    margin-top: 30px;
}

table td {
    border: 1px solid #ccc;
    padding: 8px;
}

table tr:last-child td {
    border-bottom: none;
}

.affectation,
.personnel,
.formation {
    width: 32%;
}

.affectation1,
.personnel1,
.formation1 {
    width: 100%;
    margin: auto;
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
.popup-content{
    border-radius: 10px;
    background-color: white;
    width: 500px;
    margin: 15% auto;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;

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