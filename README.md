# v2-check
[![npm](https://img.shields.io/npm/v/npm)](https://img.shields.io/npm/v/npm)&nbsp;[![MIT](https://img.shields.io/github/license/Andraw-lin/v2-check)](https://img.shields.io/github/license/Andraw-lin/v2-check)

A component form validation plugin in Vue 2.0.

## Install

You can install the package via npm:

```bash
$ npm install -s v2-check
```

Otherwise, you can just get `v2-check.js` into your code.

## Usage

Import `v2-check` before initializing Vue.

```javascript
import Vue from 'vue'
import v2Check from 'v2-check'

Vue.use(v2Check)
```

Then you can use the `check-item` and the `check-all`  directive on your component. Ex:

```javascript
<template>
  <section class="form-container" v-check-all="initFormData.uuid">
    <div>
      Text option:
      <input type="text" :class="{'error-input': $getFormItemMessage(initFormData.uuid, initFormData.textOption.name)}" v-check-item="initFormData.textOption" v-model="initFormData.textOption.value" />
      <span class="error-msg" v-show="initFormStatus">{{ $getFormItemMessage(initFormData.uuid, initFormData.textOption.name) }}</span>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      initFormStatus: null,
      initFormData: {
        uuid: new Date().toString(),
        textOption: {
          name: 'textOption',
          value: '',
          validate: [
            {rule: /^.{1,}$/, message: 'This field is required'}
          ]
        }
      }
    }
  },
  mounted () {
    this.initFormStatus = this.$formStatus
  }
}
</script>
```

Awesome, you can also see this demo on [JSFiddle](https://jsfiddle.net/Andraw_lin/eoxndqjg/62/).

## License

The MIT License (MIT). Please see [License File](https://github.com/Andraw-lin/v2-check/blob/master/LICENSE) for more information.

## Suggestion

`v2-check` Still in the process of continuous improvement, if you have any problems during the development process, I welcome you to submit it in the issue.
