<template>
    <div v-if="user">
        <h3> Hi, {{user}} Logged In 
        </h3>
    </div>
        <h3 v-if="!user"> You are not logged in!
        </h3>
</template>

<script>

export default ({
    name: 'Home',
    computed() {
    let data = this.$route.params.data;
    console.log("data is", data); 
  }
})
</script>