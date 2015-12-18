# PompeyPlays
Pompey plays video games together, everyone has fun and nothing* catches fire

### More Info Goes Here

## PP Websocket API
The websocket server uses the WS library built into [combi-server](https://github.com/Commander-lol/combi-server) for
standardised communications. The WS server expects JSON formatted into utf-8 text and will communicate back with such.
Binary and slimmer string based versions of the protocols will be available when combi-server has been updated to 
handle those.

### Basic JSON format
WS requests should contain two keys: a `type` key and a `payload` key; other data will be ignored. The value of the `type`
key should be a string dictating the command being sent, while the value of `payload` should be a String, Number or JSON 
object depending on what the server expects for the given type.

If you're using ws.lib, as provided by combi-server, the `socket.message(type, payload)` method handles the formatting
required, otherwise you'll need to manually create the command object.

### PP Commands
Currently the PP server listens for the following commands (`type` parameter) and expects the described data (`payload`):
* _input_: A JSON object containing a `key` property that describes the key being input. This is a virtual key mapped to
a gamepad, and not the actual keyboard key that might have caused the message to be sent or that might be pressed as a 
result. Optionally contains an `auth` property with a Web Token hash.

### PP Events
Currently the PP server sends the following messages to clients (Listen to those that you want to handle):
* _input-response_: Sent in response to an input. Payload will be undefined unless something was wrong with the request,
safe to ignore in most cases
