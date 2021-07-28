<template>
  <amplify-authenticator>
    <div>
      My App
      <amplify-sign-out></amplify-sign-out>
    </div>
  </amplify-authenticator>
</template>

<script>
import { DataStore } from '@aws-amplify/datastore'
import { Project } from '../src/models'
export default {
  async mounted() {
    const models = await DataStore.query(Project)
    console.log(models)
  }
}
</script>
