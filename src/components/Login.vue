<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import { authUi, authUiConfig } from '../firebase';
export default {
  name: 'login',
  mounted() {
    authUi.start('#firebaseui-auth-container', authUiConfig);
  },
};
</script>
