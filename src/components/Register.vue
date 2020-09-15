<template>
    <div class="registration">
        <h1>Registration</h1>

        <template>
            <form @submit.prevent="registration">
                <div class="form-group">
                    <label for="exampleInputName">Name</label>
                    <input v-model="name" type="text" class="form-control" id="exampleInputName" aria-describedby="namelHelp" placeholder="Enter Name">
                </div>
                <div class="form-group" :class="{invalid: $v.email.$error}">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model="email" @blur="$v.email.$touch()" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small class="error" v-if="!$v.email.email">Please provide a valid email address.</small>
                    <small class="error" v-if="!$v.email.unique">This email address has been taken.</small>
                </div>
                <div class="form-group" :class="{invalid: $v.password.$error}">
                    <label for="password">Password</label>
                    <input v-model="password" @blur="$v.password.$touch()" type="password" class="form-control" id="password" placeholder="Password">
                    <small class="error" v-if="!$v.password.minLength">The password has to consider at least 6 characters.</small>
                </div>
                <div class="text-left">
                    <button type="submit" class="btn btn-success" :disabled="$v.$invalid">Registration</button>
                    <span class="message">Already registered? <router-link to="/login">Sign In</router-link></span>
                </div>
            </form>

        </template>
    </div>
</template>
        
<script>
    import {
        required,
        email,
        minLength,
    } from 'vuelidate/lib/validators';
    import axios from 'axios';

    export default {
        name: `Register`,
        components: {
            
        },
        props: {
            
        },
        data() {
            return {
                name: '',
                email: '',
                password: '',
            }
        },
        computed: {
            
        },
        mounted() {
            
        },
        methods: {
            registration() {
                const signupData = {
                    email : this.email,
                    name : this.name,
                    password : this.password,
                }
                this.$store.dispatch('register', signupData)
            }
        },
        validations: {
            email: {
                required,
                email,
                unique: val => {
                    if (val === '') return true
                    return axios.get('https://vue-journal.firebaseio.com/users.json?orderBy="email"&equalTo="' +
                            val + '"')
                        .then(res => {
                            return Object.keys(res.data).length === 0
                        })
                }
            },
            password: {
                required,
                minLength: minLength(6)
            }
        },
    }
</script>

<style>
.error {
    display: block;
    margin-top: 5px;

    color: red;
}

.message {
    margin-left: 30px;
}

@media (max-width: 767px) {
    .message {
        display: block;
        margin-left: 0;
        margin-top: 10px;
    }
}
</style>
