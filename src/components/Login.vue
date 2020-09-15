<template>
    <div class="login">
        <h1>Sign In</h1>

        <form @submit.prevent="login">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter email" required>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                    placeholder="Password" required>
            </div>
            <div class="form-group text-left">
                <small class="error" v-if="isError">{{ textError }}</small>
            </div>
            <div class="text-left">
                <button type="submit" class="btn btn-success">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: `Login`,
        components: {

        },
        props: {

        },
        data() {
            return {
                email: '',
                password: '',
                isError: false,
                textError: ''
            }
        },
        computed: {
            
        },
        mounted() {

        },
        methods: {
            login() {
                const formData = {
                    email: this.email,
                    password: this.password
                }

                this.$store.dispatch('login', {
                    email: formData.email,
                    password: formData.password
                })
                .then(() => {
                    this.isError = false;
                })
                .catch(() => {
                    this.isError = true;
                    this.textError = 'Your email/password is incorrect';
                });
            }
        }
    }
</script>

<style>
    .error {
        color: red;
    }
</style>