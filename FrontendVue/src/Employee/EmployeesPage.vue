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

        <p>
            <router-link to="/login">Logout</router-link>
        </p>


         <h2>Add New Employee</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="Name">Name</label>
                <input type="text" v-model="employee.Name" v-validate="'required'" name="Name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Name') }" />
                <div v-if="submitted && errors.has('Name')" class="invalid-feedback">{{ errors.first('Name') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="Email">Email</label>
                <input type="Email" v-model="employee.Email" v-validate="{ required: true }" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Email') }" />
                <div v-if="submitted && errors.has('Email')" class="invalid-feedback">{{ errors.first('Email') }}</div>
            </div>

              <div class="form-group">
                <label htmlFor="PhoneNumber">Phone Number</label>
                <input type="text" v-model="employee.PhoneNumber" v-validate="{ required: true }" name="PhoneNumber" class="form-control" :class="{ 'is-invalid': submitted && errors.has('PhoneNumber') }" />
                <div v-if="submitted && errors.has('PhoneNumber')" class="invalid-feedback">{{ errors.first('PhoneNumber') }}</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.registering">Create Employee</button>
                <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/login" class="btn btn-link">Cancel</router-link>
            </div>
        </form>
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
     data () {
        return {
            employee: {
                Name: '',
                Email: '',
                PhoneNumber: '',
                Image : "test"
            },
            submitted: false
        }
    },
    computed: {
        ...mapState({
            account: state => state.account,
            employees: state => state.employees.all,
            status: state => state.employees.status
        })
    },
    created () {
        this.getAllEmployees();
        console.log(this.getAllEmployees())
    },
    methods: {
        ...mapActions('employees', {
            getAllEmployees: 'getAll',
             deleteUser: 'delete',
             createEmployee : 'createEmployee'
        }),

         handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.createEmployee(this.employee);
                }
            });
        }
    }
};
</script>