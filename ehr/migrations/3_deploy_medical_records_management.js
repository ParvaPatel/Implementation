var MedicalRecordsManagement = artifacts.require("MedicalRecordsManagement");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(MedicalRecordsManagement);
};
