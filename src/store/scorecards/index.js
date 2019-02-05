import db from '@/db';
import firebase from '@/firebase';
import { uuid } from 'vue-uuid';

import {
  RESET_SCORECARD_LIST,
  PUSH_SCORECARD,
  SET_SCORECARD
} from './mutations';


const state = {
  list: [],
  scorecard: {}
};

const getters = {
  list: ({list}) => list,
  scorecard: ({scorecard}) => scorecard
};

const mutations = {

  [PUSH_SCORECARD](state, scorecard) {
    state.list.push(competition);
  },

  [RESET_SCORECARD_LIST](state) {
    state.list = [];
  },

  [SET_SCORECARD](state, scorecard) {
    state.scorecard = scorecard;
  }

};

const actions = {
  listByCompetition({commit}, competition) {
    commit(RESET_SCORECARD_LIST);

    db.collection('scorecards').where('compId', '==', competition).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          commit(PUSH_SCORECARD, {
            id: change.doc.id,
            ...change.doc.data()
          });
        }
      });
    });
  },

  listByBrewer({commit}, brewer) {
    commit(RESET_SCORECARD_LIST);

    db.collection('scorecards').where('brewerId', '==', brewer).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          commit(PUSH_SCORECARD, {
            id: change.doc.id,
            ...change.doc.data()
          });
        }
      });
    });
  },

  async get({commit}, payload) {
    const scorecard = await db.collection('scorecards').where("compId", "==", payload.compId).where("brewerId", "==", payload.brewerId).limit(1).get();

    if (typeof scorecard.docs !== 'undefined' && scorecard.docs.length > 0) {
      commit(SET_SCORECARD, {
        id: scorecard.docs[0].id,
        ...scorecard.docs[0].data()
      });
    } else {
      commit(SET_SCORECARD, {
        id: uuid.v4(),
        brewerId: payload.brewerId,
        compId: payload.compId
      });
    }
  },

  async set({state}) {
    await db.collection('scorecard').doc(state.scorecard.id).set({
      ...state.scorecard,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    },{merge: true});
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
