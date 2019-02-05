import db from '@/db';
import firebase from '@/firebase';
import { uuid } from 'vue-uuid';

import {
  PUSH_BEER,
  RESET_BEER_LIST,
  PUSH_BREWER,
  RESET_BREWER_LIST,
  SET_BEER
} from './mutations';

const state = {
  list: [],
  brewer: [],
  beer: {
    id: "",
    abv: "",
    brewer: "",
    brewerId: "",
    compId: "",
    name: "",
    style: ""
  }
};

const getters = {
  list: ({list}) => list,
  brewer: ({brewer}) => brewer,
  beer: ({beer}) => beer
};

const mutations = {

  [PUSH_BEER](state, beer) {
    state.list.push(beer);
  },

  [RESET_BEER_LIST](state, competition) {
    state.list = [];
  },

  [PUSH_BREWER](state, beer) {
    state.brewer.push(beer);
  },

  [RESET_BREWER_LIST](state, brewer) {
    state.brewer = [];
  },

  [SET_BEER](state, beer) {
    state.beer = Object.assign({}, state.beer, beer);
  }

}

const actions = {
  list({commit}, competition) {
    commit(RESET_BEER_LIST);

    db.collection('beers').where("compId", "==", competition).orderBy("style","asc").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          commit(PUSH_BEER, {
            id: change.doc.id,
            ...change.doc.data()
          });
        }
      });
    });
  },

  brewer({commit}, brewer) {
    commit(RESET_BREWER_LIST);

    db.collection('beers').where("brewerId", "==", brewer).orderBy("timestamp","asc").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          commit(PUSH_BREWER, {
            id: change.doc.id,
            ...change.doc.data()
          });
        }
      });
    });
  },

  async get({commit}, payload) {
    const beer = await db.collection('beers').where("compId", "==", payload.compId).where("brewerId", "==", payload.brewerId).limit(1).get();

    if (typeof beer.docs !== 'undefined' && beer.docs.length > 0) {
      console.log('Beer already registered, setting to state')
      commit(SET_BEER, {
        id: beer.docs[0].id,
        ...beer.docs[0].data()
      });
    } else {
      console.log('No beer registered yet...')
      commit(SET_BEER, {
        id: uuid.v4(),
        brewerId: payload.brewerId,
        brewer: payload.brewer,
        compId: payload.compId
      });
    }
  },

  async create({state}) {
    console.log(state.beer.id)
    await db.collection('beers').doc(state.beer.id)
            .set({
              abv: state.beer.abv,
              brewer: state.beer.brewer,
              brewerId: state.beer.brewerId,
              compId: state.beer.compId,
              name: state.beer.name,
              style: state.beer.style,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            },{merge: true});
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
