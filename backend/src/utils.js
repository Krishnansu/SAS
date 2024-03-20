const Counter = require('./models/counters');

async function getNextSequence(counterName) {
    const result = await Counter.findByIdAndUpdate(
        counterName, 
        { $inc: { seq: 2 } }, 
        { new: true, upsert: true } // Create if it doesn't exist, return the new value
    );
    return result.seq;
}

module.exports = {
    getNextSequence
};