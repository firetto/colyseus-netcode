let options = {
    clientsidePrediction: true,
    serverReconciliation: true,
    entityInterpolation: false,
};
exports.options = options;

function setClientsidePrediction(val) {
    options.clientsidePrediction = val;
}
exports.setClientsidePrediction = setClientsidePrediction;

function setServerReconciliation(val) {
    options.serverReconciliation = val;
}
exports.setServerReconciliation = setServerReconciliation;

function setEntityInterpolation(val) {
    options.entityInterpolation = val;
}
exports.setEntityInterpolation = setEntityInterpolation;

exports.setupChecks = () => {
    document.getElementById("options-clientsidePrediction").checked = options.clientsidePrediction;

    document.getElementById("options-clientsidePrediction").oninput = () => {
        options.clientsidePrediction = document.getElementById("options-clientsidePrediction").checked;
    }
    

    document.getElementById("options-serverReconciliation").checked = options.serverReconciliation;

    document.getElementById("options-serverReconciliation").oninput = () => {
        options.serverReconciliation = document.getElementById("options-serverReconciliation").checked;
    }
}