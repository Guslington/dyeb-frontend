import db from '@/db';
import firebase from '@/firebase';
import { uuid } from 'vue-uuid';

import beers from '@/store/beers'

import {
  RESET_SCORECARD_LIST,
  PUSH_SCORECARD,
  SET_SCORECARD,
  PUSH_BEER
} from './mutations';


const state = {
  list: [],
  brewers: [],
  scores: {},
  scorecard: {}
};

const getters = {
  list: ({list}) => list,
  scores: ({scores}) => scores,
  brewers: ({brewers}) => brewers,
  scorecard: ({scorecard}) => scorecard
};

const mutations = {

  [PUSH_SCORECARD](state, scorecard) {
    state.list.push(scorecard);
    state.brewers.push(scorecard.brewerId);
    var arrayLength = scorecard.beers.length;
    for (var i = 0; i < arrayLength; i++) {
      var id = scorecard.beers[i].id
      var brewer = scorecard.beers[i].brewer
      if (!(id in state.scores)) {
        state.scores[id] = {}
      }
      state.scores[id][brewer] = scorecard.beers[i].score
    }
  },

  [RESET_SCORECARD_LIST](state) {
    state.list = [];
    state.brewers = [];
  },

  [SET_SCORECARD](state, scorecard) {
    state.scorecard = scorecard;
  },

  [PUSH_BEER](state, beer) {
    var found = state.scorecard.beers.some(function (b) {
      return b.id === beer.id;
    });
    if (!found) { state.scorecard.beers.push(beer); }
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

  async get({commit}, { compId, brewerId }) {
    const scorecard = await db.collection('scorecards').where("compId", "==", compId).where("brewerId", "==", brewerId).limit(1).get()

    if (!scorecard.empty) {
      commit(SET_SCORECARD, {
        id: scorecard.docs[0].id,
        ...scorecard.docs[0].data()
      });
    } else {
      commit(SET_SCORECARD, {
        id: uuid.v4(),
        brewerId: brewerId,
        compId: compId,
        beers: []
      });
    }

    db.collection('beers').where("compId", "==", compId).orderBy("order","asc").onSnapshot(snapshot => {
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

  async set({state}) {
    await db.collection('scorecards').doc(state.scorecard.id).set({
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
