<template>
    <div>
    <h1>
       Employees Page
    </h1>
        <h1>Hi {{account.user.username}}! and role {{account.user.role[0]}}</h1>
        <p>You're logged in with Vue + Vuex & JWT!!</p>
        <h3>Users from secure api end point:</h3>
        <em v-if="employees.loading">Loading users...</em>
        <span v-if="employees.error" class="text-danger">ERROR: {{employees.error}}</span>
        <ul v-if="employees.items">
            <li v-for="user in employees.items" :key="user.id">
                {{user.name + ' ' + user.email}}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
            </li>
        </ul>

           <em v-if="employees.loading">Loading users...</em>
        <span v-if="employees.error" class="text-danger">ERROR: {{employees.error}}</span>
        <ul v-if="employees.items">
            <li v-for="user in employees.items" :key="user.id">
                {{user.name + ' ' + user.email}}
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<style>
table, th, td {
  border: 1px solid black;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
            employees: state => state.employees.all
        })
    },
    created () {
        this.getAllEmployees();
        console.log(this.getAllEmployees())
    },
    methods: {
        ...mapActions('employees', {
            getAllEmployees: 'getAll',
             deleteUser: 'delete'
        })
    }
};
</script>