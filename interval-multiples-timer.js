module.exports = function(RED) {
	function IntervalTimerNode(config) {
		RED.nodes.createNode(this,config);
		const node = this;
		const interval = Number(config.interval);
		let timer = null;
		let closed = false;
		if(!Number.isFinite(interval) || interval <= 0) {
			node.error('Invalid interval');
			return;
		}


		// Last interval slot emitted
		let lastSlot = Math.floor(Date.now() / interval);

		function scheduleNext() {
			if(closed) return;
			const now = Date.now();
			const nextBoundary = (Math.floor(now / interval) + 1) * interval;
			const delay = Math.max(1, nextBoundary - now);
			timer = setTimeout(timeHandler, delay);
		}

		function timeHandler() {
			if(closed) return;
			const now = Date.now();
			const currentSlot = Math.floor(now / interval);
			// Emit only once for each slot
			if(currentSlot > lastSlot) {
				lastSlot = currentSlot;
				node.send({
					topic: config.topic,
					payload: config.payload || now
				});
			}

			scheduleNext();
		};

		scheduleNext();

		node.on('close', function() {
			closed = true;
			if(timer) clearTimeout(timer);
		});
	}

	RED.nodes.registerType('interval-multiples-timer', IntervalTimerNode);
}
