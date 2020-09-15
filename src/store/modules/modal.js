export default {
    namespaced: true,
    state: {
        status: false,
        componentName: "",
        title: "",
        params: {}
    },
    mutations: {
        setModalComponentName(state, strComponentName) {
            state.componentName = strComponentName;
        },
        setModalTitle(state, strTitle) {
            state.title = strTitle;
        },
        setModalParams(state, obParams) {
            state.params = obParams;
        },
        showModal(state) {
            state.status = true;
            // eslint-disable-next-line
            let targetElement = document.querySelector('.modal__overlay');
        },
        hideModal(state) {
            state.status = false;
            state.componentName = "";
        }
    },
    actions: {
        showModal({commit}, obParams) {
            obParams = obParams || {};

            if (obParams.componentName) {
                commit('setModalComponentName', obParams.componentName);
            }
            if (obParams.title) {
                commit('setModalTitle', obParams.title);
            }
            commit('setModalParams', obParams);
            commit('showModal');
        },
        hideModal({commit}) {
            commit('hideModal');
        }
    }
}