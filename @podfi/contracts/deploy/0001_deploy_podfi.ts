import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
  const Podfi = await hre.ethers.getContractFactory('Podfi')
  await Podfi.deploy()
};

func.tags = ['deploy_podfi'];

export default func;

