

export default class DataService {

    public static readonly baseURL = 'http://10.0.0.6';
    public static readonly mqttHomeassistantConstructorParameters = {
        'brokerUrl': 'ws://10.0.0.6:1884/',
        'options': {
            'username': 'homeassistant',
            'password': 'feeNg9Nu3feesee3vahch4zuwee3eiquobeuk1eis0Oor5hi1xeizai3loo0tai0',
          }
    };

    public static readonly mqttTopicSubscriptions = {
        'climate_grovkök_golv': 'climate/grovkök_golv',
        'climate_huvudtermostat': 'climate/huvudtermostat',
        'climate_uterum': 'climate/uterum',
        'climate_sjöstorpsvägen_3a': 'climate/sjöstorpsvägen_3a',
        'image_screensaver': 'image/screensaver',
        'transport_departure': 'transport/departure'
    };

}
