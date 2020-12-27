

export default class DataService {

    public static readonly baseURL = 'http://10.0.0.6';
    public static readonly mqttHomeassistantConstructorParameters = {
        'brokerUrl': 'ws://10.0.0.6:1884/',
        'options': {
            'username': 'homeassistant',
            'password': 'OhgaiXipeCaetae9Shaegeequ6iJoow7aifeisoD2naab5oong8Pohchohshoo1A',
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
