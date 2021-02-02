<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3>Style Guide</h3>
      </div>
      <div class="col-12 mt-5 mb-3">
        <h3>Input</h3>
      </div>
      <div class="col-8">
        <ValidationProvider v-slot="{ classes, errors }" mode="lazy" rules="required">
          <basic-input
            id="test1"
            v-model="test"
            label="Test"
            :classes="classes"
            :caption="errors[0]"
            placeholder="Tess"
          />
        </ValidationProvider>
        <ValidationProvider v-slot="{ classes, errors }" rules="password">
          <basic-input
            id="test2"
            v-model="test"
            label="Password"
            :classes="classes"
            :caption="errors[0]"
            placeholder="Password"
            type="password"
            is-password
          />
        </ValidationProvider>
        <ValidationProvider v-slot="{ classes, errors }" mode="lazy" rules="required">
          <basic-input
            id="test3"
            v-model="test"
            label="Prepend"
            :classes="classes"
            :caption="errors[0]"
            placeholder="Prepend"
            icon-prepend="search"
            transparent-prepend
          />
        </ValidationProvider>
        <ValidationProvider v-slot="{ classes, errors }" mode="lazy" rules="required">
          <basic-input
            id="test4"
            v-model="test"
            label="Append"
            :classes="classes"
            :caption="errors[0]"
            placeholder="Append"
            append=".com"
          />
        </ValidationProvider>
        <y-text-area id="test5" v-model="test2" label="text-area"></y-text-area>
        <Tabs :items="['test', 'mest']">
          <Tab title="test"> Hello </Tab>
          <Tab title="mest"> Mello </Tab>
        </Tabs>

        <loan-form-card
          section="1. Informasi Pinjaman"
          caption="Lengkapi informasi pinjamanmu untuk menarik minat pendana."
        >
          <ValidationProvider v-slot="{ classes, errors }" rules="required">
            <basic-input
              id="campaign-title"
              v-model="test"
              label="Judul Campaign"
              :classes="classes"
              :caption="errors[0]"
              placeholder="Masukkan Judul Campaign"
            />
          </ValidationProvider>

          <ValidationProvider v-slot="{ classes, errors }" rules="required">
            <basic-input
              id="campaign-title"
              v-model="test"
              label="Judul Campaign"
              :classes="classes"
              :caption="errors[0]"
              placeholder="Masukkan Judul Campaign"
              tooltip-text="Halo"
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ classes, errors }" rules="required">
            <y-text-area
              id="campaignDescription"
              v-model="test2"
              style="margin-top: 16px"
              label="Deskripsi Campaign"
              :classes="classes"
              :caption="errors[0]"
              placeholder="Masukkan Deskripsi Campaign"
            />
          </ValidationProvider>
        </loan-form-card>
        <editor />
        <setting-sidebar />
      </div>
    </div>
    <div class="col-12 mt-5">
      <h3>Typography</h3>
    </div>
    <div class="col-12 px-5">
      <div class="row align-items-center">
        <div class="col-4">
          <h1>heading 1</h1>
        </div>
        <div class="col-4">
          <h2>heading 2</h2>
        </div>
        <div class="col-4">
          <h3>heading 3</h3>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-2">
          <subtitle-1>subtitle 1</subtitle-1>
        </div>
        <div class="col-2">
          <subtitle-2>subtitle 2</subtitle-2>
        </div>
        <div class="col-2">
          <body-1>body 1</body-1>
        </div>
        <div class="col-2">
          <body-2>body 2</body-2>
        </div>
        <div class="col-2">
          <caption-1>caption 1</caption-1>
        </div>
        <div class="col-2">
          <caption-2>caption 2</caption-2>
        </div>
      </div>
    </div>
    <div class="col-12 mt-5">
      <h3>Button</h3>
    </div>
    <div class="col-12 px-5">
      <div class="row align-items-center">
        <div class="col-3">
          <y-btn label="Flat" color="bg-primary1" variant="flat"></y-btn>
        </div>
        <div class="col-3">
          <y-btn label="Secondary" color="bg-primary1" variant="secondary"></y-btn>
        </div>
        <div class="col-3">
          <y-btn label="Outline" color="bg-primary1" variant="outline"></y-btn>
        </div>
        <div class="col-3">
          <y-btn label="Disabled" color="bg-primary1" variant="disabled"></y-btn>
        </div>
      </div>
      <br />
      <div class="row align-items-center">
        <div class="col-4">
          <y-btn label="Large" color="bg-primary1" size="large"></y-btn>
        </div>
        <div class="col-4">
          <y-btn label="Medium" color="bg-primary1" size="medium"></y-btn>
        </div>
        <div class="col-4">
          <y-btn label="Small" color="bg-primary1" size="small"></y-btn>
        </div>
      </div>
    </div>
    <vs-pagination v-model="currentx" :total="5" goto></vs-pagination>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider
  },
  data() {
    return {
      email: '',
      pass: '',
      test: '',
      test2: '',
      currentx: 1
    }
  },
  watch: {
    pass(val) {},
    errorPass(val) {}
  }
}
</script>

<style scoped></style>
