<template>
  <div class="container monda-font animate__animated animate__fadeInDown">
    <nav>
      <img src="" alt="" />
    </nav>
    <div>
      <h2 class="monda-font">Inscription</h2>
    </div>
    <form @submit.prevent="createAccount">
      <div class="input-field">
        <div> <label for="name">Nom & Prenom</label></div>
        <input class="input" type="text" id="username" v-model="username" required>
      </div>
      <div class="input-field">
        <div> <label for="name">Date de naissance</label></div>
        <input class="input" type="date" id="date_naissance" v-model="date_naissance" required>
      </div>
      <div class="input-field">
        <div> <label for="name">Type d'utilisateur</label></div>
        <select id="type_u" v-model="type_u" required>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="input-field">
        <div> <label for="telephone">Telephone/Email</label></div>
        <input class="input" id="contact" v-model="contact" required>
      </div>
      <div class="input-field">
        <label for="photoProfil">Photo de profil</label>
        <input type="file" id="image" @change="handleImageUpload" />
        <!-- <input class="box" type="file" id="photoProfil" accept="image/*" @change="onFileSelected2" required>
        
        <img class="affiche" :src="selectedImageURL2" v-if="selectedImage2"> -->
      </div>
      <div class="input-field">
        <div><label for="password">Mot de passe:</label></div>
        <div>
          <input class="input" type="password" id="password" v-model="password" required>

        </div>
      </div>
      <button class="btn" type="submit">
        <span>Inscription</span>
      </button>
    </form>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      date_naissance: '',
      contact: '',
      image: null,
      imageBase64: '',
      type_u: 'client',
      password: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    handleImageUpload(event) {
      this.image = event.target.files[0];
      this.convertToBase64(this.image)
        .then(base64 => {
          this.imageBase64 = base64;
        })
        .catch(error => {
          this.errorMessage = 'Erreur lors de la conversion en base64 : ' + error;
        });
    },
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = error => {
          reject(error);
        };
      });
    },
    async createAccount() {
      try {
        const formData = new FormData();
        formData.append('username', this.username);
        formData.append('date_naissance', this.date_naissance);
        formData.append('contact', this.contact);
        formData.append('image', this.image);
        formData.append('type_u', this.type_u);
        formData.append('password', this.password);

        await axios.post('http://192.168.100.116:3000/signup', formData);
        this.successMessage = 'Inscription réussie !';
        this.resetForm();
      } catch (error) {
        this.errorMessage = 'Échec de l\'inscription : ' + error.response.data.message;
      }
    },
    resetForm() {
      this.username = '';
      this.date_naissance = '';
      this.contact = '';
      this.image = null;
      this.imageBase64 = '';
      this.type_u = 'client';
      this.password = '';
      this.successMessage = '';
      this.errorMessage = '';
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 25px;
  font-weight: bold;
  color: rgba(6, 40, 61, 1);
}

.stext {
  color: rgba(0, 0, 0, 0.2);
  font-size: 13px;
  margin-top: -20px;
}

.container {
  text-align: left;
  width: 450px;
  margin: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  margin-top: 100px;
}

form {
  width: 100%;
  margin-top: 20px;
}

.monda-font {
  font-family: 'Monda', sans-serif;
}

.input {
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
  color: rgba(6, 40, 61, 1);

}

.mot {
  color: rgba(6, 40, 61, 1);
  font-weight: 500;
  font-size: 15px;
}

.affiche {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left: 38% !important;
}

.btn {
  margin-top: 20px;
  font-size: 17px;
  background: rgba(51, 167, 226, 1);
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
  border: 3px solid #06283D;
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

/*type file*/
.box {
  font-size: 15px;
  background: white;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  outline: none;
}

::-webkit-file-upload-button {
  color: white;
  background: rgba(51, 167, 226, 1);
  padding: 10px;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  outline: none;
}

::-webkit-file-upload-button:hover {
  background: rgba(51, 168, 226, 0.678);
}
</style>