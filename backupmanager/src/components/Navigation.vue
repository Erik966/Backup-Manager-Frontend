<template>
    <nav class = "navbar navbar-expand navbar-light fixed top">
      <div class = "container">
        <router-link to="/" class="nav-link">Home</router-link>
        <div class = "collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
export default ({
    name: 'Navigation',
})
</script>