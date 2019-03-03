import db from '@/db';
import firebase from '@/firebase';
import { uuid } from 'vue-uuid';

import {
  PUSH_BEER,
  RESET_BEER_LIST,
  SET_BEER,
  SET_BEERS,
  UPDATE_ORDER
} from './mutations';

const state = {
  list: [],
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
  beer: ({beer}) => beer
};

const mutations = {

  [PUSH_BEER](state, beer) {
    state.list.push(beer);
  },

  [RESET_BEER_LIST](state, competition) {
    state.list = [];
  },

  [SET_BEER](state, beer) {
    state.beer = Object.assign({}, state.beer, beer);
  },

  [SET_BEERS](state, list) {
    state.list = list;
  },

  [UPDATE_ORDER](state, list) {
    for (var i=0; i<list.length; i++) {
      state.list[i].order = i;
    }
  }

}

const actions = {
  list({commit}, competition) {
    commit(RESET_BEER_LIST);

    db.collection('beers').where("compId", "==", competition).orderBy("order","asc").onSnapshot(snapshot => {
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
    commit(RESET_BEER_LIST);

    db.collection('beers').where("brewerId", "==", brewer).orderBy("timestamp","asc").onSnapshot(snapshot => {
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

  async get({commit}, payload) {
    const beer = await db.collection('beers').where("compId", "==", payload.compId).where("brewerId", "==", payload.brewerId).limit(1).get();

    if (!beer.empty)  {
      commit(SET_BEER, {
        id: beer.docs[0].id,
        ...beer.docs[0].data()
      });
    } else {
      commit(SET_BEER, {
        id: uuid.v4(),
        brewerId: payload.brewerId,
        brewer: payload.brewer,
        compId: payload.compId,
        order: 9999,
        accepted: true
      });
    }
  },

  async set({state}) {
    console.log(state.beer)
    await db.collection('beers').doc(state.beer.id)
            .set({
              abv: state.beer.abv,
              brewer: state.beer.brewer,
              brewerId: state.beer.brewerId,
              compId: state.beer.compId,
              name: state.beer.name,
              style: state.beer.style,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              order: state.beer.order,
              accepted: state.beer.accepted
            },{merge: true});
  },

  async batchUpdate({state}) {
    var batch = db.batch();
    for (var i=0; i<state.list.length; i++) {
      var beerDoc = db.collection("beers").doc(state.list[i].id);
      batch.update(beerDoc, {order: state.list[i].order, accepted: state.list[i].accepted});
    }
    batch.commit().then(function () {
      alert('updated beers')
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
