<template>
    <div class="side_barre">

        <nav style="width: 100%;">
            <center>
                <!-- <img style="width: 100px; margin-top: 20px;" src="@/assets/flysoft.png" alt="" /> -->
            </center>


            <ul>
                <li>
                    <router-link to="/acceuilPage" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-home"></i>
                        <h3>Accueil</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage3" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-file-alt"></i>
                        <h3>Actes</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage7" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fa fa-users"></i>
                        <h3>Personnels</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage2" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-bullhorn"></i>
                        <h3> Offres</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage5" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-envelope"></i>
                        <h3>Requetes</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage4" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-star"></i>
                        <h3>Realisation</h3>

                    </router-link>
                </li>
                
                <!-- <li>
                    <router-link to="/acceuilPage6" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-chart-pie"></i>
                        <h3>Processus</h3>

                    </router-link>
                </li> -->
                
                <li>
                    <router-link to="/acceuilPage1" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fa fa-user"></i>
                        <h3>Profil</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage1" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fa fa-cog"></i>
                        <h3>Parametres</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage1" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fa fa-info"></i>
                        <h3>Confidentialité</h3>

                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);



.side_barre {
    width: 15%;
    background-color: #0B9777;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    height: 100vh;
    position: fixed;

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


/*nav barre*/
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

li:hover {
    cursor: pointer;
}


.butt {
    border: none;
    background: none;
    cursor: pointer;
    width: 80%;
    margin: 40px auto;
    padding: 8px 1px;

}
</style>