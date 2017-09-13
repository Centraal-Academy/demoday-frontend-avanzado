<template>
  <img class="image-item" :src="image.url"/>
</template>

<script>
  
  export default {
    name: 'picture',
    props: {
      image: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style type="text/css">
  .image-item {
    width: 10em;
    height: 10em;
  }
</style>