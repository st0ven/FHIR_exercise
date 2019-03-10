<template>
  <div class="notification-wrapper">
    <h4 class="notification-title">{{ title }}</h4>
    <p class="notification-description">{{ description }}</p>
  </div>
</template>

<script>
  export default {
    name: "notification",
    props: [
      'title',
      'description'
    ]
  }
</script>

<style>
  .notification-wrapper {
    border-radius: 4px;
    padding: 2rem;
    background: rgba(255,221,157,.12);
    color: rgb(255,221,157);
  }
  .notification-title {
    text-transform: capitalize;
    margin-bottom: 1rem;
  }
  .notification-description {
    line-height: 1.5;
    font-weight: 300;
    font-size: 14pt;
  }
</style>
