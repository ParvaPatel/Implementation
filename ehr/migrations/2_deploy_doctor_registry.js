var DoctorRegistry = artifacts.require("DoctorRegistry");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(DoctorRegistry);
};
