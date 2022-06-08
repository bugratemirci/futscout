var { PythonShell } = require('python-shell');

let options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: './',
    args: [29, 70, 33, 35, 96, 400, 150]
};


const deneme = () => {

}
const prediction = (req, res, next) => {
    const { statistics } = req.body;
    
    options.args = statistics;
    if (options.args == null) {
        res.json(-1);
    }
    PythonShell.run('../fut_scout_data_operations/understat_classification/prediction_futscout.py', options, function (err, results) {
        if (err) throw err;
        const json_file = JSON.parse(results)
        res.json(parseInt(json_file.vals))
    });
}

module.exports = {
    prediction
};