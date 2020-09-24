

export default class DataService {

    public static readonly baseURL = 'http://api.sulten.se';
    public static readonly mqttHomeassistantConstructorParameters = {
        'brokerUrl': 'ws://10.0.0.6:1884/',
        'options': {
            'username': 'homeassistant',
            'password': 'feeNg9Nu3feesee3vahch4zuwee3eiquobeuk1eis0Oor5hi1xeizai3loo0tai0',
          }
    };
    public static readonly mqttTopicSubscriptions = {
        'transport_departureTime': 'transport/departureTime'
    };
   
}
