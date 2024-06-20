<template>
    <div>
        <div class="profil">
            <div class="name">
                <!-- <h1 style="color: #202020;"><span>{{ currentUser ? currentUser.name : '' }}</span> -->
                <h1 style="color: #202020;"><span>Dimitri</span>
                </h1>
                <!-- <p style="font-size: 15px; margin-top: -10px;">{{ currentUser ? currentUser.contact : '' }}</p> -->
                <p style="font-size: 15px; margin-top: -10px;">dimitri@gmail.com</p>
            </div>
        </div>
        <div class="pList">
            <ul class="list">
                <li>
                    <img style="width: 30px; margin: auto 0px;" src="" alt="">
                    <router-link style="text-decoration: none;" to="/ProfilePage"><span>Parametres</span></router-link>
                </li>
                <li>
                    <img style="width: 30px;  margin: auto 0px;" src="" alt="">
                    <span>Deconnexion</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
    }
}
</script>
<style scoped>
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

.list li img {
    height: 30px !important;
}
</style>