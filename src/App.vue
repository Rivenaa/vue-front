<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <Transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    />
  </div>
</template>
