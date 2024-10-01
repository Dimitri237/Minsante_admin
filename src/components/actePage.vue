<template>
    <div class="heaths">
        <form class="seach" @submit.prevent="searchPersonnel">
            <input type="text" v-model="searchTerm" placeholder="Rechercher un employé..." />
            <button type="submit"><i class="fa fa-search"></i></button>
        </form>
    </div>
    <div class="heathse"> 
        <a class="titre1" href="">Liste des actes</a>
        <div class="btns">
                <button class="titre1" style="border: none; color: #007A5E;" type="button" data-bs-toggle="modal" data-bs-target="#don" @click="showModal2">
                    Ajouter un acte <i  class="fa fa-plus"></i>
                </button>
        </div>
    </div>
    <div class="all " style="display: flex; justify-content: space-between; width: 100%; padding: 5px!important;">

        <div style="width: 100%;">
            <div style="width: 100%;">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th><label for="" class="attr">Numéro acte</label></th>
                            <th><label for="" class="attr">Categorie Acte</label></th>
                            <th><label for="" class="attr">Type acte</label></th>
                            <th><label for="" class="attr">signe le</label></th>
                            <th><label for="" class="attr">signataire</label></th>
                            <th><label for="" class="attr">Actions</label></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-row" v-for="(acte, index) in actes" :key="acte.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ acte.numero }}</td>
                            <td>{{ acte.categorie }}</td>
                            <td>{{ acte.type }}</td>
                            <td>{{ acte.signature_date }}</td>
                            <td>{{ acte.signataire }}</td>
                            <td>
                                <button style="border: none; color: #007A5E;" type="button" class="btn custom-modal-btn"
                                    data-bs-toggle="modal" data-bs-target="#don" @click="showModal(acte)">
                                    <i style="font-size: 18px;" class="fa fa-eye" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                <h1>Signé par le {{ selectedActe.signataire }}</h1>
                <h2>le {{ selectedActe.signature_date }}</h2>

                <p>{{ selectedActe.type }}</p>
                <h3>{{ selectedActe.titre }}</h3>
                <p>{{ selectedActe.description }}</p>
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
                    <label for="nom_concerne">Categorie d'acte :</label>
                    <select name="" id="" v-model="type">
                        <option v-for="type_acte in type_actes" :value="type_acte.libelle" :key="type_acte.libelle">
                            {{ type_acte.libelle }}
                        </option>
                    </select>

                </div>
                <div class="inp-field">
                    <label for="nom_concerne"> Type d'acte :</label>
                    <select name="" id="" v-model="categorie">
                        <option v-for="categorie_acte in categorie_actes" :value="categorie_acte.libelle"
                            :key="categorie_acte.libelle">
                            {{ categorie_acte.libelle }}
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
                    <label for="">Date de signature :</label>
                    <input type="date" id="signature_date" v-model="signature_date" required><br>
                </div>
                <div class="inp-field">
                    <label for="">Signataire :</label>
                    <input type="text" id="signataire" v-model="signataire" required><br>
                </div>
                <div class="inp-field">
                    <label for="pdf">Fichier PDF :</label>
                    <input type="file" id="pdf" ref="pdfInput" required>
                </div>
                <div style="width: 95%; display: flex; justify-content: space-between;">
                    <button class="sub_butt" type="submit">Créer l'acte</button>
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
            success: false,
            error: false,
            successMessage: '',
            errorMessage: '',
            titre: '',
            description: '',
            numero: '',
            type: '',
            region: '',
            actes: [],
            create_at: '',
            type_actes: [],
            categorie_actes: []

        };
    },
    mounted() {
        this.getActes();
        this.getTypeActes();
        this.getCategorieActes();
    },
    methods: {
        hideModal() {
            this.modalVisible = false;
            this.modalVisible2 = false;
            this.success = false;
            this.error = false;
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
                const response = await axios.delete(`https://minsante-api-636b67309a26.herokuapp.com/actes/${this.selectedActe.id}`);
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
            formData.append('signataire', this.signataire);
            formData.append('signature_date', this.signature_date);
            formData.append('categorie', this.categorie);
            formData.append('pdf', this.$refs.pdfInput.files[0]); // Utilisez la référence $refs pour obtenir le fichier sélectionné

            try {
                const response = await axios.post('https://minsante-api-636b67309a26.herokuapp.com/actes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.hideModal();
                this.success = true;
                this.successMessage = response.data.message;
                console.log(response.data);
                // Réinitialiser les valeurs des champs du formulaire après la création réussie
                this.poste = '';
                this.titre = '';
                this.descript = '';
                this.numero = '';
                this.type_acte = '';
                this.categorie = '';
                this.signature_date = '';
                this.signataire = '';
            } catch (error) {
                console.error(error);
                this.hideModal();
                this.error = true;
                this.errorMessage = error.response.data.message;
            }
        },
        async getActes() {
            try {
                const response = await axios.get('https://minsante-api-636b67309a26.herokuapp.com/actes');
                this.actes = response.data;
                console.log(response.data);
                
                
            } catch (error) {
                console.error('Erreur lors de la récupération des actes:', error);
            }
        },
        async getTypeActes() {
            try {
                const response = await axios.get('https://minsante-api-636b67309a26.herokuapp.com/type_actes'); // Appeler l'API GET
                this.type_actes = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des type_actes :', error);
            }
        },
        async getCategorieActes() {
            try {
                const response = await axios.get('https://minsante-api-636b67309a26.herokuapp.com/categorie_acte'); // Appeler l'API GET
                this.categorie_actes = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des type_actes :', error);
            }
        },
    }
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

.heaths {
    width: 95%;
    background-color: rgba(0, 0, 0, 0.05);
    margin: auto;
    margin-bottom: 15px;
}

.titre1 {
    font-size: 25px;
    font-weight: bold;
    color: #0B9777;
    text-decoration: none;
}

.heathse .btns {
    width: 20%;
    border: none;
    font-weight: bold;
    font-size: 20px;
}

.heathse {
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: auto;
    margin-bottom: 15px;
    padding: 10px 0;
    border: 1px solid #0B9777;
    border-radius: 5px;
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