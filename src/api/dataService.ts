

export default class DataService {

    public static readonly baseURL = 'http://10.0.0.6';
    public static readonly mqttHomeassistantConstructorParameters = {
        'brokerUrl': 'ws://10.0.0.6:1884/',
        'options': {
            'clientId': new Date().getTime().toString(),
            'username': 'mqtt1',
            'password': 'mqtt1',
            'keepalive': 60
          }
    };

    public static readonly mqttTopicSubscriptions = {
        'climate_utilityRoomFloor': 'climate/grovkök_golv',
        'climate_mainThermostat': 'climate/huvudtermostat',
        'climate_outdoorRoom': 'climate/uterum',
        'climate_sjöstorpsvägen_3a': 'climate/sjöstorpsvägen_3a',
        'image_screensaver': 'image/screensaver',
        'sound_play_file': 'sound/play/file',
        'transport_departure': 'transport/departure'
    };

}
