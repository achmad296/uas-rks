<template>
  <ValidationProvider v-slot="{ errors, classes }" vid="autosuggest" name="query" rules="required">
    <label :for="inputProps.id">{{ label }}</label>
    <vue-autosuggest
      ref="autosuggest"
      v-model="query"
      :class="classes"
      :suggestions="filteredSuggestions"
      :input-props="inputProps"
      :get-suggestion-value="
        (suggestion) => suggestion.item.district + ', ' + suggestion.item.city + ', ' + suggestion.item.state
      "
      :should-render-suggestions="shouldRenderSuggestions"
      @click="clickHandler"
      @selected="selectHandler"
    >
      <template slot-scope="{ suggestion }">
        <div class="item-name">
          {{ suggestion.item.district + ', ' + suggestion.item.city + ', ' + suggestion.item.state }}
        </div>
      </template>
    </vue-autosuggest>
    <p class="error-caption">{{ errors[0] }}</p>
  </ValidationProvider>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'

export default {
  name: 'App',
  components: {
    VueAutosuggest
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  fetch() {
    this.$repositories.gateway
      .getGeodirectories()
      .then((res) => (this.geo = res.data.response.results))
      .catch((err) => {
        throw new Error(err)
      })
  },
  data() {
    return {
      geo: {},
      query: '',
      suggestions: [],
      selected: null,
      inputProps: {
        id: 'autosuggest__input',
        placeholder: this.placeholder
      }
    }
  },
  computed: {
    filteredSuggestions() {
      return [
        {
          data: this.suggestions.filter((item) => {
            if (this.query.length) {
              return (
                item.state.toLowerCase().includes(this.query.toLowerCase()) ||
                item.city.toLowerCase().includes(this.query.toLowerCase()) ||
                item.district.toLowerCase().includes(this.query.toLowerCase())
              )
            }
          })
        }
      ]
    }
  },
  watch: {
    geo() {
      for (const [state, valueOfState] of Object.entries(this.geo)) {
        for (const [city, valueOfCity] of Object.entries(valueOfState)) {
          valueOfCity.forEach((district) => {
            this.suggestions.push({ state, city, district })
          })
        }
      }
    }
  },
  methods: {
    selectHandler(item) {
      if (item !== null) {
        this.selected = item.item
        this.query = item.item.district + ', ' + item.item.city + ', ' + item.item.state
      } else if (
        this.selected === null ||
        this.selected.district + ', ' + this.selected.city + ', ' + this.selected.state !== this.query
      ) {
        this.query = ''
        this.selected = null
      }
    },
    clickHandler(item) {
      this.loading = false
    },
    shouldRenderSuggestions(size, loading) {
      return size >= 0 && !loading
    }
  }
}
</script>

<style>
#autosuggest {
  background: #fafbfc;
  border: 1px solid #d6d4d5;
  box-sizing: border-box;
  border-radius: 8px;
  height: 37px;
  z-index: 99999;
}

#autosuggest.is-invalid {
  border: 1px solid #dd403a;
}

#autosuggest.is-valid {
  border: 1px solid #3c91e6;
}

#autosuggest.is-valid input {
  color: #3c91e6;
}

#autosuggest__input {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: none;
  background: #fafbfc;
  padding: 8px 0px 8px 16px;
  position: relative;
  display: block;
  box-sizing: border-box;
  z-index: 9999;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
}

::placeholder {
  color: #d6d4d5;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
}

/* #autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
} */

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  margin: 0;
  position: absolute;
  z-index: 1;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: #fafbfc;
  padding: 0px;
  max-height: 207px;
  overflow: auto;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results-item {
  cursor: pointer;
  padding: 8px 15px 8px 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results_title {
  margin-left: 0;
  padding: 15px 13px 5px;
  /* border-top: 1px solid lightgray; */
  color: #00171f;
}

.item-name {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
}

.autosuggest__results .autosuggest__results-item:active,
.autosuggest__results .autosuggest__results-item:hover,
.autosuggest__results .autosuggest__results-item:focus,
.autosuggest__results .autosuggest__results-item.autosuggest__results-item--highlighted {
  color: #fff;
  background-color: #3c91e6;
}

.error-caption {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  color: #dd403a;
}
</style>
