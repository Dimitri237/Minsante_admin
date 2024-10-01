<template>
    <div class="processus">
        <div class="process">
            <div class="proces_list">
                <h2 style="color: white;">Adress<i style="margin-left: 55%;" class="fa fa-plus" @click="struct"></i>
                </h2>
                <div class="box">
                    <div class="name" v-for="adress in adressFile" :key="adress.id">{{ adress.libelle }}</div>
                </div>
                <div class="modals2" v-if="ShowStructures">
                    <div class="modalsContain animate__animated animate__fadeInDown">
                        <div class="close" @click="hideModal">
                            <i class="fa fa-window-close"></i>
                        </div>
                        <structures />
                    </div>
                </div>

            </div>
            <div class="proces_list">
                <h2 style="color: white;">Affectation<i style="margin-left: 55%;" class="fa fa-plus" @click="affect"></i>
                </h2>
                <div class="box">
                    <div class="name" v-for="adress in adressFile" :key="adress.id">{{ adress.libelle }}</div>
                </div>
                <div class="modals2" v-if="affectationPage">
                    <div class="modalsContain animate__animated animate__fadeInDown">
                        <div class="close" @click="hideModal">
                            <i class="fa fa-window-close"></i>
                        </div>
                        <affectationPage />
                    </div>
                </div>

            </div>
            <div class="proces_list">
                <h2 style="color: white;">serviceFonction<i style="margin-left: 55%;" class="fa fa-plus" @click="serviceF"></i>
                </h2>
                <div class="box">
                    <div class="name" v-for="adress in adressFile" :key="adress.id">{{ adress.libelle }}</div>
                </div>
                <div class="modals2" v-if="serviceFonction">
                    <div class="modalsContain animate__animated animate__fadeInDown">
                        <div class="close" @click="hideModal">
                            <i class="fa fa-window-close"></i>
                        </div>
                        <serviceFonction />
                    </div>
                </div>

            </div>
        </div>
        <div class="process">
            <div class="proces_list">
                <h2 style="color: white;">Type d'acte<i style="margin-left: 55%;" class="fa fa-plus" @click="typActe"></i>
                </h2>
                <div class="box">
                    <div class="name" v-for="adress in adressFile" :key="adress.id">{{ adress.libelle }}</div>
                </div>
                <div class="modals2" v-if="type_acte">
                    <div class="modalsContain animate__animated animate__fadeInDown">
                        <div class="close" @click="hideModal">
                            <i class="fa fa-window-close"></i>
                        </div>
                        <type_acte />
                    </div>
                </div>
            </div>
            <div class="proces_list">
                <h2 style="color: white;">Type d'utilisateur<i style="margin-left: 55%;" class="fa fa-plus" @click="typUser"></i>
                </h2>
                <div class="box">
                    <div class="name" v-for="adress in adressFile" :key="adress.id">{{ adress.libelle }}</div>
                </div>
                <div class="modals2" v-if="type_user">
                    <div class="modalsContain animate__animated animate__fadeInDown">
                        <div class="close" @click="hideModal">
                            <i class="fa fa-window-close"></i>
                        </div>
                        <type_user />
                    </div>
                </div>

            </div>
            <div class="proces_list">
                <h2 style="color: white;">Type de formation<i style="margin-left: 55%;" class="fa fa-plus" @click="typForm"></i>
                </h2>
                <div class="box">
                    <div class="name" v-for="adress in adressFile" :key="adress.id">{{ adress.libelle }}</div>
                </div>
                <div class="modals2" v-if="typeForm">
                    <div class="modalsContain animate__animated animate__fadeInDown">
                        <div class="close" @click="hideModal">
                            <i class="fa fa-window-close"></i>
                        </div>
                        <typeForm />
                    </div>
                </div>
            </div>
        </div>
        <div class="process">
            <div class="proces_list">
                <h2 style="color: white;">aprobation de stage<i style="margin-left: 55%;" class="fa fa-plus" @click="approStage"></i>
                </h2>
                <div class="box">
                    <div class="name" v-for="adress in adressFile" :key="adress.id">{{ adress.libelle }}</div>
                </div>
                <div class="modals2" v-if="approbation_stage">
                    <div class="modalsContain animate__animated animate__fadeInDown">
                        <div class="close" @click="hideModal">
                            <i class="fa fa-window-close"></i>
                        </div>
                        <approbation_stage />
                    </div>
                </div>
            </div>
            <div class="proces_list">
                <h2 style="color: white;">structure sanitaire<i style="margin-left: 55%;" class="fa fa-plus" @click="structSni"></i>
                </h2>
                <div class="box">
                    <div class="name" v-for="adress in adressFile" :key="adress.id">{{ adress.libelle }}</div>
                </div>
                <div class="modals2" v-if="structureSanitaire">
                    <div class="modalsContain animate__animated animate__fadeInDown">
                        <div class="close" @click="hideModal">
                            <i class="fa fa-window-close"></i>
                        </div>
                        <structureSanitaire />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import structures from './admin_add/adress_page.vue';
import affectationPage from './admin_add/affectation_page.vue';
import serviceFonction from './admin_add/service_fonction.vue';
import structureSanitaire from './admin_add/structure_sanitaire.vue';
import type_acte from './admin_add/type_acte.vue';
import approbation_stage from './admin_add/approbation_page.vue';
import type_user from './admin_add/type_user.vue';
import typeForm from './admin_add/type_fs.vue';



export default {
    components: {
        structures,
        affectationPage,
        structureSanitaire,
        type_acte,
        typeForm,
        type_user,
        serviceFonction,
        approbation_stage
    },
    data() {
        return {
            ShowStructures: false,
            adressFile: [],
        }
    },
    mounted() {
        this.getAdress();
    },
    methods: {
        struct() {
            this.ShowStructures = true;
        },
        hideModal(){
            this.ShowStructures = false;
        },
        async getAdress() {
            try {
                const response = await axios.get('https://minsante-api-636b67309a26.herokuapp.com/adress'); // Appeler l'API GET
                this.adressFile = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des adresses :', error);
            }
        },
    }
}
</script>
<style scoped>
.processus {
    display: block;
    width: 90%;
    margin: auto;
}

.process {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

}

.process .proces_list {
    width: 20%;
    display: block;
    background-color: #0B9777;

}

.modals2 {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    width: 100%;
    top: 0%;
    left: 0%;
    height: 100vh;
}

.close {
    text-align: end;
}

.close i {
    color: rgba(255, 0, 0, 0.945);
    font-size: 25px;
    margin-top: 8px;
}

.modalsContain {
    background-color: white;
    width: 30%;
    margin: 20% 33%;
    padding: 25px 25px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.box {
    width: 99%;
    height: 200px;
    border: 2px solid #0B9777;
    overflow-y: scroll;
    background-color: #fff;
    scrollbar-width: none;
}

.box::-webkit-scrollbar {
    display: none;
}

.name {
    padding: 5px;
    border-bottom: 1px solid #ddd;
}

.name:last-child {
    border-bottom: none;
}
</style>