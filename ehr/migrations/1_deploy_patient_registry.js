var PatientRegistry = artifacts.require("PatientRegistry");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(PatientRegistry);
};
