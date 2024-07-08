<template>
    <div>
        <h1>Enregistrement</h1>
        <form @submit.prevent="register">
            <label for="username">Nom d'utilisateur:</label>
            <input v-model="username" type="text" id="username" required>

            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required>

            <label for="password">Mot de passe:</label>
            <input v-model="password" type="password" id="password" required>

            <button type="submit">S'enregistrer</button>
        </form>

        <h1>Connexion</h1>
        <form @submit.prevent="login">
            <label for="loginUsername">Nom d'utilisateur:</label>
            <input v-model="loginUsername" type="text" id="loginUsername" required>

            <label for="loginPassword">Mot de passe:</label>
            <input v-model="loginPassword" type="password" id="loginPassword" required>

            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            loginUsername: '',
            loginPassword: ''
        }
    },
    methods: {
        register() {
            localStorage.setItem('username', this.username);
            localStorage.setItem('email', this.email);
            localStorage.setItem('password', this.password);
            alert('Enregistrement réussi!');
        },
        login() {
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (this.loginUsername === storedUsername && this.loginPassword === storedPassword) {
                alert('Connexion réussie!');
                this.$router.push('acceuilPage')
            } else {
                alert('Nom d\'utilisateur ou mot de passe incorrect.');
            }
        }
    }
}
</script>