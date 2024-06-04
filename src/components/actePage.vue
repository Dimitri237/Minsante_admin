<template>
    <div class="all " style="display: flex; justify-content: space-between; width: 100%; padding: 5px!important;">

        <div style="width: 100%;">
            <div class="select">
                <select class="select2" name="format" id="format">
                    <option selected disabled>Choisir un type</option>
                    <option v-for="type_acte in type_actes" :value="type_acte.id" v-bind:key="type_acte.id">
                        {{ type_acte.libelle }}
                    </option>
                </select>
            </div>
            <div v-if="loading2" class="loading-indicator">
                <!-- Indicateur de chargement, vous pouvez personnaliser cet élément -->
            </div>
            <div class="in_select" v-else v-for="acte in actes" :key="acte.id">
                <ul>
                    <li>
                        <div>
                            <h2 style="margin: 0%;">Acte N° {{ acte.numero }}</h2>
                            <p style="margin: 0%;">{{ acte.titre }}</p>
                            <a :href="getPdfDownloadUrl(acte.pdf_data)" download>Télécharger PDF</a>
                            <!-- <iframe :src="getPdfDataUrl(acte.pdf_data)" style="width: 100%; height: 500px;"></iframe> -->
                        </div>
                        <button style="border: none; background-color: #007A5E;" type="button"
                            class="btn custom-modal-btn" data-bs-toggle="modal" data-bs-target="#don"
                            @click="showModal(acte)">
                            <i style="padding: 30px; background-color: #007A5E;" class="fa fa-plus"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="bout" style="justify-content: end; display: flex;">
                <button style="border: none; padding: 10px 10px; background-color: #007A5E; color: white;" type="button"
                    class="btn custom-modal-btn" data-bs-toggle="modal" data-bs-target="#don" @click="showModal2">
                    Ajouter un acte <i style="color: white;" class="fa fa-plus"></i>
                </button>
            </div>
        </div>
    </div>
    <div v-if="modalVisible" class="modals">
        <div class="details animate__animated animate__fadeInDown">
            <div class="close" @click="hideModal">
                <i class="fa fa-window-close"></i>
            </div>
            <p>{{ selectedActe.create_at }}</p>
            <div class="text">
                <h1>Acte n° {{ selectedActe.numero }}</h1>
                <p>{{ selectedActe.type }}</p>
                <h3>{{ selectedActe.titre }}</h3>
                <p>{{ selectedActe.desscription }}</p>
            </div>
            <div class="actions">
                <button class="action">Modiffier</button>
                <button class="action" @click="deleteActe">Supprimer</button>
            </div>
        </div>
    </div>
    <div v-if="modalVisible2" class="modals2">
        <div class="details2 animate__animated animate__fadeInDown">

            <div class="close" @click="hideModal">
                <i class="fa fa-window-close"></i>
            </div>
            <div style="width: 100%; padding: 10px;">
                <h2 style="margin: 0; color: #007A5E; padding: 0;">Ajouter un acte</h2>
            </div>
            <form @submit.prevent="createActe">
                <div class="inp-field">
                    <label for="nom_concerne">Type d'acte :</label>
                    <select name="" id="" v-model="type">
                        <option v-for="type_acte in type_actes" :value="type_acte.libelle" :key="type_acte.libelle">
                            {{ type_acte.libelle }}
                        </option>
                    </select>

                </div>
                <div class="inp-field">
                    <label for="">DECISION N° :</label>
                    <input type="text" id="numero" v-model="numero" required><br>
                </div>
                <div class="inp-field">
                    <label for="">Titre :</label>
                    <input type="text" id="titre" v-model="titre" required><br>
                </div>
                <div class="inp-field">
                    <label for="descript">Description :</label>
                    <textarea id="descript" v-model="description" required></textarea><br>
                </div>
                <div class="inp-field">
                    <label for="pdf">Fichier PDF :</label>
                    <input type="file" id="pdf" ref="pdfInput" required>
                </div>
                <button class="sub_butt" type="submit">Créer l'acte</button>
            </form>
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
            titre: '',
            description: '',
            numero: '',
            type: '',
            region: '',
            actes: [],
            create_at: '',
            type_actes: []

        };
    },
    mounted() {
        this.getActes();
        this.getTypeActes();
    },
    methods: {
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
        getPdfDownloadUrl(pdfData) {
            const pdfBlob = this.base64ToBlob(pdfData, 'application/pdf');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            return pdfUrl;
        },
        getPdfDataUrl(pdfData) {
            const pdfDataUrl = `data:application/pdf;base64,${pdfData}`;
            return pdfDataUrl;
        },
        base64ToBlob(base64Data, contentType) {
            let decodedData;
            try {
                decodedData = window.atob(base64Data);
            } catch (error) {
                console.error('Failed to base64 decode the data:', error);
                return null;
            }

            let byteArrays = [];
            try {
                byteArrays.push(new Uint8Array(Array.from(decodedData).map((char) => char.charCodeAt(0))));
            } catch (error) {
                console.error('Failed to create byte array:', error);
                return null;
            }

            const blob = new Blob(byteArrays, { type: contentType });
            return blob;
        },
        async deleteActe() {
            try {
                const response = await axios.delete(`http://localhost:3000/actes/${this.selectedActe.id}`);
                console.log(response.data);
                // Supprimer l'acte de la liste actes
                this.actes = this.actes.filter(acte => acte.id !== this.selectedActe.id);
                // Masquer le modal
                this.modalVisible = false;
            } catch (error) {
                console.error(error);
            }
        },
        async createActe() {
            if (!this.$refs.pdfInput.files[0]) {
                // Afficher un message d'erreur ou une alerte si aucun fichier n'est sélectionné
                console.error('Veuillez sélectionner un fichier PDF.');
                return;
            }
            const formData = new FormData();
            formData.append('type', this.type);
            formData.append('titre', this.titre);
            formData.append('description', this.description);
            formData.append('numero', this.numero);
            formData.append('region', this.region);
            formData.append('pdf', this.$refs.pdfInput.files[0]); // Utilisez la référence $refs pour obtenir le fichier sélectionné

            try {
                const response = await axios.post('http://localhost:3000/actes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
                // Réinitialiser les valeurs des champs du formulaire après la création réussie
                this.nom_concerne = '';
                this.poste = '';
                this.titre = '';
                this.descript = '';
                this.numero = '';
                this.region = '';
                this.type_acte = '';
            } catch (error) {
                console.error(error);
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
        async getTypeActes() {
            try {
                const response = await axios.get('http://localhost:3000/type_actes'); // Appeler l'API GET
                this.type_actes = response.data;
                console.log(this.type_actes);
            } catch (error) {
                console.error('Erreur lors de la récupération des type_actes :', error);
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
    margin: 2% 33%;
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
.select2 {
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
    width: 55%;
    margin: auto;
    margin-top: 50px;
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