const getProperties = (p, o) => p.reduce((xs, x) => (xs && (xs[x] || xs[x] === 0)) ? xs[x] : '', o)
const getFormStatus = a => Object.values(a).every(v => v.formItemValidate)
const getForm = (a, key) => a.filter(item => item.elIndex === key)[0]
const getIndex = (f, key) => {
  let index
  f.some((item, k) => {
    if (item === key) {
      index = k
      return true
    }
  })
  index !== undefined && this.testArr.splice(index, 1)
}
const debounce = (fn, wait, immediate) => {
  let timer = null
  return function (...args) {
    let context = this
    if (immediate && !timer) {
      fn.apply(context, args)
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
const validator = {
  install (Vue, options) {
    let element
    let currentIndex
    let formStatus = []
    let formItemStatus = {}
    let checkItemComponentUpdatedCallback = (el, binding) => {
      let ruleArr = getProperties(['value', 'validate'], binding)
      let ruleValue = getProperties(['value', 'value'], binding)
      let formItemName = getProperties(['value', 'name'], binding)
      let ruleResult
      let formItem = getForm(formStatus, currentIndex).formItemStatus[formItemName]
      let formItemResult = ruleArr.every(ruleItem => {
        if (!ruleItem.rule.test(ruleValue)) {
          ruleResult = ruleItem.message
          return false
        }
        return true
      })
      formItem.formItemValidate = formItemResult
      formItem.message = ruleResult || ''
      getForm(formStatus, currentIndex).formValidate = getFormStatus(getForm(formStatus, currentIndex).formItemStatus)
    }
    let handleCheckItemComponentUpdated = debounce(checkItemComponentUpdatedCallback, 600)
    Vue.directive('check-item', {
      bind (el, binding) {
        let formItemName = getProperties(['value', 'name'], binding)
        if (!formItemStatus[formItemName]) {
          formItemStatus[formItemName] = { formItemValidate: false, message: '' }
        }
        el.onfocus = () => { element = el }
      },
      componentUpdated (el, binding) {
        if (el === element) {
          handleCheckItemComponentUpdated(el, binding)
        }
      }
    })
    Vue.directive('check-all', {
      bind (el, binding) {
        let elIndex = getProperties(['value'], binding)
        if (elIndex) {
          formStatus.push({
            elIndex,
            formValidate: false,
            formItemStatus
          })
        } else {
          formStatus = {
            formValidate: false,
            formItemStatus
          }
        }
        formItemStatus = {}
      },
      update (el, binding) {
        if (element) {
          currentIndex = getProperties(['value'], binding)
        }
      },
      unbind (el, binding) {
        let elIndex = getProperties(['value'], binding)
        formStatus.splice(getIndex(formStatus, elIndex), 1)
      }
    })
    Vue.prototype.$formStatus = formStatus
    Vue.prototype.$getForm = key => getForm(formStatus, key)
    Vue.prototype.$getFormItemMessage = (key, name) => {
      let f = getForm(formStatus, key)
      return getProperties(['formItemStatus', name, 'message'], f)
    }
  }
}

export default validator
