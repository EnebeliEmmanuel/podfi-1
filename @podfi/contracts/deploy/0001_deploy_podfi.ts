import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
  const Podfi = await hre.ethers.getContractFactory('Podfi')
  const deployment = await Podfi.deploy()
  await deployment.waitForDeployment()
  const address = await deployment.getAddress()

  await hre.run("verify:verify", {
    address,
  })
};

func.tags = ['deploy_podfi']; 

export default func; 

