<template>
    <div class="processus">
        <div class="process">
            <div class="proces_list">
            <structures/>
        </div>
        <div class="proces_list">
            <affectationPage/>
        </div>
        <div class="proces_list">
            <serviceFonction/>
        </div>
        <div class="proces_list">
            <structureSanitaire/>
        </div>
        </div>
        <div class="process">
            <div class="proces_list">
            <type_acte/>
        </div>
        <div class="proces_list">
            <type_user/>
        </div>
        <div class="proces_list">
            <typeForm/>
        </div>
        <div class="proces_list">
            <approbation_stage/>
        </div>
        </div>
    </div>
</template>
<script>
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
    }
</script>
<style scoped>
    /* .processus{
        display: block;
    }
    .process{
        display: flex;
        justify-content: space-between;
        margin-top: 30px
    }
    .process .proces_list{
        width: 20%;
        height: 30vh;
        background-color: yellow
    } */
</style>