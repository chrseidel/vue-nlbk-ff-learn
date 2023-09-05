<script setup></script>

<template>
  <nav>
    <router-link to="/questions">Üben</router-link>
    <router-link to="/test-training">Test</router-link>
    <router-link to="/settings">Einstellungen</router-link>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
nav {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  background-color: green;
  width: 100%;
}

a {
  font-weight: 700;
  line-height: 2rem;
  padding: 1.3rem;
  color: white;
}

main {
  margin-top: 6rem;
  width: 100%;
}

#start-quiz {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

#start-quiz > a {
  color: black;
}
</style>
