#!/usr/bin/env python
####################################################
# Adapted from http://osoyoo.com/driver/waterlevel.py
####################################################
import RPi.GPIO as GPIO
import time
import SimpleHTTPServer
import SocketServer

PORT = 8080


# change these as desired - they're the pins connected from the
# SPI port on the ADC to the Cobbler
SPICLK = 11
SPIMISO = 9
SPIMOSI = 10
SPICS = 8

# photoresistor connected to adc #0
photo_ch = 0

# port init


def init():
    GPIO.setwarnings(False)
    GPIO.cleanup()  # clean up at the end of your script
    GPIO.setmode(GPIO.BCM)  # to specify whilch pin numbering system
    # set up the SPI interface pins
    GPIO.setup(SPIMOSI, GPIO.OUT)
    GPIO.setup(SPIMISO, GPIO.IN)
    GPIO.setup(SPICLK, GPIO.OUT)
    GPIO.setup(SPICS, GPIO.OUT)

# read SPI data from MCP3008(or MCP3204) chip,8 possible adc's (0 thru 7)


def readadc(adcnum, clockpin, mosipin, misopin, cspin):
    if ((adcnum > 7) or (adcnum < 0)):
        return -1
    GPIO.output(cspin, True)

    GPIO.output(clockpin, False)  # start clock low
    GPIO.output(cspin, False)     # bring CS low

    commandout = adcnum
    commandout |= 0x18  # start bit + single-ended bit
    commandout <<= 3    # we only need to send 5 bits here
    for i in range(5):
        if (commandout & 0x80):
            GPIO.output(mosipin, True)
        else:
            GPIO.output(mosipin, False)
        commandout <<= 1
        GPIO.output(clockpin, True)
        GPIO.output(clockpin, False)

    adcout = 0
    # read in one empty bit, one null bit and 10 ADC bits
    for i in range(12):
        GPIO.output(clockpin, True)
        GPIO.output(clockpin, False)
        adcout <<= 1
        if (GPIO.input(misopin)):
            adcout |= 0x1

    GPIO.output(cspin, True)

    adcout >>= 1       # first bit is 'null' so drop it
    return adcout


# Simple HTTP Server to do a reading from the water level sensor


class RachioDitchSensorHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        try:
            adc_value = readadc(photo_ch, SPICLK, SPIMOSI, SPIMISO, SPICS)
            self.send_header('Content-Type', 'application/json')
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"{\"adcValue\":" + str(adc_value) +
                             ", \"percent\":\"" + str("%.1f" % (adc_value/400.*100))+"%\"}")
        except ValueError, Argument:
            self.send_response(500)
            self.end_headers()


Handler = RachioDitchSensorHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

if __name__ == '__main__':
    try:
        init()
        time.sleep(2)
        print "serving at port", PORT
        httpd.serve_forever()

    except KeyboardInterrupt:
        pass
GPIO.cleanup()
