<template>
  <q-page>
    <div class="row q-mb-md">
      <div class="col bg-primary">1</div>
      <div class="col bg-secondary">2</div>
      <div class="col bg-accent">3</div>
    </div>
    <!-- Maximo 12 posiciones-->
    <div class="row q-mb-md">
      <div class="col bg-primary">1</div>
      <div class="col col-6 bg-secondary">2</div>
      <div class="col bg-accent">3</div>
    </div>

    <div class="row q-mb-md justify-center">
      <div class="col col-4 bg-primary">1</div>
      <div class="col col-4 bg-secondary">2</div>
    </div>

    <div class="row q-mb-md justify-end">
      <div class="col col-4 bg-primary">1</div>
      <div class="col col-4 bg-secondary">2</div>
    </div>

    <div class="row q-mb-md justify-between">
      <div class="col col-4 bg-primary">1</div>
      <div class="col col-4 bg-secondary">2</div>
    </div>

    <q-separator spaced />
    <!-- mobile first -->
    <div class="row q-mb-md justify-between">
      <div class="col-12 col-sm-6 col-md-4 bg-primary">1</div>
      <div class="col-12 col-sm-6 col-md-4 bg-secondary">2</div>
    </div>

    <q-separator spaced />
    <div class="row q-mb-md">
      <div class="square-box q-mx-md bg-primary">1</div>
      <div class="square-box q-mx-md bg-secondary">2</div>
      <div class="square-box q-mx-md bg-accent">3</div>
    </div>

    <div class="row q-mb-md justify-between">
      <div class="square-box q-mx-md bg-primary">1</div>
      <div class="square-box q-mx-md bg-secondary">2</div>
      <div class="square-box q-mx-md bg-accent">3</div>
    </div>

    <div class="row q-mb-md justify-around">
      <div class="square-box q-mx-md bg-primary">1</div>
      <div class="square-box q-mx-md bg-secondary">2</div>
      <div class="square-box q-mx-md bg-accent">3</div>
    </div>

    <div class="column q-mb-md items-center bg-dark">
      <div class="square-box q-mx-md bg-primary">1</div>
      <div class="square-box q-mx-md bg-secondary">2</div>
      <div class="square-box q-mx-md bg-accent">3</div>
    </div>

    <div class="column q-mb-md items-center justify-center bg-dark custom-box">
      <div class="square-box q-mx-md bg-primary">1</div>
      <div class="square-box q-mx-md bg-secondary">2</div>
      <div class="square-box q-mx-md bg-accent">3</div>
    </div>

    <div class="column q-mb-md items-center justify-around bg-dark custom-box">
      <div class="square-box q-mx-md bg-primary">1</div>
      <div class="square-box q-mx-md bg-secondary self-end">2</div>
      <div class="square-box q-mx-md bg-accent self">3</div>
    </div>

  </q-page>
</template>

<script setup></script>

<style scoped>
  .col,
  .col-4,
  .col-5,
  .col-6,
  .col-12 {
    height: 50px;
  }
  .square-box {
    width: 50px;
    height: 50px;
  }
  .custom-box {
    width: 300px;
    height: 300px;
  }
</style>