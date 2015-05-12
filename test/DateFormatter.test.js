var DateFormatter = require('../app/lib/DateFormatter.js')

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
    expect( DateFormatter.format(1427918400000) ).to.eql('1 Apr 2015 20:00')

    expect( DateFormatter.format(1427922000000) ).to.eql('1 Apr 2015 21:00')

    expect( DateFormatter.format(1427940000000) ).to.eql('2 Apr 2015 02:00')
  })
})
