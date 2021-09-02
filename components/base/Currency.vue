

<script>

export default {
  name: 'Currency',

  computed:{
    currencySettings(){
      return this.$store.state.currency.currencySettings
    }
  },
  methods: {
    initCurrencySymbole(){
      this.currencySymbole = this.currencySettings.current_currency.symbol
    }
  },
  mounted(){
    this.initCurrencySymbole()
  }
}
</script>

