<template>
    <div class="row">
        <div class="col auth">
            <template v-if="!isLoggedIn">
                <a href="#" class="login-link" @click.prevent="login">Login</a>
                <a href="#" class="register-link" @click.prevent="registration">Registration</a>
            </template>
            <template v-else>
                <span class="name" v-show="name">Welcome, <b>{{ name }}</b></span>
                <a href="#" class="register-link" @click.prevent="logout">Logout</a>
            </template>
        </div>
    </div>
</template>
        
<script>
    export default {
        name: `Auth`,
        components: {
            
        },
        props: {
            
        },
        data() {
            return {
                
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isAuthenticated
            },
            name () {
                return !this.$store.getters.user ? false : this.$store.getters.user.name
            }
        },
        mounted() {
        },
        methods: {
            login() {
                this.$router.push('/login');
            },
            registration() {
                this.$router.push('/register');
            },
            logout() {
                this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/login')
                });
            }
        }
    }
</script>

<style>
.auth {
    text-align: right;
}

.auth a {
    padding-right: 24px;
}

.auth a:last-child {
    padding-right: 0;
}

.name {
    margin-right: 15px;
}

@media (max-width: 767px) {
    .auth {
        margin-bottom: 5px;
        
        text-align: center;
    }
}
</style>
