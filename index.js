const STORE = {
  current: {
    price: 0,
    taxRate: 0,
    tipPercent: 0
  },
  total: {
    meals: 0,
    tips: 0
  }
}

function CurrencyFormatted(amount) {
	var i = parseFloat(amount);
	if(isNaN(i)) { i = 0.00; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if(s.indexOf('.') < 0) { s += '.00'; }
	if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
	s = minus + s;
	return s;
}

function handleSubmit() {
  $('form').submit(function() {
    event.preventDefault();
    const price = $('#base-price').val()
    const taxRate = $('#tax-rate').val()
    const tipPercent = $('#tip-percent').val()
    STORE.current.price = parseInt(price);
    STORE.current.taxRate = (parseInt(taxRate))/100;
    STORE.current.tipPercent = (parseInt(tipPercent))/100;
    STORE.total.meals += 1;
    STORE.total.tips += STORE.current.price*STORE.current.tipPercent;
    $('#base-price').val('');
    $('#tax-rate').val('');
    $('#tip-percent').val('');
    render();
  })
}

function render() {
  const { current: { price, taxRate, tipPercent }, total: { meals, tips} } = STORE;
  $('.subtotal').html(CurrencyFormatted(price+(price*taxRate)));
  $('.tip').html(CurrencyFormatted(price*tipPercent));
  $('.total').html(CurrencyFormatted(price+(price*taxRate)+(price*tipPercent)));
  $('.tip-total').html(CurrencyFormatted(tips));
  $('.meal-count').html(meals);
  $('.avg-tip').html(CurrencyFormatted(tips/meals));
}

function onPageLoad() {
  render();
  handleSubmit();
}

$(onPageLoad);