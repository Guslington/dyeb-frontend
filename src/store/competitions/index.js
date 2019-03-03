import db from '@/db';
import firebase from '@/firebase';
import { uuid } from 'vue-uuid';

import {
  PUSH_COMPETITION,
  RESET_COMPETITION_LIST,
  SET_COMPETITION,
  RESET_COMPETITION
} from './mutations';

const state = {
  list: [],
  competition: null
};

const getters = {
  list: ({list}) => list,
  competition: ({competition}) => competition
};

const mutations = {

  [PUSH_COMPETITION](state, competition) {
    state.list.push(competition);
  },

  [RESET_COMPETITION_LIST](state) {
    state.list = [];
  },

  [SET_COMPETITION](state, competition) {
    state.competition = competition;
  },

  [RESET_COMPETITION](state, competition) {
    state.competition = {};
  },

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
    commit(RESET_COMPETITION_LIST);

    db.collection('competitions').where("hostId", "==", brewer).orderBy("date", "desc").onSnapshot(snapshot => {
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

  async get({commit}, id) {
    const competition = await db.collection('competitions').doc(id).get();

    if (competition.exists) {
      commit(SET_COMPETITION, {
        id: competition.id,
        ...competition.data()
      });
    }
  },

  async create({state}) {
    const user = firebase.auth().currentUser;
    var data = {
      date: firebase.firestore.Timestamp.fromDate(new Date(state.competition.date)),
      description: state.competition.description,
      host: user.displayName,
      hostId: user.uid,
      address: state.competition.address,
      suburb: state.competition.suburb,
      style: state.competition.style,
      status: state.competition.status,
      tagline: state.competition.tagline,
      name: state.competition.name
    }
    await db.collection('competitions').doc(uuid.v4()).set(data).then(function() {
      alert(data.name + " successfully created");
    });
  },

  async edit({state}, date) {
    var data = {
      date: firebase.firestore.Timestamp.fromDate(new Date(date)),
      description: state.competition.description,
      address: state.competition.address,
      suburb: state.competition.suburb,
      style: state.competition.style,
      status: state.competition.status,
      tagline: state.competition.tagline,
      name: state.competition.name
    }
    await db.collection('competitions').doc(state.competition.id).set(data,{merge: true}).then(function() {
      alert(data.name + " successfully updated");
    });
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
