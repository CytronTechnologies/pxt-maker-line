/**
 * tests go here; this will not be compiled when this package is used as a library
 */
input.onButtonPressed(Button.A, function () {
    // Enter calibration mode.
    makerline.enterCalibration()
})
input.onButtonPressed(Button.B, function () {
    // Save calibration data and exit calibration mode.
    makerline.exitCalibration()
})
makerline.initializeCalibration(DigitalPin.P2)
makerline.initializeDigital(
DigitalPin.P12,
DigitalPin.P13,
DigitalPin.P14,
DigitalPin.P15,
DigitalPin.P16
)
// Since this is the last initialization block, analog mode will be used.
makerline.initializeAnalog(AnalogReadWritePin.P1)
basic.forever(function () {
    if (makerline.isLineDetectedOn(makerline.LinePosition.FarLeft)) {
        serial.writeLine("Far Left")
    } else if (makerline.isLineDetectedOn(makerline.LinePosition.Left)) {
        serial.writeLine("Left")
    } else if (makerline.isLineDetectedOn(makerline.LinePosition.Center)) {
        serial.writeLine("Center")
    } else if (makerline.isLineDetectedOn(makerline.LinePosition.Right)) {
        serial.writeLine("Right")
    } else if (makerline.isLineDetectedOn(makerline.LinePosition.FarRight)) {
        serial.writeLine("Far Right")
    } else {
        serial.writeLine("No line detected")
    }
})
