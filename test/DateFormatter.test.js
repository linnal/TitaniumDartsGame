var DateFormatter = require('../app/lib/DateFormatter.js')

var timestamp = 1427918400000
var formattedDate = '1 Apr 2015 20:00'

var timestamp1 = timestamp + 1000*60*60
var formattedDate1 = '1 Apr 2015 21:00'

var timestamp2 = timestamp1 + 1000*60*60*5
var formattedDate2 = '2 Apr 2015 02:00'

var chai = require('chai')
var expect = chai.expect

describe('DateFormatter', function () {
  it('pads a number to the desired', function () {
    expect( DateFormatter.padNumber(1) ).to.eql('01')
    expect( DateFormatter.padNumber(1,1) ).to.eql('1')
    expect( DateFormatter.padNumber(10) ).to.eql('10')
    expect( DateFormatter.padNumber(10,2) ).to.eql('10')
    expect( DateFormatter.padNumber(10,3) ).to.eql('010')
  })
  it('formats timestamps to the format "dd MMM YYYY hh:mm"', function () {
    expect( DateFormatter.format(timestamp) ).to.eql(formattedDate)

    expect( DateFormatter.format(timestamp1) ).to.eql(formattedDate1)

    expect( DateFormatter.format(timestamp2) ).to.eql(formattedDate2)
  })
})
