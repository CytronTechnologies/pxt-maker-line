/*******************************************************************************
 * Functions for Cytron Maker Line to be used with the micro:bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/



/**
 * Blocks for Maker Line Sensor
 */
//% weight=9 color=#ff8000 icon="\uf0c9" block="Maker Line"
namespace makerline{


let isAnalogInitialized = false;
let analogSensorPin: AnalogReadWritePin;
let isDigitalInitialized = false;
let digitalSensorPins: DigitalPin[] = [];
    
// Maker Line position.
//% blockId=makerline_lineposition_enum
export enum LinePosition {
    //% block="far left"
    FarLeft = 0,

    //% block="left"
    Left = 1,

    //% block="center"
    Center = 2,

    //% block="right"
    Right = 3,

    //% block="far right"
    FarRight = 4,

    //% block="all"
    All = 5,

    //% block="none"
    None = 6
}


    /**
      * Initialize Maker Line at selected pin (Analog Mode).
      */
    //% weight=50
    //% blockGap=8
    //% blockId=makerline_initialized_analog
    //% block="initialize maker line in Analog mode at %pin"
    //% pin.defl=AnalogReadWritePin.P1
    export function initializeAnalog(pin:AnalogReadWritePin){
        analogSensorPin = pin;
        isAnalogInitialized = true;
}

    /**
      * Initialize Maker Line at selected pin (Digital Mode).
      */
    //% weight=48
    //% blockGap=8
    //% blockId=makerline_initialized_digital
    //% block="initialize maker line in digital mode: | D1 = %d1 D2 = %d2 D3 = %d3 D4 = %d4 D5 = %d5"
    //% d1.defl=DigitalPin.P12 d2.defl=DigitalPin.P13 d3.defl=DigitalPin.P14 d4.defl=DigitalPin.P15 d5.defl=DigitalPin.P16
    export function initializeDigital(d1: DigitalPin, d2: DigitalPin, d3: DigitalPin, d4: DigitalPin, d5: DigitalPin) {
        digitalSensorPins = [d1, d2, d3, d4, d5];
        isDigitalInitialized = true;
}


    /**
      * Return true if Maker Line is on the selected position. 
      * @param position Check if Maker Line is on this position.
      */
    //% weight=46
    //% blockGap=8
    //% blockId=makerline_is_line_detected_on
    //% block="line detected on %position"
    //% position.defl=makerline.LinePosition.Center
    //% position.fieldEditor="gridpicker" position.fieldOptions.columns=5
    export function isLineDetectedOn(position: LinePosition): boolean{

        if (isAnalogInitialized) {
        let analogValue = pins.analogReadPin(analogSensorPin);

        switch (position) {
            case LinePosition.None:
                if (analogValue < 81) return true;
                else return false;

            case LinePosition.FarLeft:
                if ((analogValue >= 81) && (analogValue < 266)) return true;
                else return false;

            case LinePosition.Left:
                if ((analogValue >= 266) && (analogValue < 430)) return true;
                else return false;

            case LinePosition.Center:
                if ((analogValue >= 430) && (analogValue <= 593)) return true;
                else return false;

            case LinePosition.Right:
                if ((analogValue > 593) && (analogValue <= 757)) return true;
                else return false;

            case LinePosition.FarRight:
                if ((analogValue > 757) && (analogValue <= 941)) return true;
                else return false;

            case LinePosition.All:
                if (analogValue > 941) return true;
                else return false;
            }
        }

        if (isDigitalInitialized) {
            let R = pins.digitalReadPin(digitalSensorPins[4]);  // d1
            let CR = pins.digitalReadPin(digitalSensorPins[3]); // d2
            let C = pins.digitalReadPin(digitalSensorPins[2]);  // d3
            let CL = pins.digitalReadPin(digitalSensorPins[1]); // d4
            let L = pins.digitalReadPin(digitalSensorPins[0]);  // d5

            switch (position) {
                case LinePosition.None:
                    if (L == 0 && CL == 0 && C == 0 && CR == 0 && R == 0) return true;
                    else return false;

                case LinePosition.FarLeft:
                    if (L==1) return true;
                    else return false;

                case LinePosition.Left:
                    if (CL==1) return true;
                    else return false;

                case LinePosition.Center:
                    if (C==1) return true;
                    else return false;

                case LinePosition.Right:
                    if (CR==1) return true;
                    else return false;

                case LinePosition.FarRight:
                    if (R==1) return true;
                    else return false;

                case LinePosition.All:
                    if (L == 1 && CL == 1 && C == 1 && CR == 1 && R == 1) return true;
                    else return false;
            }
        }

        return false;
    }
}




