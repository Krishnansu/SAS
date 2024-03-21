const Counter = require('./models/counters');

async function getNextSequence(counterName) {
    let counter = await Counter.findOneAndUpdate(
        { counter_id: counterName }, 
        { $inc: { seq: 1 } }, 
        { new: true } 
    );

    if (!counter) {
        counter = new Counter({ counter_id: counterName, seq: 1 }); 
        await counter.save();
    }

    return counter.seq;
}

module.exports = {
    getNextSequence
};