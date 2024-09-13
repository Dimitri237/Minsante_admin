<template>
  <div class="splash-screen">
    <h1 class="animate__animated animate__fadeInDown">MINESANTE SITE</h1>
    <h2 class="animate__animated animate__fadeInUp">Manager</h2>

  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push('/auth');
    }, 5000);
  },
};
</script>

<style scoped>
.splash-screen {
  height: 100vh; 
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