<template>
  <div class="splash-screen">
    <h1 class="animate__animated animate__fadeInDown">MINESANTE SITE</h1>
    <h2 class="animate__animated animate__fadeInUp">Manager</h2>

  </div>
</template>

<script>
export default {
  mounted() {
    // Cacher le splash screen après une durée spécifique
    setTimeout(() => {
      this.$router.push('/auth');
    }, 5000); // Durée en millisecondes (10 secondes dans cet exemple)
  },
};
</script>

<style scoped>
.splash-screen {
  /* Styles pour le conteneur du splash screen */
  /* background-image: url(@/assets/flysoft.png);
  background-repeat: no-repeat;
  background-position: center;
  padding: auto;*/
  height: 100vh; 
  /* Centrer le contenu, définir un fond, etc. */
  width: 100%;
}
h1{
  color: #007A5E;
  font-size: 100px;
  width: 100%;
  text-align: center;
  font-family: Montserrat, sans-serif;
  margin-top: 200px;
}
h2{
  color: black;
  font-size: 50px;
  width: 100%;
  text-align: center;
  font-family: Montserrat, sans-serif;
}
</style>