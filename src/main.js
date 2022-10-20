import "./css/index.css"
import IMask from 'imask';

const ccBgColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo spann:nth-child(2) img")

function setCardType(type) {

  const colors = {

    visa: ['#436D99', '#2D57F2'],
    mastercard: ['#0d6f5d', '#c3129c'],
    default: ['black', 'gray'],
  }

  ccBgColor1.setAttribute('fill', colors[type][0])
  ccBgColor2.setAttribute('fill', colors[type][1])
}

globalThis.setCardType = setCardType

const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: 'default',
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foudMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    console.log(foudMask)
    return foudMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
