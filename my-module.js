module.exports = function myTask(arg) {
    for(var i = 0; i < 5000000000; i++);
    return console.log(arg);
};