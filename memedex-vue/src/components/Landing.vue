<template>
  <div class="container">
    <div class="item" v-for="image in images">
      <Picture :image="image"></Picture>
    </div>
  </div>
</template>

<script>
  import Picture from './Picture'
  
  export default {
    name: 'landing',
    componets: {
      Picture
    },
    data () {
      return {
        images: [
          {
            url: 'assets/logo.png'
          },
          {
            url: 'assets/logo.png'
          }
        ]
      }
    }
  }
</script>
