<template>
  <div  class="container monda-font ">
    <nav>
      <img src="" alt="" />
    </nav>
    <div>
      <h2 class="monda-font">Connexion</h2>
    </div>
    <form @submit.prevent="login">
      <div class="input-field">
        <div><label for="email">Téléphone/Email</label></div>
        <input id="contact" v-model="loginForm.username" required>
      </div>
      <div class="input-field">
        <div><label for="password">Mot de passe</label></div>
        <input type="password" id="password" v-model="loginForm.password" required>
      </div>
      <div>
        <button class="btn" type="submit" :disabled="loading">
          <span class="loading-indicator" v-if="loading"></span>
          <span v-else>Connexion</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      noms: [
        { nom: "Randy"},
        {nom: "Dimitri"},
        {nom: "Durelle"},
        {nom: "Patrick"},
        {nom: "Ange"}
      ],
      loginForm: {
        username: '', 
        password: ''
      },
      loggedIn: false,
      username: '',
    };
  },

  methods: {
    async login() {
      try {
        const response = await axios.post('https://minsante-6405bf7b686a.herokuapp.com/login', this.loginForm);
        const { token } = response.data;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', this.loginForm.username);
          console.log(this.loginForm.username);
          this.loggedIn = true;
          this.username = this.loginForm.username;
          this.$router.push("acceuilPage");
        } else {
          throw new Error('Réponse invalide');
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert('Échec de la connexion');
      }
    }
  },
};
</script>

<style scoped>
h2 {
  font-size: 25px;
  font-weight: bold;
  color: #007A5E;
}

.stext {
  color: rgba(0, 0, 0, 0.2);
  font-size: 13px;
  margin-top: -20px;
}

.container {
  text-align: left;
  width: 450px;
  height: 450px;
  margin: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2) !important;
  padding: 15px;
  margin-top: 120px;
}

form {
  width: 100%;
  margin-top: 20px;
}

.monda-font {
  font-family: 'Monda', sans-serif;
}

input {
  width: 98%;
  height: 30px;
  border: none;
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  margin-top: 5px;

}

input:nth-child(2) {
  margin-bottom: 20px;
}

label {
  font-weight: 700;
  font-size: 16px;
  color: rgba(6, 40, 61, 0.555)
}

.mot {
  color: rgba(6, 40, 61, 1);
  font-weight: 500;
  font-size: 15px;
}

.btn {
  margin-top: 20px;
  font-size: 17px;
  background: #007A5E;
  border: none;
  width: 100%;
  border-radius: 10px;
  height: 35px;
  color: white;
}

.pas {
  font-weight: 700;
  color: rgba(6, 40, 61, 1);
  font-size: 14px;
}

.pas a {
  text-decoration: none;
  color: rgb(214, 106, 5);
}

.loading-indicator::after {
  content: "";
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: 3px solid white;
  border-top-color: #007A5E;
  border-bottom-color: #007A5E;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-indicator {
  display: flex;
  justify-content: center;
  height: 100px;
}
</style>