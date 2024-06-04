<template>
    <div class="container">
        <div class="retour">
            <router-link to="/acceuilPage"><i class="fas fa-chevron-left"></i></router-link>
        </div>
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
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            personnel: null,
            lieuService: null,
            miseStages: null
        }
    },
    created() {
        this.loadPersonnelDetails();
        this.loadLieuService();
        this.loadFormation();
    },
    methods: {
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
        loadLieuService() {
            const matricule = this.$route.params.matricule;
            axios.get(`http://localhost:3000/lieu_service/${matricule}`)
                .then(response => {
                    this.lieuService = response.data;
                })
                .catch(error => {
                    console.error('Erreur lors du chargement des informations du lieu de service :', error);
                });
        },
        loadFormation() {
            const matricule = this.$route.params.matricule;
            axios.get(`http://localhost:3000/mise_stage/${matricule}`)
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
        }
    }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

.retour {
    padding: 20px 0;
    width: 100%;
    text-align: center;
    margin-bottom: -30px;
}

.retour i {
    font-size: 40px;
    color: rgb(0, 122, 94);
}

.container {
    max-width: 800px;
    font-family: Monda;
    margin: 0 auto;
    padding-bottom: 30px;
    margin-top: -10px;
}

.container h1 {
    background-color: rgb(0, 122, 94);
    padding: 12px 0;
    color: white;
    text-align: center;
}

.personnel-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
</style>