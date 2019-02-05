import db from '@/db';
import firebase from '@/firebase';

import {
  PUSH_COMPETITION,
  RESET_COMPETITION_LIST,
  PUSH_BREWER_COMPETITION,
  RESET_BREWER_COMPETITION_LIST,
  SET_COMPETITION
} from './mutations';

const state = {
  list: [],
  brewer: [],
  competition: null
};

const getters = {
  list: ({list}) => list,
  brewer: ({brewer}) => brewer,
  competition: ({competition}) => competition
};

const mutations = {

  [PUSH_COMPETITION](state, competition) {
    state.list.push(competition);
  },

  [RESET_COMPETITION_LIST](state) {
    state.list = [];
  },

  [PUSH_BREWER_COMPETITION](state, competition) {
    state.brewer.push(competition);
  },

  [RESET_BREWER_COMPETITION_LIST](state) {
    state.brewer = [];
  },

  [SET_COMPETITION](state, competition) {
    state.competition = competition;
  }

}

const actions = {
  list({commit}) {
    commit(RESET_COMPETITION_LIST);

    db.collection('competitions').orderBy("date", "desc").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          commit(PUSH_COMPETITION, {
            id: change.doc.id,
            ...change.doc.data()
          });
        }
      });
    });
  },

  brewer({commit}, brewer) {
    commit(RESET_BREWER_COMPETITION_LIST);

    db.collection('competitions').where("hostId", "==", brewer).orderBy("date", "desc").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          commit(PUSH_BREWER_COMPETITION, {
            id: change.doc.id,
            ...change.doc.data()
          });
        }
      });
    });
  },

  async get({commit}, id) {
    const competition = await db.collection('competitions').doc(id).get();

    if (competition.exists) {
      console.log('found competition')
      commit(SET_COMPETITION, {
        id: competition.id,
        ...competition.data()
      });
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
