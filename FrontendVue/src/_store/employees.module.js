import { employeeService } from '../_services';
import { router } from '../_helpers';
const state = {
    all: {},
    status: {},
    user: null
};


const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        employeeService.getAll()
            .then(
                employees => commit('getAllSuccess', employees),
                error => commit('getAllFailure', error)
            );
    },
    delete({ commit }, id) {
        commit('deleteRequest', id);

        employeeService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    },
    createEmployee({ dispatch, commit }, user) {
        commit('EmployeeCreateRequest', user);

        employeeService.createEmployee(user)
            .then(
                user => {
                    commit('EmployeeCreatedSuccessfully', user);
                    // router.push('/login');
                    router.go()
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Employee Created Successfully', { root: true });
                    })
                },
                error => {
                    commit('EmployeeCreateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
}


const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    EmployeeCreateRequest(state, user) {
        state.status = { registering: true };
    },
    EmployeeCreatedSuccessfully(state, user) {
        state.status = {};
    },
    EmployeeCreateFailure(state, error) {
        state.status = {};
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.all.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
}


export const employees = {
    namespaced: true,
    state,
    actions,
    mutations
}