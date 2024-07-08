<template>
    <div class="heathse">
        <button class="btns" @click.prevent="showPriseservice">Prise de service</button>
        <button class="btns">Reprise de service</button>
        <button class="btns" @click.prevent="showFormation">Mise en stage</button>
    </div>
    <div class="heaths">
        <form class="seach" @submit.prevent="searchPersonnel">
            <input type="text" v-model="searchTerm" placeholder="Rechercher un employé..." />
            <button type="submit"><i class="fa fa-search"></i></button>
        </form>
    </div>

    <div style="width: 100%;" v-if="service_call">
        <div class="select">
        </div>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th><label for="" class="attr">Matricule N</label></th>
                    <th><label for="" class="attr">Nom & prenom</label></th>
                    <th><label for="" class="attr">Date de naissance</label></th>
                    <th><label for="" class="attr">Sexe</label></th>
                    <th><label for="" class="attr">Status</label></th>
                    <th><label for="" class="attr">Actions</label></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-row" v-for="(service, index) in priseService_repriseService" :key="service.matricule">
                    <td>{{ index + 1 }}</td>
                    <td>{{ service.id_perso }}</td>
                    <td>{{ service.nom_prenom }}</td>
                    <td>{{ formatDate(service.date_naissance) }}</td>
                    <td>{{ service.sex }}</td>
                    <td :style="{ color: service.status === 'Approuvé' ? '#007A5E' : 'rgba(0, 0, 0, 0.3)' }">{{ service.status }}</td>
                    <td>
                        <button style="border: none; color: #007A5E;" type="button" class="btn custom-modal-btn"
                            data-bs-toggle="modal" data-bs-target="#don" @click="showModal3(service)">
                            <i style="font-size: 18px;" class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div style="width: 100%;" v-if="formation_call">
        <div class="select">
        </div>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th><label for="" class="attr">Matricule N</label></th>
                    <th><label for="" class="attr">Nom & prenom</label></th>
                    <th><label for="" class="attr">Date de naissance</label></th>
                    <th><label for="" class="attr">Sexe</label></th>
                    <th><label for="" class="attr">Structure</label></th>
                    <th><label for="" class="attr">Actions</label></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-row" v-for="(mise, index) in mise_stage" :key="mise.matricule">
                    <td>{{ index + 1 }}</td>
                    <td>{{ mise.id_perso }}</td>
                    <td>{{ mise.nom_prenom }}</td>
                    <td>{{ formatDate(mise.date_naissance) }}</td>
                    <td>{{ mise.sex }}</td>
                    <td>{{ mise.id_fs }}</td>
                    <td>
                        <button style="border: none; color: #007A5E;" type="button" class="btn custom-modal-btn"
                            data-bs-toggle="modal" data-bs-target="#don" @click="showModal2(mise)">
                            <i style="font-size: 18px;" class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="modalVisible2" class="modals">
        <div class="details animate__animated animate__fadeInDown">
            <div class="close" @click="hideModal">
                <i class="fa fa-window-close"></i>
            </div>
            <h1 style="color: #007A5E; text-align: center">Fiche de suivie de l'employe N° <span
                    style="color: black;">{{ selectedMise.id_perso }}</span></h1>
            <div class="text detail_perso">
                <h2 style="color: #007A5E;">Informations</h2>
                <div class="list_detail">
                    <label>Matricule:</label>
                    <h3>{{ selectedMise.id_perso }}</h3>
                </div>
                <div class="list_detail">
                    <label>Nom & prenom:</label>
                    <h3>{{ selectedMise.nom_prenom }}</h3>
                </div>
                <div class="list_detail">
                    <label>Date de naissance:</label>
                    <h3>{{ formatDate(selectedMise.date_naissance) }}</h3>
                </div>
                <div class="list_detail">
                    <label>Sexe:</label>
                    <h3>{{ selectedMise.sex }}</h3>
                </div>
                <div class="list_detail">
                    <label>Contact:</label>
                    <h3>{{ selectedMise.telephone }}</h3>
                </div>
                <div class="list_detail">
                    <label>Structure de formation:</label>
                    <h3>{{ selectedMise.id_fs }}</h3>
                </div>
                <!-- <button class="detailler" @click="storeMatricule()"><router-link class="s_detailler"
                        :to="'/PersonnelDetails/' + selectedPersonnel.matricule">Plus de details</router-link></button> -->
            </div>
        </div>
    </div>
    <div v-if="modalVisible3" class="modals">
        <div class="details animate__animated animate__fadeInDown">
            <div class="close" @click="hideModal">
                <i class="fa fa-window-close"></i>
            </div>
            <h1 style="color: #007A5E; text-align: center">Fiche de suivie de l'employe N° <span
                    style="color: black;">{{ selectedService.id_perso }}</span></h1>
            <div class="text detail_perso">
                <h2 style="color: #007A5E;">Informations</h2>
                <div class="list_detail">
                    <label>Matricule:</label>
                    <h3>{{ selectedService.id_perso }}</h3>
                </div>
                <div class="list_detail">
                    <label>Nom & prenom:</label>
                    <h3>{{ selectedService.nom_prenom }}</h3>
                </div>
                <div class="list_detail">
                    <label>Date de naissance:</label>
                    <h3>{{ formatDate(selectedService.date_naissance) }}</h3>
                </div>
                <div class="list_detail">
                    <label>Sexe:</label>
                    <h3>{{ selectedService.sex }}</h3>
                </div>
                <div class="list_detail">
                    <label>Status:</label>
                    <h3 :style="{ color: selectedService.status === 'Approuvé' ? '#007A5E' : 'rgba(0, 0, 0, 0.3)' }"> {{ selectedService.status }} </h3>
                </div>
                <div class="list_detail">
                    <label>Contact:</label>
                    <h3>{{ selectedService.telephone }}</h3>
                </div>
                <button class="detailler" @click="ApprouverPrise()">Approuver</button>
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
            mise_stage: [],
            priseService_repriseService: [],
            modalVisible2: false,
            modalVisible3: false,
            formation_call: false,
            service_call: true,
            selectedService: []

        };
    },
    mounted() {
        this.getMiseStage()
        this.getPriseservice();
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
        showFormation() {
            this.formation_call = true;
            this.service_call = false;
        },
        showPriseservice() {
            this.service_call = true;
            this.formation_call = false;
        },
        hideModal() {
            this.modalVisible = false;
            this.modalVisible2 = false;
            this.modalVisible3 = false;
        },
        showModal() {
            this.modalVisible = true;
        },
        async showModal2(mise) {
            this.selectedMise = mise;
            try {
                await axios.get(`http://localhost:3000/mise_stage/` + mise.id_perso).then(
                    res => {
                        this.selectedFormations = res.data;

                    }
                )
            } catch (error) {
                console.error(error);
                throw error;
            }
            this.modalVisible2 = true;
        },
        async showModal3(service) {
            this.selectedService = service;
            try {
                await axios.get(`http://localhost:3000/priseService_repriseService/` + service.id_perso).then(
                    res => {
                        this.selectedPriseservice = res.data;

                    }

                )
                console.log(this.selectedService);
            } catch (error) {
                console.error(error);
                throw error;
            }
            this.modalVisible3 = true;
        },
        toggleDetails() {
            this.showDetails = !this.showDetails;
        },
        async getMiseStage() {
            try {
                const response = await axios.get('http://localhost:3000/mise_stage'); // Appeler l'API GET
                this.mise_stage = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des mise_stage :', error);
            }
        },
        async getPriseservice() {
            try {
                const response = await axios.get('http://localhost:3000/priseService_repriseService'); // Appeler l'API GET
                this.priseService_repriseService = response.data;
                console.log({ bonjour: this.priseService_repriseService });
            } catch (error) {
                console.error('Erreur lors de la récupération des priseService_repriseService :', error);
            }
        },
        ApprouverPrise() {
            const payload = {
                id_perso: this.selectedService.id_perso
            };

            fetch('http://localhost:3000/update-status/' + this.selectedService.id_perso, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(response => {
                    if (response.ok) {
                        // Mettre à jour la valeur du statut dans votre composant
                        this.selectedService.status = 'Approuvé';
                        console.log('Statut mis à jour avec succès');
                    } else {
                        console.error('Erreur lors de la mise à jour du statut');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour du statut:', error);
                });
        }
    }
};
</script>
<style scoped>
.heaths {
    width: 95%;
    background-color: rgba(0, 0, 0, 0.05);
    margin: auto;
    margin-bottom: 15px;
}

.detailler {
    margin: auto;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    padding: 10px 0;
    width: 30%;
    background-color: #0B9777;
    color: white;
}

.heathse .btns {
    width: 20%;
    padding: 10px 0;
    border: none;
    background-color: #0B9777;
    font-weight: bold;
    color: white;
    font-size: 20px;
}

.heathse {
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: auto;
    margin-bottom: 15px;
}

.heaths .seach {
    width: 30%;
    display: flex;
    justify-content: space-between;
}

.seach input {
    height: 40px;
    width: 85%;
    margin: 0;
    border: none;
    background-color: white;
    outline: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.03);
}

.seach button {
    margin: 0;
    width: 15%;
    text-align: right;
    padding: 5px 15px;
    background-color: #007A5E;
    border: none;
    text-align: center;
}

.seach i {
    font-size: 2rem;
    color: white;


}

table {
    border-collapse: collapse;
    margin-top: 30px;
    width: 95%;
    margin: auto;
}

table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

table th {
    background-color: #0B9777;
    padding: 10px;
    color: white;
}

table tr:last-child td {
    border-bottom: none;
}

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
    width: 30% !important;
    text-align: right;
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