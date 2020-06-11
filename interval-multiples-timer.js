module.exports = function(RED) {
    function IntervalTimerNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var interval = config.interval;
        var timer;

        var timeHandler = function() {
            msg = {};
            msg.topic = config.topic;
            msg.payload = config.payload || Date.now();
            node.send(msg);
            timer = setTimeout(timeHandler, interval - (Date.now() %interval));  // setInterval apparently has a considerable drift, so we use setTimeout to stay within the time grid as much as possible
        };

        timer = setTimeout(timeHandler, interval - (Date.now() %interval));        

        node.on('close', function() {
            clearTimeout(timer);
        });
    }

    RED.nodes.registerType("interval-multiples-timer", IntervalTimerNode);
}
